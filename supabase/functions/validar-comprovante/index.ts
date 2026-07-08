// supabase/functions/validar-comprovante/index.ts
//
// Recebe a foto do comprovante (base64) + o id da cobrança (monthly_due_id).
// Manda pro Gemini pedindo { valor, data } estruturado. Compara com o valor
// esperado da cobrança:
//   - Bateu  -> aprova sozinho, marca monthly_dues como "pago"
//   - Não bateu / Gemini não conseguiu ler -> cai na fila do admin
// A imagem NUNCA é salva em lugar nenhum — só passa pela memória da função
// e é descartada assim que a resposta do Gemini volta.

import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const GEMINI_MODEL = "gemini-2.5-flash";
const TOLERANCIA = 0.01; // tolerância de arredondamento pra bater o valor

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  try {
    const { monthly_due_id, imagem_base64, mime_type } = await req.json();

    if (!monthly_due_id || !imagem_base64) {
      return json({ error: "dados_incompletos" }, 400);
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // 1. Busca a cobrança e o valor esperado.
    const { data: due, error: dueErr } = await admin
      .from("monthly_dues")
      .select("id, valor_esperado, status, profile_id")
      .eq("id", monthly_due_id)
      .maybeSingle();

    if (dueErr || !due) {
      return json({ error: "cobranca_nao_encontrada" }, 404);
    }

    if (due.status === "pago") {
      return json({ error: "ja_esta_pago" }, 400);
    }

    // 2. Chama o Gemini pedindo extração estruturada.
    const geminiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiKey) {
      return json({ error: "gemini_nao_configurado" }, 500);
    }

    const prompt = `Você está vendo a foto de um comprovante de pagamento PIX brasileiro.
Extraia APENAS o valor pago e a data do pagamento.
Responda SOMENTE em JSON, neste formato exato, sem texto antes ou depois:
{"valor": <número, ex: 140.00>, "data": "<AAAA-MM-DD>"}
Se não conseguir ler o valor ou a data com confiança, responda {"valor": null, "data": null}.`;

    const geminiResp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inline_data: { mime_type: mime_type || "image/jpeg", data: imagem_base64 } },
              ],
            },
          ],
          generationConfig: { responseMimeType: "application/json" },
        }),
      }
    );

    if (!geminiResp.ok) {
      const errText = await geminiResp.text();
      return json({ error: "falha_gemini", detalhe: errText }, 502);
    }

    const geminiData = await geminiResp.json();
    const textoResposta = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

    let valorDetectado: number | null = null;
    let dataDetectada: string | null = null;
    try {
      const parsed = JSON.parse(textoResposta);
      valorDetectado = parsed.valor;
      dataDetectada = parsed.data;
    } catch (_e) {
      valorDetectado = null;
      dataDetectada = null;
    }
    // A partir daqui, a imagem em si (imagem_base64) não é mais referenciada
    // em nenhuma escrita no banco — só os dados extraídos acima.

    const bateu =
      valorDetectado !== null &&
      Math.abs(Number(valorDetectado) - Number(due.valor_esperado)) < TOLERANCIA;

    const status = bateu ? "pago" : "aguardando_aprovacao";

    const { error: proofErr } = await admin.from("payment_proofs").insert({
      monthly_due_id: due.id,
      valor_detectado: valorDetectado,
      data_detectada: dataDetectada,
      bateu_com_esperado: bateu,
      aprovacao_automatica: bateu,
      status,
    });

    if (proofErr) {
      return json({ error: "falha_ao_registrar", detalhe: proofErr.message }, 500);
    }

    if (bateu) {
      const { error: updErr } = await admin
        .from("monthly_dues")
        .update({ status: "pago", pago_em: new Date().toISOString() })
        .eq("id", due.id);
      if (updErr) {
        return json({ error: "falha_ao_atualizar_cobranca", detalhe: updErr.message }, 500);
      }
    }

    return json({ ok: true, bateu, valor_detectado: valorDetectado, data_detectada: dataDetectada });
  } catch (e) {
    return json({ error: "erro_interno", detalhe: String(e) }, 500);
  }
});
