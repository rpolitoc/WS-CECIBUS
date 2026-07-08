// supabase/functions/activate-account/index.ts
//
// Ativação de conta de integrante.
// Chamada pelo front-end quando o login normal falha E a senha digitada
// é a temporária (123456). Se o email existir em profiles com ativo=false,
// cria o usuário de verdade no auth.users, ativa o profile e concede o
// papel "member". Depois disso, 123456 nunca mais funciona pra esse email
// (o profile já está ativo, então esta função recusa rodar de novo).
//
// Deploy: Dashboard → Edge Functions → Create a new function
// Nome da function: activate-account
// Cola este arquivo inteiro.

import { createClient } from "jsr:@supabase/supabase-js@2";

const SENHA_TEMPORARIA = "123456";

// CORS — sem isso o navegador bloqueia a chamada antes de chegar aqui.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  // Preflight do navegador.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  try {
    const { email, senha } = await req.json();

    if (!email || !senha) {
      return json({ error: "credenciais_invalidas" }, 400);
    }

    // Cliente admin — usa a Secret Key, injetada automaticamente pelo
    // Supabase nas variáveis SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY.
    const admin = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
    );

    const emailNormalizado = String(email).trim().toLowerCase();

    // Só aceita ativar com a senha temporária. Qualquer outra tentativa
    // aqui é erro genérico — não damos pista se o email existe ou não.
    if (senha !== SENHA_TEMPORARIA) {
      return json({ error: "credenciais_invalidas" }, 401);
    }

    const { data: profile, error: profileErr } = await admin
      .from("profiles")
      .select("id, ativo, auth_user_id, eh_admin")
      .eq("email", emailNormalizado)
      .maybeSingle();

    if (profileErr || !profile) {
      return json({ error: "credenciais_invalidas" }, 401);
    }

    // Já ativo? Não deixa reativar/recriar. 123456 morre aqui pra sempre
    // pra esse email — o front-end deve cair no login normal.
    if (profile.ativo) {
      return json({ error: "credenciais_invalidas" }, 401);
    }

    // Cria o usuário de verdade no auth.users com a senha temporária.
    // O front-end, na sequência, já força a troca por uma senha real.
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: emailNormalizado,
      password: SENHA_TEMPORARIA,
      email_confirm: true,
    });

    if (createErr || !created?.user) {
      return json({ error: "falha_ao_ativar", detalhe: createErr?.message }, 500);
    }

    // Vincula o profile ao novo usuário e marca como ativo.
    const { error: updateErr } = await admin
      .from("profiles")
      .update({
        auth_user_id: created.user.id,
        ativo: true,
        senha_temporaria_usada: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    if (updateErr) {
      return json({ error: "falha_ao_ativar", detalhe: updateErr.message }, 500);
    }

    // Concede o papel "member" — todo mundo que ativa ganha esse, sempre.
    const { error: roleErr } = await admin
      .from("user_roles")
      .insert({ auth_user_id: created.user.id, role: "member" });

    if (roleErr) {
      return json({ error: "falha_ao_ativar", detalhe: roleErr.message }, 500);
    }

    // Se o profile já estava marcado com eh_admin = true (definido antes
    // mesmo da pessoa ativar, via tela de admin), concede "admin" também,
    // automaticamente, sem precisar de nenhum passo manual depois.
    if (profile.eh_admin) {
      const { error: adminRoleErr } = await admin
        .from("user_roles")
        .insert({ auth_user_id: created.user.id, role: "admin" });
      if (adminRoleErr) {
        return json({ error: "falha_ao_ativar", detalhe: adminRoleErr.message }, 500);
      }
    }

    return json({ ok: true });
  } catch (e) {
    return json({ error: "erro_interno", detalhe: String(e) }, 500);
  }
});
