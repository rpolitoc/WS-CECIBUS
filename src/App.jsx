import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { ChevronRight, Loader2, CheckCircle2, LogOut, Home, CreditCard, UserCircle, Upload, Sparkles, Check, Clock, AlertCircle, Download, LayoutDashboard, Users, Receipt, Settings, Search, ThumbsUp, ThumbsDown, Pencil, Save, X } from "lucide-react";
import logoUrl from "./assets/logo.js";
import heroUrl from "./assets/hero.js";

/* ============================= SUPABASE ============================= */
const SUPABASE_URL = "https://hbykvtwefvhgayfnqjbl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_RN0x6aoP6QA-QvipQwt1ow_iQ6AN83g";

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

/* ============================= DESIGN TOKENS ============================= */
const C = {
  orange: "#E85A1A",
  orangeDark: "#C94A12",
  darkGreen: "#1F3D2B",
  nearBlack: "#16241C",
  cream: "#F5E9D7",
  creamDark: "#EADFC7",
  leafGreen: "#4A7A3A",
};

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600;700;800&display=swap');`;

/* ============================= PRIMITIVES ============================= */

function Star({ style }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" style={{ ...style }}>
      <path d="M12 0 L14 9 L24 12 L14 15 L12 24 L10 15 L0 12 L10 9 Z" fill={C.cream} opacity="0.85" />
    </svg>
  );
}

function SnakeStrip({ height = 22, color1 = C.cream, color2 = C.nearBlack, bg = "transparent" }) {
  const segs = 14;
  const w = 28;
  return (
    <svg viewBox={`0 0 ${w * segs} 40`} width="100%" height={height} preserveAspectRatio="none" style={{ display: "block" }}>
      <rect width={w * segs} height="40" fill={bg} />
      <path
        d={`M0,20 ${Array.from({ length: segs })
          .map((_, i) => `Q${w * i + w / 2},${i % 2 === 0 ? 2 : 38} ${w * (i + 1)},20`)
          .join(" ")}`}
        fill="none" stroke={color2} strokeWidth="6"
      />
      <path
        d={`M0,20 ${Array.from({ length: segs })
          .map((_, i) => `Q${w * i + w / 2},${i % 2 === 0 ? 2 : 38} ${w * (i + 1)},20`)
          .join(" ")}`}
        fill="none" stroke={color1} strokeWidth="2" strokeDasharray="1 7"
      />
    </svg>
  );
}

function PalmLeaf({ flip = false, color = C.leafGreen, size = 90 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 60 84" style={{ transform: flip ? "scaleX(-1)" : "none" }}>
      <path
        d="M30 84 C30 60 10 50 2 20 C20 26 30 40 30 40 C30 40 34 20 20 2 C40 8 34 34 34 40 C34 40 46 24 58 6 C52 30 44 46 30 50 C30 50 46 52 58 42 C50 60 34 62 30 62 Z"
        fill={color}
      />
    </svg>
  );
}

function Ribbon({ children }) {
  return (
    <div
      style={{
        display: "inline-block", background: C.cream, color: C.nearBlack,
        padding: "8px 26px", fontFamily: "'Work Sans', sans-serif", fontWeight: 700,
        fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase",
        clipPath: "polygon(3% 0%, 97% 0%, 100% 50%, 97% 100%, 3% 100%, 0% 50%)",
        border: `2px solid ${C.nearBlack}`,
      }}
    >
      {children}
    </div>
  );
}

function Logo({ size = 46, bordered = true }) {
  return (
    <img
      src={logoUrl}
      alt="Bloco Cecílias e Buarques"
      style={{
        width: size, height: size, borderRadius: "50%",
        border: bordered ? `2.5px solid ${C.cream}` : "none",
        objectFit: "cover", flexShrink: 0,
        boxShadow: bordered ? "0 2px 6px rgba(0,0,0,0.25)" : "none",
      }}
    />
  );
}

function PrimaryBtn({ children, onClick, style, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "#C98A5E" : C.orange, color: C.cream,
        border: `2px solid ${C.nearBlack}`, fontFamily: "'Work Sans', sans-serif", fontWeight: 700,
        padding: "12px 26px", borderRadius: 10, fontSize: 15, cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center",
        boxShadow: disabled ? "none" : "0 3px 0 " + C.nearBlack, width: "100%", ...style,
      }}
    >
      {children}
    </button>
  );
}

const inputStyle = {
  width: "100%", padding: "10px 12px", borderRadius: 9, border: `1.5px solid ${C.creamDark}`,
  marginTop: 5, marginBottom: 14, fontSize: 14, fontFamily: "'Work Sans', sans-serif",
  background: "#FFFDF9", boxSizing: "border-box",
};
const labelStyle = { fontSize: 12.5, fontWeight: 700, color: C.darkGreen };

/* ============================= LANDING ============================= */

function Landing({ onEnter }) {
  return (
    <div style={{ background: C.orange, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 20, left: 20 }}><PalmLeaf size={70} /></div>
      <div style={{ position: "absolute", top: 10, right: 10 }}><PalmLeaf flip size={90} /></div>
      {[[60, 90], [140, 60], [700, 80], [640, 160]].map(([top, left], i) => (
        <Star key={i} style={{ position: "absolute", top, left }} />
      ))}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "70px 24px 60px", textAlign: "center", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
          <img src={heroUrl} alt="Bloco Cecílias e Buarques" style={{ width: "100%", maxWidth: 420, height: "auto" }} />
        </div>
        <Ribbon>Sistema de Gestão de Integrantes</Ribbon>
        <div style={{ marginTop: 32 }}>
          <button
            onClick={onEnter}
            style={{
              background: C.orange, color: C.cream, border: `2px solid ${C.nearBlack}`,
              fontFamily: "'Work Sans', sans-serif", fontWeight: 700, padding: "14px 32px",
              borderRadius: 10, fontSize: 16, cursor: "pointer", display: "inline-flex",
              alignItems: "center", gap: 8, boxShadow: "0 3px 0 " + C.nearBlack,
            }}
          >
            Entrar <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <SnakeStrip bg={C.darkGreen} color1={C.cream} color2={C.orange} height={26} />
    </div>
  );
}

/* ============================= AUTH (REAL) ============================= */

function Auth({ onSession }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [novaSenhaFluxo, setNovaSenhaFluxo] = useState(false); // true logo após ativação

  async function tentarLogin() {
    setErro("");
    setLoading(true);
    const emailNorm = email.trim().toLowerCase();

    // 1. Tenta login normal primeiro.
    const { data: loginData, error: loginErr } = await supabase.auth.signInWithPassword({
      email: emailNorm,
      password: senha,
    });

    if (!loginErr && loginData?.session) {
      // Login normal funcionou. Se ainda tiver senha temporária marcada
      // como "não usada" (caso raríssimo, ex: recarregou no meio do fluxo),
      // força troca. Senão, segue pro painel.
      const { data: profile } = await supabase
        .from("profiles")
        .select("senha_temporaria_usada")
        .eq("auth_user_id", loginData.session.user.id)
        .maybeSingle();

      setLoading(false);
      if (profile && profile.senha_temporaria_usada === false) {
        setNovaSenhaFluxo(true);
      } else {
        onSession(loginData.session);
      }
      return;
    }

    // 2. Login normal falhou. Se a senha digitada é a temporária, tenta ativar.
    if (senha === "123456") {
      const { data: fnData, error: fnErr } = await supabase.functions.invoke("activate-account", {
        body: { email: emailNorm, senha },
      });

      if (fnErr || fnData?.error) {
        setLoading(false);
        setErro("Email ou senha inválidos.");
        return;
      }

      // Ativação ok — agora loga de verdade com a senha temporária pra
      // estabelecer sessão, e força a troca.
      const { data: retryLogin, error: retryErr } = await supabase.auth.signInWithPassword({
        email: emailNorm,
        password: "123456",
      });

      setLoading(false);

      if (retryErr || !retryLogin?.session) {
        setErro("Conta ativada, mas houve um problema ao entrar. Tenta de novo em alguns segundos.");
        return;
      }

      setNovaSenhaFluxo(true);
      return;
    }

    setLoading(false);
    setErro("Email ou senha inválidos.");
  }

  if (novaSenhaFluxo) {
    return <NovaSenha onDone={onSession} />;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <div style={{ flex: 1, background: C.darkGreen, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 30, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 20, left: 20 }}><PalmLeaf size={60} color={C.orange} /></div>
        <Logo size={135} />
        <h2 style={{ fontFamily: "'Anton', sans-serif", color: C.cream, fontSize: 28, marginTop: 18, textAlign: "center" }}>
          SEJA BEM VINDO
        </h2>
      </div>
      <div style={{ flex: 1, background: C.cream, display: "flex", alignItems: "center", justifyContent: "center", padding: 30 }}>
        <div style={{ width: "100%", maxWidth: 340 }}>
          <h2 style={{ fontFamily: "'Anton', sans-serif", color: C.darkGreen, fontSize: 24, margin: "0 0 4px" }}>ENTRAR</h2>
          <p style={{ color: "#5A6B5C", fontSize: 13.5, marginBottom: 22 }}>Acesse com seu email e senha.</p>

          <label style={labelStyle}>E-mail</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@email.com"
            style={inputStyle}
            onKeyDown={(e) => e.key === "Enter" && tentarLogin()}
          />
          <label style={labelStyle}>Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
            onKeyDown={(e) => e.key === "Enter" && tentarLogin()}
          />

          {erro && (
            <div style={{ background: "#F7D9D2", color: "#8A2E1A", padding: "9px 12px", borderRadius: 8, fontSize: 13, marginBottom: 14, fontWeight: 600 }}>
              {erro}
            </div>
          )}

          <PrimaryBtn onClick={tentarLogin} disabled={loading || !email || !senha}>
            {loading ? <Loader2 size={16} className="spin" /> : "Entrar"}
          </PrimaryBtn>
        </div>
      </div>
    </div>
  );
}

/* ============================= NOVA SENHA (força troca) ============================= */

function NovaSenha({ onDone }) {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function salvar() {
    setErro("");
    if (novaSenha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (novaSenha !== confirmar) {
      setErro("As senhas não coincidem.");
      return;
    }
    if (novaSenha === "123456") {
      setErro("Escolhe uma senha diferente da temporária.");
      return;
    }
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const { error: updErr } = await supabase.auth.updateUser({ password: novaSenha });
    if (updErr) {
      setLoading(false);
      setErro("Não consegui trocar a senha. Tenta de novo.");
      return;
    }

    await supabase
      .from("profiles")
      .update({ senha_temporaria_usada: true })
      .eq("auth_user_id", userData.user.id);

    const { data: sessionData } = await supabase.auth.getSession();
    setLoading(false);
    onDone(sessionData.session);
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: C.cream, padding: 30 }}>
      <div style={{ width: "100%", maxWidth: 360, background: "#FFFDF9", border: `1.5px solid ${C.creamDark}`, borderRadius: 14, padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}><Logo size={56} /></div>
        <h2 style={{ fontFamily: "'Anton', sans-serif", color: C.darkGreen, fontSize: 22, textAlign: "center", margin: "0 0 6px" }}>
          PRIMEIRO ACESSO
        </h2>
        <p style={{ color: "#5A6B5C", fontSize: 13, textAlign: "center", marginBottom: 20 }}>
          Conta ativada! Agora escolhe uma senha só sua (a 123456 não vai mais funcionar).
        </p>
        <label style={labelStyle}>Nova senha</label>
        <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} style={inputStyle} />
        <label style={labelStyle}>Confirmar senha</label>
        <input type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} style={inputStyle} />
        {erro && (
          <div style={{ background: "#F7D9D2", color: "#8A2E1A", padding: "9px 12px", borderRadius: 8, fontSize: 13, marginBottom: 14, fontWeight: 600 }}>
            {erro}
          </div>
        )}
        <PrimaryBtn onClick={salvar} disabled={loading}>
          {loading ? <Loader2 size={16} className="spin" /> : "Salvar e entrar"}
        </PrimaryBtn>
      </div>
    </div>
  );
}

/* ============================= HELPERS ============================= */

function formatBRL(v) {
  if (v === null || v === undefined) return "—";
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function formatDate(d) {
  if (!d) return "—";
  return new Date(d + "T12:00:00").toLocaleDateString("pt-BR");
}
function formatCompetencia(d) {
  if (!d) return "—";
  return new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
}

function Badge({ status }) {
  const map = {
    pago: { bg: "#DDEFD2", fg: C.leafGreen, label: "Pago", icon: Check },
    pendente: { bg: "#FBE9CF", fg: "#B5720B", label: "Pendente", icon: Clock },
    aguardando_aprovacao: { bg: "#DCE6F5", fg: "#2A5D9F", label: "Aguardando aprovação", icon: Clock },
    atrasado: { bg: "#F7D9D2", fg: "#B5391F", label: "Atrasado", icon: AlertCircle },
    isento: { bg: "#E4E4E4", fg: "#555", label: "Isento", icon: Check },
  };
  const s = map[status] || map.pendente;
  const Icon = s.icon;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: s.bg, color: s.fg, fontWeight: 700, fontSize: 12.5, padding: "5px 12px", borderRadius: 999 }}>
      <Icon size={13} /> {s.label}
    </span>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: "#FFFDF9", borderRadius: 14, border: `1.5px solid ${C.creamDark}`, boxShadow: "0 2px 10px rgba(31,61,43,0.06)", padding: 22, ...style }}>
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontFamily: "'Anton', sans-serif", fontWeight: 400, color: C.darkGreen, fontSize: 24, margin: "0 0 4px 0", textTransform: "uppercase" }}>
      {children}
    </h2>
  );
}

/* ============================= MEMBER SHELL (nav) ============================= */

function MemberShell({ page, setPage, children, onLogout }) {
  const nav = [
    { id: "inicio", label: "Início", icon: Home },
    { id: "pagamentos", label: "Pagamentos", icon: CreditCard },
    { id: "perfil", label: "Perfil", icon: UserCircle },
  ];
  return (
    <div style={{ minHeight: "100vh", background: C.cream }}>
      <div style={{ background: C.darkGreen }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Logo size={40} />
            <div style={{ color: C.cream, fontFamily: "'Anton', sans-serif", fontSize: 15 }}>PORTAL DO INTEGRANTE</div>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {nav.map((n) => {
              const Icon = n.icon;
              const active = page === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setPage(n.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8,
                    border: "none", cursor: "pointer", background: active ? C.orange : "transparent",
                    color: active ? C.cream : "#CFE0CF", fontWeight: 700, fontSize: 13.5,
                  }}
                >
                  <Icon size={15} /> {n.label}
                </button>
              );
            })}
            <button
              onClick={onLogout}
              style={{ marginLeft: 8, display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 8, border: `1.5px solid #3C5C46`, cursor: "pointer", background: "transparent", color: "#CFE0CF", fontWeight: 700, fontSize: 12.5 }}
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "30px 20px 60px" }}>{children}</div>
    </div>
  );
}

/* ============================= INÍCIO ============================= */

function Inicio({ profile }) {
  const [due, setDue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("idle"); // idle -> uploading -> ocr -> done
  const [erro, setErro] = useState("");

  async function carregarCobrancaAtual() {
    setLoading(true);
    const { data } = await supabase
      .from("monthly_dues")
      .select("*")
      .eq("profile_id", profile.id)
      .order("competencia", { ascending: false })
      .limit(1)
      .maybeSingle();
    setDue(data);
    setLoading(false);
  }

  useEffect(() => {
    carregarCobrancaAtual();
  }, [profile.id]);

  async function simularEnvioComprovante() {
    if (!due) return;
    setErro("");
    setStep("uploading");
    await new Promise((r) => setTimeout(r, 1000));
    setStep("ocr");
    await new Promise((r) => setTimeout(r, 1200));

    // SIMULAÇÃO — o OCR de verdade (Gemini) entra numa etapa futura.
    // Por ora, assume que o valor sempre bate, pra validar o fluxo ponta a ponta.
    const { error: proofErr } = await supabase.from("payment_proofs").insert({
      monthly_due_id: due.id,
      valor_detectado: due.valor_esperado,
      data_detectada: new Date().toISOString().slice(0, 10),
      bateu_com_esperado: true,
      aprovacao_automatica: true,
      status: "pago",
    });

    if (proofErr) {
      setErro("Não consegui registrar o comprovante. Tenta de novo.");
      setStep("idle");
      return;
    }

    await supabase
      .from("monthly_dues")
      .update({ status: "pago", pago_em: new Date().toISOString() })
      .eq("id", due.id);

    setStep("done");
    carregarCobrancaAtual();
  }

  if (loading) {
    return <div style={{ padding: 40, textAlign: "center" }}><Loader2 size={22} className="spin" /></div>;
  }

  return (
    <div>
      <SectionTitle>Olá, {profile.nome?.split(" ")[0]}! 👋</SectionTitle>
      <p style={{ color: "#5A6B5C", marginBottom: 24 }}>Aqui está o resumo da sua mensalidade.</p>

      {!due ? (
        <Card style={{ textAlign: "center", color: "#94A395", padding: 40 }}>
          Nenhuma cobrança gerada ainda pra você. A diretoria gera as cobranças no começo de cada mês —
          se você acabou de ativar sua conta, aguarde a próxima geração.
        </Card>
      ) : (
        <Card style={{ background: C.darkGreen, border: "none" }}>
          <div style={{ color: "#B9CBBB", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Mensalidade de {formatCompetencia(due.competencia)}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginTop: 6, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Anton', sans-serif", color: C.cream, fontSize: 36 }}>{formatBRL(due.valor_esperado)}</span>
            <Badge status={due.status} />
          </div>
          <div style={{ color: "#B9CBBB", fontSize: 13, marginTop: 4 }}>Vence em {formatDate(due.vencimento)}</div>

          {due.status === "pendente" && step === "idle" && (
            <label style={{ display: "inline-block", marginTop: 18, cursor: "pointer" }}>
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={simularEnvioComprovante} />
              <span style={{ background: C.orange, color: C.cream, border: `2px solid ${C.nearBlack}`, fontWeight: 700, padding: "12px 26px", borderRadius: 10, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 8, boxShadow: "0 3px 0 " + C.nearBlack }}>
                <Upload size={16} /> Enviar comprovante
              </span>
            </label>
          )}
          {step === "uploading" && (
            <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10, color: C.cream, fontSize: 13.5, fontWeight: 700 }}>
              <Loader2 className="spin" size={18} /> Enviando comprovante...
            </div>
          )}
          {step === "ocr" && (
            <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10, color: C.cream, fontSize: 13.5, fontWeight: 700 }}>
              <Sparkles size={18} /> Lendo valor e data (OCR simulado)...
            </div>
          )}
          {step === "done" && (
            <div style={{ marginTop: 18, background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: 14, color: C.cream, fontSize: 13 }}>
              ✓ Comprovante registrado e aprovado automaticamente.
            </div>
          )}
          {erro && <div style={{ marginTop: 12, color: "#F7B9A6", fontSize: 13 }}>{erro}</div>}
        </Card>
      )}
    </div>
  );
}

/* ============================= PAGAMENTOS ============================= */

function Pagamentos({ profile }) {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("monthly_dues")
        .select("*")
        .eq("profile_id", profile.id)
        .order("competencia", { ascending: false });
      setHistorico(data || []);
      setLoading(false);
    }
    load();
  }, [profile.id]);

  return (
    <div>
      <SectionTitle>Meu histórico</SectionTitle>
      <p style={{ color: "#5A6B5C", marginBottom: 20 }}>Todas as suas mensalidades, mês a mês.</p>
      {loading ? (
        <div style={{ padding: 40, textAlign: "center" }}><Loader2 size={22} className="spin" /></div>
      ) : historico.length === 0 ? (
        <Card style={{ textAlign: "center", color: "#94A395", padding: 40 }}>Nenhuma cobrança no seu histórico ainda.</Card>
      ) : (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          {historico.map((h, i) => (
            <div key={h.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: i < historico.length - 1 ? `1px solid ${C.creamDark}` : "none", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: C.nearBlack, textTransform: "capitalize" }}>{formatCompetencia(h.competencia)}</div>
                <div style={{ fontSize: 12.5, color: "#94A395" }}>{h.pago_em ? `Pago em ${new Date(h.pago_em).toLocaleDateString("pt-BR")}` : `Vence em ${formatDate(h.vencimento)}`}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontWeight: 700, color: C.darkGreen }}>{formatBRL(h.valor_esperado)}</span>
                <Badge status={h.status} />
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

/* ============================= PERFIL ============================= */

const inputStylePerfil = {
  width: "100%", padding: "10px 12px", borderRadius: 9, border: `1.5px solid ${C.creamDark}`,
  marginTop: 5, marginBottom: 14, fontSize: 14, background: "#FFFDF9", boxSizing: "border-box",
};

function Perfil({ profile, onUpdated }) {
  const [telefone, setTelefone] = useState(profile.telefone || "");
  const [endereco, setEndereco] = useState(profile.endereco || "");
  const [instrumento, setInstrumento] = useState(profile.instrumento || "");
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState("");

  async function salvar() {
    setSalvando(true);
    setMsg("");
    // Só campos que o próprio integrante pode mexer — valor_mensalidade,
    // categoria, ativo, email etc. ficam travados pelo trigger no banco
    // mesmo que alguém tente forçar por fora do front-end.
    const { error } = await supabase
      .from("profiles")
      .update({ telefone, endereco, instrumento })
      .eq("auth_user_id", profile.auth_user_id);

    setSalvando(false);
    if (error) {
      setMsg("Não consegui salvar. Tenta de novo.");
    } else {
      setMsg("Salvo!");
      onUpdated({ ...profile, telefone, endereco, instrumento });
    }
  }

  return (
    <div>
      <SectionTitle>Meu perfil</SectionTitle>
      <p style={{ color: "#5A6B5C", marginBottom: 20 }}>Mantenha seus dados atualizados.</p>
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Nome completo</label>
            <input value={profile.nome} disabled style={{ ...inputStylePerfil, background: "#F0EAE0", color: "#8A9689" }} />
          </div>
          <div>
            <label style={labelStyle}>E-mail</label>
            <input value={profile.email} disabled style={{ ...inputStylePerfil, background: "#F0EAE0", color: "#8A9689" }} />
          </div>
          <div>
            <label style={labelStyle}>Telefone</label>
            <input value={telefone} onChange={(e) => setTelefone(e.target.value)} style={inputStylePerfil} />
          </div>
          <div>
            <label style={labelStyle}>Endereço</label>
            <input value={endereco} onChange={(e) => setEndereco(e.target.value)} style={inputStylePerfil} />
          </div>
          <div>
            <label style={labelStyle}>Instrumento / Naipe</label>
            <input value={instrumento} onChange={(e) => setInstrumento(e.target.value)} style={inputStylePerfil} />
          </div>
          <div>
            <label style={labelStyle}>Mensalidade (definida pela diretoria)</label>
            <input value={formatBRL(profile.valor_mensalidade)} disabled style={{ ...inputStylePerfil, background: "#F0EAE0", color: "#8A9689" }} />
          </div>
        </div>
        {msg && <div style={{ color: msg === "Salvo!" ? C.leafGreen : "#C24A2E", fontSize: 13, fontWeight: 700, marginBottom: 10 }}>{msg}</div>}
        <PrimaryBtn onClick={salvar} disabled={salvando} style={{ width: "auto" }}>
          {salvando ? <Loader2 size={16} className="spin" /> : "Salvar alterações"}
        </PrimaryBtn>
      </Card>
    </div>
  );
}

/* ============================= ADMIN SHELL ============================= */

function AdminShell({ page, setPage, children, onLogout, pendentesCount }) {
  const nav = [
    { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "admin-integrantes", label: "Integrantes", icon: Users },
    { id: "admin-comprovantes", label: "Comprovantes", icon: Receipt, badge: pendentesCount },
    { id: "admin-config", label: "Configurações", icon: Settings },
  ];
  return (
    <div style={{ minHeight: "100vh", background: "#FBF6ED", display: "flex" }}>
      <div style={{ width: 220, background: C.nearBlack, color: C.cream, flexShrink: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid #2C3F30" }}>
          <Logo size={38} />
          <div>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 13 }}>CECÍLIAS</div>
            <div style={{ fontSize: 10, color: "#9CB09E", fontWeight: 700 }}>DIRETORIA</div>
          </div>
        </div>
        <div style={{ padding: "14px 10px", flex: 1 }}>
          {nav.map((n) => {
            const Icon = n.icon;
            const active = page === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setPage(n.id)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 13px",
                  borderRadius: 9, border: "none", cursor: "pointer", marginBottom: 5,
                  background: active ? C.orange : "transparent", color: active ? C.cream : "#C7D6C8",
                  fontWeight: 700, fontSize: 13, textAlign: "left",
                }}
              >
                <Icon size={15} /> <span style={{ flex: 1 }}>{n.label}</span>
                {!!n.badge && (
                  <span style={{ background: active ? C.nearBlack : C.orange, color: C.cream, fontSize: 10.5, fontWeight: 800, borderRadius: 999, padding: "1px 7px" }}>
                    {n.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <button
          onClick={onLogout}
          style={{ margin: 14, display: "flex", alignItems: "center", gap: 8, padding: "9px 13px", borderRadius: 9, border: "1.5px solid #3C5C46", background: "transparent", color: "#C7D6C8", fontWeight: 700, fontSize: 12, cursor: "pointer" }}
        >
          <LogOut size={13} /> Sair
        </button>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ background: C.orange, height: 6 }} />
        <div style={{ padding: "26px 30px 60px" }}>{children}</div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <Card style={{ flex: 1, minWidth: 160 }}>
      <div style={{ fontSize: 11.5, fontWeight: 800, color: "#94A395", letterSpacing: "0.05em" }}>{label}</div>
      <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 28, color: accent || C.darkGreen, marginTop: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 11.5, color: "#94A395", marginTop: 2 }}>{sub}</div>}
    </Card>
  );
}

/* ============================= ADMIN: DASHBOARD ============================= */

function competenciaAtual() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gerando, setGerando] = useState(false);
  const [msg, setMsg] = useState("");

  async function carregar() {
    setLoading(true);
    const comp = competenciaAtual();

    const { count: totalAtivos } = await supabase
      .from("profiles").select("*", { count: "exact", head: true }).eq("ativo", true);

    const { data: dues } = await supabase
      .from("monthly_dues").select("status, valor_esperado").eq("competencia", comp);

    const { count: aguardando } = await supabase
      .from("payment_proofs").select("*", { count: "exact", head: true }).eq("status", "aguardando_aprovacao");

    const pagos = (dues || []).filter((d) => d.status === "pago").length;
    const pendentes = (dues || []).filter((d) => d.status === "pendente").length;
    const atrasados = (dues || []).filter((d) => d.status === "atrasado").length;
    const arrecadado = (dues || []).filter((d) => d.status === "pago").reduce((s, d) => s + Number(d.valor_esperado), 0);
    const meta = (dues || []).reduce((s, d) => s + Number(d.valor_esperado), 0);

    setStats({
      totalAtivos: totalAtivos || 0,
      totalCobrancas: (dues || []).length,
      pagos, pendentes, atrasados, arrecadado, meta,
      aguardando: aguardando || 0,
    });
    setLoading(false);
  }

  useEffect(() => { carregar(); }, []);

  async function gerarCobrancasDoMes() {
    setGerando(true);
    setMsg("");
    const comp = competenciaAtual();

    const { data: settings } = await supabase.from("payment_settings").select("*").eq("id", 1).maybeSingle();
    const diaVenc = settings?.dia_vencimento || 10;
    const ano = new Date().getFullYear();
    const mes = new Date().getMonth() + 1;
    const vencimento = `${ano}-${String(mes).padStart(2, "0")}-${String(diaVenc).padStart(2, "0")}`;

    const { data: ativos } = await supabase.from("profiles").select("id, valor_mensalidade, bolsista").eq("ativo", true);

    const rows = (ativos || [])
      .filter((p) => !p.bolsista)
      .map((p) => ({
        profile_id: p.id,
        competencia: comp,
        valor_esperado: p.valor_mensalidade,
        vencimento,
        status: "pendente",
      }));

    if (rows.length === 0) {
      setMsg("Nenhum integrante ativo pra gerar cobrança.");
      setGerando(false);
      return;
    }

    const { error } = await supabase
      .from("monthly_dues")
      .upsert(rows, { onConflict: "profile_id,competencia", ignoreDuplicates: true });

    setGerando(false);
    if (error) {
      setMsg("Erro ao gerar: " + error.message);
    } else {
      setMsg(`${rows.length} cobranças geradas/conferidas pra ${formatCompetencia(comp)}.`);
      carregar();
    }
  }

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}><Loader2 size={22} className="spin" /></div>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <SectionTitle>Dashboard da diretoria</SectionTitle>
          <p style={{ color: "#5A6B5C" }}>{formatCompetencia(competenciaAtual())} · {stats.totalAtivos} integrantes ativos</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <PrimaryBtn onClick={gerarCobrancasDoMes} disabled={gerando} style={{ width: "auto" }}>
            {gerando ? <Loader2 size={16} className="spin" /> : `Gerar cobranças de ${formatCompetencia(competenciaAtual())}`}
          </PrimaryBtn>
          {msg && <div style={{ fontSize: 12, color: C.leafGreen, marginTop: 6, fontWeight: 700, maxWidth: 260 }}>{msg}</div>}
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 22 }}>
        <StatCard
          label="% PAGOS DO MÊS"
          value={stats.totalCobrancas ? `${Math.round((stats.pagos / stats.totalCobrancas) * 100)}%` : "—"}
          sub={`${stats.pagos} de ${stats.totalCobrancas} cobranças`}
          accent={C.leafGreen}
        />
        <StatCard label="ARRECADADO / META" value={formatBRL(stats.arrecadado)} sub={`de ${formatBRL(stats.meta)} previstos`} accent={C.orangeDark} />
        <StatCard label="INADIMPLENTES" value={stats.pendentes + stats.atrasados} sub={`${stats.atrasados} atrasados, ${stats.pendentes} pendentes`} accent="#C24A2E" />
        <StatCard label="COMPROVANTES NA FILA" value={stats.aguardando} sub="divergência — precisa revisão" accent="#2A5D9F" />
      </div>

      {stats.totalCobrancas === 0 && (
        <Card style={{ marginTop: 20, textAlign: "center", color: "#94A395" }}>
          Nenhuma cobrança gerada ainda pra {formatCompetencia(competenciaAtual())}. Clica em "Gerar cobranças" acima.
        </Card>
      )}
    </div>
  );
}

/* ============================= ADMIN: INTEGRANTES ============================= */

const CAMPOS_VAZIOS = {
  nome: "", email: "", telefone: "", cpf: "", endereco: "", instrumento: "",
  valor_mensalidade: 140, ativo: false,
  bolsista: false, eh_admin: false,
};

function IntegranteForm({ inicial, onSalvar, onCancelar, salvando, erro, ehNovo, isMasterAdmin }) {
  const [form, setForm] = useState(inicial);

  function set(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  return (
    <div
      onClick={onCancelar}
      style={{
        position: "fixed", inset: 0, background: "rgba(22,36,28,0.55)", zIndex: 1000,
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "40px 20px", overflowY: "auto",
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 620 }}>
        <Card style={{ border: `2px solid ${C.orange}`, boxShadow: "0 10px 40px rgba(0,0,0,0.35)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: C.darkGreen }}>
              {ehNovo ? "Novo integrante" : `Editando: ${inicial.nome}`}
            </div>
            <button onClick={onCancelar} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}>
              <X size={20} color="#94A395" />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div>
              <label style={labelStyle}>Nome completo</label>
              <input value={form.nome} onChange={(e) => set("nome", e.target.value)} style={inputStylePerfil} />
            </div>
        <div>
          <label style={labelStyle}>E-mail (login)</label>
          {ehNovo ? (
            <input value={form.email} onChange={(e) => set("email", e.target.value)} style={inputStylePerfil} />
          ) : (
            <>
              <input value={form.email} disabled style={{ ...inputStylePerfil, background: "#F0EAE0", color: "#8A9689" }} />
              <div style={{ fontSize: 11, color: "#94A395", marginTop: -10, marginBottom: 10 }}>
                Email não é editável depois de criado (evita descasar do login real). Fala comigo se precisar corrigir um caso específico.
              </div>
            </>
          )}
        </div>
        <div>
          <label style={labelStyle}>Telefone</label>
          <input value={form.telefone} onChange={(e) => set("telefone", e.target.value)} style={inputStylePerfil} placeholder="(11) 9xxxx-xxxxx" />
        </div>
        <div>
          <label style={labelStyle}>CPF</label>
          <input value={form.cpf || ""} onChange={(e) => set("cpf", e.target.value)} style={inputStylePerfil} />
        </div>
        <div>
          <label style={labelStyle}>Endereço</label>
          <input value={form.endereco || ""} onChange={(e) => set("endereco", e.target.value)} style={inputStylePerfil} />
        </div>
        <div>
          <label style={labelStyle}>Instrumento / Naipe</label>
          <input value={form.instrumento || ""} onChange={(e) => set("instrumento", e.target.value)} style={inputStylePerfil} />
        </div>
        <div>
          <label style={labelStyle}>Mensalidade (R$)</label>
          <input
            type="number" step="0.01"
            value={form.bolsista ? 0 : form.valor_mensalidade}
            onChange={(e) => set("valor_mensalidade", e.target.value)}
            disabled={form.bolsista}
            style={form.bolsista ? { ...inputStylePerfil, background: "#F0EAE0", color: "#8A9689" } : inputStylePerfil}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <input type="checkbox" checked={form.ativo} onChange={(e) => set("ativo", e.target.checked)} style={{ width: 18, height: 18 }} />
          <label style={{ ...labelStyle, marginTop: 0 }}>Conta ativa</label>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <input
            type="checkbox"
            checked={form.bolsista}
            onChange={(e) => set("bolsista", e.target.checked)}
            style={{ width: 18, height: 18 }}
          />
          <label style={{ ...labelStyle, marginTop: 0 }}>Bolsista (isento de mensalidade)</label>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <input
            type="checkbox"
            checked={form.eh_admin}
            onChange={(e) => set("eh_admin", e.target.checked)}
            disabled={!isMasterAdmin}
            style={{ width: 18, height: 18 }}
          />
          <label style={{ ...labelStyle, marginTop: 0 }}>Admin</label>
        </div>
      </div>

      {!isMasterAdmin && (
        <div style={{ fontSize: 11, color: "#94A395", marginTop: 10 }}>
          Só o master admin pode conceder ou remover acesso de administrador.
        </div>
      )}

      {form.eh_admin && !inicial.auth_user_id && (
        <div style={{ fontSize: 11.5, color: "#B5720B", marginTop: 10, background: "#FBE9CF", padding: "8px 12px", borderRadius: 8 }}>
          Essa pessoa ainda não ativou a conta — o acesso de admin é concedido automaticamente assim que ela ativar (email + senha 123456).
        </div>
      )}

      {ehNovo && (
        <div style={{ fontSize: 11.5, color: "#94A395", marginTop: 6, marginBottom: 10 }}>
          Se deixar "Conta ativa" desmarcado, a pessoa ativa sozinha depois com email + senha <b>123456</b>, como todo mundo.
        </div>
      )}

      {erro && <div style={{ color: "#C24A2E", fontSize: 13, fontWeight: 700, marginTop: 10 }}>{erro}</div>}

          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <PrimaryBtn onClick={() => onSalvar(form)} disabled={salvando} style={{ width: "auto" }}>
              {salvando ? <Loader2 size={16} className="spin" /> : "Salvar"}
            </PrimaryBtn>
            <button onClick={onCancelar} style={{ background: "transparent", border: `2px solid ${C.darkGreen}`, color: C.darkGreen, borderRadius: 10, fontWeight: 700, padding: "0 20px", cursor: "pointer" }}>
              Cancelar
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function AdminIntegrantes({ isMasterAdmin }) {
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modo, setModo] = useState(null); // null | 'novo' | { ...membro editando }
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregar() {
    setLoading(true);
    const { data } = await supabase.from("profiles").select("*").order("nome");
    setMembros(data || []);
    setLoading(false);
  }
  useEffect(() => { carregar(); }, []);

  async function salvarNovo(form) {
    setSalvando(true);
    setErro("");
    try {
      const { error } = await supabase.from("profiles").insert({
        nome: form.nome,
        email: form.email.trim().toLowerCase(),
        telefone: form.telefone,
        cpf: form.cpf || null,
        endereco: form.endereco || null,
        instrumento: form.instrumento || null,
        valor_mensalidade: form.bolsista ? 0 : form.valor_mensalidade,
        ativo: form.ativo,
        bolsista: form.bolsista,
        eh_admin: form.eh_admin,
      });
      if (error) {
        setErro(error.message.includes("duplicate") ? "Já existe um cadastro com esse email." : error.message);
        return;
      }
      setModo(null);
      carregar();
    } catch (e) {
      setErro("Erro inesperado: " + String(e?.message || e));
    } finally {
      setSalvando(false);
    }
  }

  async function salvarEdicao(membroOriginal, form) {
    setSalvando(true);
    setErro("");
    try {
      const { error } = await supabase.from("profiles").update({
        nome: form.nome,
        telefone: form.telefone,
        cpf: form.cpf || null,
        endereco: form.endereco || null,
        instrumento: form.instrumento || null,
        valor_mensalidade: form.bolsista ? 0 : form.valor_mensalidade,
        ativo: form.ativo,
        bolsista: form.bolsista,
        eh_admin: form.eh_admin,
      }).eq("id", membroOriginal.id);
      if (error) {
        setErro(error.message);
        return;
      }

      // Sincroniza o papel real em user_roles — só se for master admin e
      // a pessoa já tiver ativado a conta (auth_user_id existe). Se ainda
      // não ativou, o flag eh_admin já foi salvo acima e a Edge Function
      // de ativação concede o papel sozinha na hora certa.
      if (isMasterAdmin && membroOriginal.auth_user_id && form.eh_admin !== membroOriginal.eh_admin) {
        if (form.eh_admin) {
          await supabase.from("user_roles").insert({ auth_user_id: membroOriginal.auth_user_id, role: "admin" });
        } else {
          await supabase.from("user_roles").delete()
            .eq("auth_user_id", membroOriginal.auth_user_id)
            .eq("role", "admin");
        }
      }

      setModo(null);
      carregar();
    } catch (e) {
      setErro("Erro inesperado: " + String(e?.message || e));
    } finally {
      setSalvando(false);
    }
  }

  const filtrados = membros.filter((m) => m.nome.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, flexWrap: "wrap", gap: 10 }}>
        <div>
          <SectionTitle>Integrantes</SectionTitle>
          <p style={{ color: "#5A6B5C" }}>{membros.length} cadastrados · {membros.filter((m) => m.ativo).length} ativos</p>
        </div>
        {modo === null && (
          <PrimaryBtn onClick={() => { setModo("novo"); setSalvando(false); setErro(""); }} style={{ width: "auto" }}>+ Novo integrante</PrimaryBtn>
        )}
      </div>

      {modo === "novo" && (
        <IntegranteForm
          inicial={CAMPOS_VAZIOS}
          ehNovo
          isMasterAdmin={isMasterAdmin}
          salvando={salvando}
          erro={erro}
          onSalvar={salvarNovo}
          onCancelar={() => { setModo(null); setErro(""); }}
        />
      )}

      {modo && modo !== "novo" && (
        <IntegranteForm
          inicial={{ ...modo, _ativoOriginal: modo.ativo }}
          isMasterAdmin={isMasterAdmin}
          salvando={salvando}
          erro={erro}
          onSalvar={(form) => salvarEdicao(modo, form)}
          onCancelar={() => { setModo(null); setErro(""); }}
        />
      )}

      <div style={{ position: "relative", marginBottom: 14, maxWidth: 320 }}>
        <Search size={15} style={{ position: "absolute", left: 12, top: 12, color: "#94A395" }} />
        <input placeholder="Buscar por nome ou email..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ ...inputStylePerfil, paddingLeft: 34, marginBottom: 0 }} />
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: "center" }}><Loader2 size={22} className="spin" /></div>
      ) : (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr 1fr 0.9fr 0.7fr 60px", padding: "10px 16px", background: C.cream, fontSize: 11, fontWeight: 800, color: "#5A6B5C" }}>
            <div>NOME</div><div>TELEFONE</div><div>SELOS</div><div>MENSALIDADE</div><div>ATIVO</div><div></div>
          </div>
          {filtrados.map((m) => (
            <div key={m.id} style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr 1fr 0.9fr 0.7fr 60px", alignItems: "center", padding: "10px 16px", borderTop: `1px solid ${C.creamDark}`, fontSize: 13 }}>
              <div>
                <div style={{ fontWeight: 700 }}>{m.nome}</div>
                <div style={{ fontSize: 11.5, color: "#94A395" }}>{m.email}</div>
              </div>
              <div style={{ color: "#5A6B5C" }}>{m.telefone || "—"}</div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {m.eh_admin && (
                  <span style={{ background: "#DCE6F5", color: "#2A5D9F", fontWeight: 700, fontSize: 11, padding: "3px 9px", borderRadius: 999 }}>Admin</span>
                )}
                {m.bolsista && (
                  <span style={{ background: "#F0E4F7", color: "#7B3FA0", fontWeight: 700, fontSize: 11, padding: "3px 9px", borderRadius: 999 }}>Bolsista</span>
                )}
                {!m.eh_admin && !m.bolsista && <span style={{ color: "#C7CFC8", fontSize: 11 }}>—</span>}
              </div>
              <div style={{ fontWeight: 700 }}>{formatBRL(m.valor_mensalidade)}</div>
              <div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: m.ativo ? "#DDEFD2" : "#E4E4E4", color: m.ativo ? C.leafGreen : "#777", fontWeight: 700, fontSize: 12.5, padding: "5px 12px", borderRadius: 999 }}>
                  {m.ativo ? "Ativo" : "Inativo"}
                </span>
              </div>
              <button onClick={() => { setModo(m); setErro(""); setSalvando(false); }} style={{ background: "transparent", border: "none", cursor: "pointer" }}>
                <Pencil size={15} color="#94A395" />
              </button>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

/* ============================= ADMIN: COMPROVANTES ============================= */

function AdminComprovantes({ adminProfile, onChanged }) {
  const [fila, setFila] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    setLoading(true);
    const { data } = await supabase
      .from("payment_proofs")
      .select("*, monthly_dues(*, profiles(nome, email))")
      .eq("status", "aguardando_aprovacao")
      .order("enviado_em", { ascending: true });
    setFila(data || []);
    setLoading(false);
  }
  useEffect(() => { carregar(); }, []);

  async function aprovar(p) {
    await supabase.from("monthly_dues").update({ status: "pago", pago_em: new Date().toISOString(), aprovado_por: adminProfile.id }).eq("id", p.monthly_due_id);
    await supabase.from("payment_proofs").update({ status: "pago", aprovado_por: adminProfile.id, aprovado_em: new Date().toISOString() }).eq("id", p.id);
    carregar();
    onChanged && onChanged();
  }
  async function rejeitar(p) {
    await supabase.from("payment_proofs").delete().eq("id", p.id);
    carregar();
    onChanged && onChanged();
  }

  return (
    <div>
      <SectionTitle>Fila de comprovantes</SectionTitle>
      <p style={{ color: "#5A6B5C", marginBottom: 20 }}>Só chegam aqui os casos onde o OCR detectou divergência — o resto aprova sozinho.</p>

      {loading ? (
        <div style={{ padding: 40, textAlign: "center" }}><Loader2 size={22} className="spin" /></div>
      ) : fila.length === 0 ? (
        <Card style={{ textAlign: "center", padding: 50, color: "#94A395" }}>Fila vazia — tudo em dia por aqui 🎉</Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {fila.map((p) => (
            <Card key={p.id}>
              <div style={{ fontWeight: 700, fontSize: 14.5 }}>{p.monthly_dues?.profiles?.nome}</div>
              <div style={{ fontSize: 12, color: "#94A395", marginBottom: 8 }}>{p.monthly_dues?.profiles?.email}</div>
              <div style={{ fontSize: 13 }}>
                <b>OCR detectou:</b> {formatBRL(p.valor_detectado)} · {formatDate(p.data_detectada)}
              </div>
              <div style={{ fontSize: 13, marginTop: 2 }}>
                <b>Esperado:</b> {formatBRL(p.monthly_dues?.valor_esperado)}
              </div>
              <div style={{ fontSize: 12, color: "#C24A2E", fontWeight: 700, marginTop: 4 }}>⚠ valor diverge do esperado</div>
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <PrimaryBtn onClick={() => aprovar(p)} style={{ flex: 1, width: "auto" }}><ThumbsUp size={14} /> Aprovar</PrimaryBtn>
                <button onClick={() => rejeitar(p)} style={{ flex: 1, background: "transparent", border: `2px solid ${C.darkGreen}`, color: C.darkGreen, borderRadius: 9, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <ThumbsDown size={14} /> Rejeitar
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================= ADMIN: CONFIGURAÇÕES ============================= */

function AdminConfig({ isMasterAdmin }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.from("payment_settings").select("*").eq("id", 1).maybeSingle().then(({ data }) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  async function salvar() {
    setSalvando(true);
    setMsg("");
    const { error } = await supabase
      .from("payment_settings")
      .update({
        valor_integrante: settings.valor_integrante,
        dia_vencimento: settings.dia_vencimento,
        dias_aviso_antes: settings.dias_aviso_antes,
        reply_to_email: settings.reply_to_email,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    setSalvando(false);
    setMsg(error ? "Erro: " + error.message : "Salvo!");
  }

  if (loading) return <div style={{ padding: 40, textAlign: "center" }}><Loader2 size={22} className="spin" /></div>;

  return (
    <div>
      <SectionTitle>Configurações</SectionTitle>
      <p style={{ color: "#5A6B5C", marginBottom: 20 }}>Valores sugeridos, prazos e avisos automáticos.</p>
      {!isMasterAdmin && (
        <div style={{ background: "#FBE9CF", color: "#8A5A0B", padding: "10px 14px", borderRadius: 9, fontSize: 13, marginBottom: 16, maxWidth: 520 }}>
          Só o master admin pode alterar essas configurações. Você pode visualizar, mas o salvamento vai ser bloqueado pelo banco.
        </div>
      )}
      <Card style={{ maxWidth: 520 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={labelStyle}>Valor sugerido (novo cadastro)</label>
            <input type="number" step="0.01" value={settings.valor_integrante} onChange={(e) => setSettings({ ...settings, valor_integrante: e.target.value })} style={inputStylePerfil} disabled={!isMasterAdmin} />
          </div>
          <div>
            <label style={labelStyle}>Dia de vencimento</label>
            <input type="number" min="1" max="28" value={settings.dia_vencimento} onChange={(e) => setSettings({ ...settings, dia_vencimento: e.target.value })} style={inputStylePerfil} disabled={!isMasterAdmin} />
          </div>
          <div>
            <label style={labelStyle}>Dias de aviso antes</label>
            <input type="number" value={settings.dias_aviso_antes} onChange={(e) => setSettings({ ...settings, dias_aviso_antes: e.target.value })} style={inputStylePerfil} disabled={!isMasterAdmin} />
          </div>
          <div>
            <label style={labelStyle}>E-mail reply-to</label>
            <input value={settings.reply_to_email} onChange={(e) => setSettings({ ...settings, reply_to_email: e.target.value })} style={inputStylePerfil} disabled={!isMasterAdmin} />
          </div>
        </div>
        {msg && <div style={{ fontSize: 13, fontWeight: 700, color: msg === "Salvo!" ? C.leafGreen : "#C24A2E", marginBottom: 10 }}>{msg}</div>}
        {isMasterAdmin && (
          <PrimaryBtn onClick={salvar} disabled={salvando} style={{ width: "auto" }}>
            {salvando ? <Loader2 size={16} className="spin" /> : "Salvar configurações"}
          </PrimaryBtn>
        )}
      </Card>
    </div>
  );
}

/* ============================= PAINEL (roteador do portal) ============================= */

function Painel({ session, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(null);
  const [pendentesCount, setPendentesCount] = useState(0);

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("auth_user_id", session.user.id)
        .maybeSingle();
      const { data: r } = await supabase
        .from("user_roles")
        .select("role")
        .eq("auth_user_id", session.user.id);
      const rolesList = (r || []).map((x) => x.role);
      setProfile(data);
      setRoles(rolesList);
      const isAdmin = rolesList.includes("admin") || rolesList.includes("master_admin");
      setPage(isAdmin ? "admin-dashboard" : "inicio");

      if (isAdmin) {
        const { count } = await supabase.from("payment_proofs").select("*", { count: "exact", head: true }).eq("status", "aguardando_aprovacao");
        setPendentesCount(count || 0);
      }
      setLoading(false);
    }
    load();
  }, [session]);

  if (loading || !page) {
    return <div style={{ padding: 60, textAlign: "center" }}><Loader2 size={24} className="spin" /></div>;
  }
  if (!profile) {
    return <div style={{ padding: 60, textAlign: "center", color: "#8A2E1A" }}>Não achei seu profile vinculado. Fala com a diretoria.</div>;
  }

  const isAdmin = roles.includes("admin") || roles.includes("master_admin");
  const isMasterAdmin = roles.includes("master_admin");

  if (isAdmin) {
    return (
      <AdminShell page={page} setPage={setPage} onLogout={onLogout} pendentesCount={pendentesCount}>
        {page === "admin-dashboard" && <AdminDashboard />}
        {page === "admin-integrantes" && <AdminIntegrantes isMasterAdmin={isMasterAdmin} />}
        {page === "admin-comprovantes" && <AdminComprovantes adminProfile={profile} />}
        {page === "admin-config" && <AdminConfig isMasterAdmin={isMasterAdmin} />}
      </AdminShell>
    );
  }

  return (
    <MemberShell page={page} setPage={setPage} onLogout={onLogout}>
      {page === "inicio" && <Inicio profile={profile} />}
      {page === "pagamentos" && <Pagamentos profile={profile} />}
      {page === "perfil" && <Perfil profile={profile} onUpdated={setProfile} />}
    </MemberShell>
  );
}

/* ============================= APP ROOT ============================= */

export default function App() {
  const [page, setPage] = useState("landing");
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setSession(data.session);
        setPage("painel");
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!s) {
        setSession(null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setSession(null);
    setPage("landing");
  }

  let content;
  if (page === "landing") content = <Landing onEnter={() => setPage("auth")} />;
  else if (page === "auth")
    content = (
      <Auth
        onSession={(s) => {
          setSession(s);
          setPage("painel");
        }}
      />
    );
  else content = <Painel session={session} onLogout={logout} />;

  return (
    <div style={{ minHeight: "100vh" }}>
      <style>{`
        ${FONT_IMPORT}
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; min-height: 100%; }
        body { margin: 0; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input:focus { outline: 2px solid ${C.leafGreen}; outline-offset: 1px; }
      `}</style>
      {content}
    </div>
  );
}
