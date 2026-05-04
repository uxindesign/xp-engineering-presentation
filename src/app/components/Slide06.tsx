import { motion } from "motion/react";
import svgPaths from "../../imports/06EstruturaEProcessoIdeal/svg-qr6s1d1r3a";
import { imgGroup } from "../../imports/06EstruturaEProcessoIdeal/svg-cceda";

interface Props {
  scaleX: number;
  scaleY: number;
  onPrev: () => void;
  onNext: () => void;
}

const ease = "easeOut" as const;
const fade = (delay: number) => ({ duration: 0.5, delay, ease });

// ── Icon helpers ───────────────────────────────────────────────────────────────

const Mask = ({ id }: { id: string }) => (
  <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32" style={{ maskType: "alpha" as const }}>
    <rect width="32" height="32" fill="#D9D9D9" />
  </mask>
);

// SVG uses viewBox so it scales with its wrapper div
function SvgIcon32({ maskId, path, fill }: { maskId: string; path: string; fill: string }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
      <Mask id={maskId} />
      <g mask={`url(#${maskId})`}>
        <path d={path} fill={fill} />
      </g>
    </svg>
  );
}

// ── TIS Logo ──────────────────────────────────────────────────────────────────

function TisLogo({ scale }: { scale: (n: number) => number }) {
  return (
    <div style={{ width: scale(120), height: scale(54), position: "relative", opacity: 0.9, overflow: "hidden", flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          inset: "0 0.06% 0.73% 0",
          maskImage: `url('${imgGroup}')`,
          WebkitMaskImage: `url('${imgGroup}')`,
          maskSize: `${scale(236)}px ${scale(105.223)}px`,
          maskRepeat: "no-repeat",
          maskPosition: "0px 0px",
        }}
      >
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 119.929 53.6039">
          <path d={svgPaths.p1bc3fc80} fill="#036EF2" />
          <path d={svgPaths.p8ed8880} fill="#036EF2" />
          <path d={svgPaths.p79b1980} fill="#036EF2" />
          <path d={svgPaths.p3380500} fill="#04165D" />
          <path d={svgPaths.p3777a600} fill="#04165D" />
          <path d={svgPaths.p30300b00} fill="#04165D" />
        </svg>
      </div>
    </div>
  );
}

// ── Step circle — uses viewBox so parent div controls size ────────────────────

function StepCircle() {
  return (
    <svg width="100%" height="100%" viewBox="-1 -1 46 46" fill="none">
      <circle cx="22" cy="22" r="22" fill="#036EF2" />
      <circle cx="22" cy="22" r="14" fill="white" />
      <circle cx="22" cy="22" r="7" fill="#036EF2" />
    </svg>
  );
}

// ── Connection arrows (curved paths) ─────────────────────────────────────────

function ConectionLeft({ sc }: { sc: (n: number) => number }) {
  return (
    <div style={{ height: sc(354), position: "relative", width: "100%", flexShrink: 0, overflow: "visible" }}>
      <div style={{ position: "absolute", left: sc(74), top: sc(8), width: sc(118), height: sc(291), display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "rotate(90deg)", transformOrigin: "center", flexShrink: 0 }}>
          <div style={{ width: sc(291), height: sc(118), position: "relative" }}>
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 295.828 122.005">
              <path d={svgPaths.p11bb4800} stroke="#04165D" strokeLinecap="round" strokeWidth={sc(4)} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConectionRight({ sc }: { sc: (n: number) => number }) {
  return (
    <div style={{ height: sc(354), position: "relative", width: "100%", flexShrink: 0, overflow: "visible" }}>
      <div style={{ position: "absolute", left: sc(-20), top: sc(8), width: sc(111), height: sc(325) }}>
        <svg style={{ position: "absolute", inset: "-0.62% -1.8% -0.62% -2.55%", width: "103.6%", height: "101.24%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 115.828 329.005">
          <path d={svgPaths.p29e92690} stroke="#04165D" strokeLinecap="round" strokeWidth={sc(4)} />
        </svg>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function Slide06({ scaleX, scaleY }: Props) {
  const s = Math.min(scaleX, scaleY);
  const vx = (n: number) => n * scaleX;
  const vy = (n: number) => n * scaleY;
  const vs = (n: number) => n * s;

  // Design-space layout constants (px at 1920×1080)
  const ROW_W      = 1360;
  const SIDE_STEP_W = 180;
  const COL_W      = 32;
  const COL1_W     = 40;
  const DIAGRAM_W  = ROW_W + SIDE_STEP_W * 2 + COL_W + COL1_W; // 1792

  const IA_ITEMS = [
    { maskId: "s06-ms",  path: svgPaths.p22ba1e00, fill: "#036EF2", label: "Pesquisa e síntese" },
    { maskId: "s06-lb",  path: svgPaths.p24a727c0, fill: "#036EF2", label: "Geração de ideias" },
    { maskId: "s06-vc",  path: svgPaths.p1c0e6c00, fill: "#036EF2", label: "Prototipação rápida" },
    { maskId: "s06-mon", path: svgPaths.p24739b00, fill: "#036EF2", label: "Análise e avaliação" },
    { maskId: "s06-lp",  path: svgPaths.p6cb7d00,  fill: "#036EF2", label: "Documentação e comunicação" },
    { maskId: "s06-as",  path: svgPaths.p29031600, fill: "#036EF2", label: "Automação e escala" },
  ];

  const STEPS = [
    { title: "Descobrir",  desc: "Entender o problema, o usuário e o contexto" },
    { title: "Definir",    desc: "Estabelecer escopo, personas e critérios" },
    { title: "Explorar",   desc: "Gerar e avaliar possibilidades de solução" },
    { title: "Validar",    desc: "Testar com usuários, iterar com evidência" },
    { title: "Entregar",   desc: "Especificar, alinhar com dev, acompanhar build" },
    { title: "Acompanhar", desc: "Avaliar impacto, extrair aprendizados" },
  ];

  const TAGS = [
    "Nível de incerteza",
    "Risco da decisão",
    "Impacto para os utilizadores e o negócio",
    "Tempo e recursos disponíveis",
    "Evidências e confiança",
  ];

  return (
    <motion.div
      key="slide-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 bg-white overflow-hidden"
    >
      {/* ════════════════ HEADER ════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: vs(-18) }}
        animate={{ opacity: 1, y: 0 }}
        transition={fade(0.05)}
        style={{
          position: "absolute",
          left: vx(120),
          top: vy(96),
          width: vx(1680),
          display: "flex",
          flexDirection: "column",
          gap: vs(24),
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: vs(16) }}>
          <p style={{ fontFamily: "'Bronkoh-SemiBold', sans-serif", fontSize: vs(16), letterSpacing: vs(2), color: "#036ef2", textTransform: "uppercase", lineHeight: "normal", fontStyle: "normal" }}>
            Como o trabalho passa a acontecer
          </p>
          <p style={{ fontFamily: "'Bronkoh-Heavy', sans-serif", fontSize: vs(80), letterSpacing: vs(-1.5), color: "#04165d", lineHeight: 1, fontStyle: "normal" }}>
            Processo de Design apoiado por IA
          </p>
        </div>
        <p style={{ fontFamily: "'Bronkoh-Regular', sans-serif", fontSize: vs(28), color: "#2f3237", lineHeight: 1.5, fontStyle: "normal" }}>
          Etapas com profundidade ajustada ao problema, onde a IA atua como suporte para acelerar o processo.
        </p>
      </motion.div>

      {/* ════════════════ FOOTER ════════════════════════════════════════════ */}
      <div style={{ position: "absolute", left: vx(120), top: vy(946), width: vx(1680), display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: vs(20), alignItems: "center" }}>
          <p style={{ fontFamily: "'Bronkoh-SemiBold', sans-serif", fontSize: vs(14), letterSpacing: vs(1.5), color: "#036ef2", textTransform: "uppercase", lineHeight: "normal" }}>06</p>
          <div style={{ width: vs(24), height: vs(2), overflow: "hidden", position: "relative", flexShrink: 0 }}>
            <div style={{ position: "absolute", background: "rgba(43,118,193,0.4)", height: vs(1), left: 0, right: 0, top: 0 }} />
          </div>
          <p style={{ fontFamily: "'Bronkoh-SemiBold', sans-serif", fontSize: vs(14), letterSpacing: vs(1.5), color: "#6e7587", textTransform: "uppercase", lineHeight: "normal" }}>
            Estrutura e processo ideal
          </p>
        </div>
        <TisLogo scale={vs} />
      </div>

      {/* ════════════════ DIAGRAM CONTAINER ════════════════════════════════ */}
      {/*
        Outer motion.div: position absolute, spans full width (left:0 right:0),
        uses flexbox centering — this is the most reliable centering approach,
        no calc() needed, works at any viewport/aspect ratio.
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fade(0.12)}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: vy(325),
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "visible",
        }}
      >
        {/* Inner wrapper: exact scaled design-space width */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          width: vs(DIAGRAM_W),
          flexShrink: 0,
          overflow: "visible",
        }}>

          {/* ── LEFT: Contexto step ──────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: vs(16), alignItems: "center", paddingTop: vs(88), flexShrink: 0, width: vs(SIDE_STEP_W), overflow: "visible" }}>
            <div style={{ background: "#036ef2", borderRadius: vs(999), width: vs(48), height: vs(48), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: vs(32), height: vs(32) }}>
                <SvgIcon32 maskId="s06-subject" path={svgPaths.p138e2c00} fill="white" />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: vs(8), alignItems: "center", textAlign: "center", width: "100%" }}>
              <p style={{ fontFamily: "'Bronkoh-Heavy', sans-serif", fontSize: vs(24), color: "#04165d", lineHeight: "normal", fontStyle: "normal", whiteSpace: "nowrap" }}>
                Contexto
              </p>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: vs(14), color: "#2f3237", lineHeight: 1.4, letterSpacing: vs(0.25) }}>
                Negócio, Utilizadores, Dados, Tecnologia, Restrições
              </p>
            </div>
            <ConectionLeft sc={vs} />
          </div>

          {/* ── LEFT arrows column (NE + SE) ─────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: vs(8), alignItems: "flex-start", justifyContent: "center", paddingTop: vs(124), flexShrink: 0, width: vs(COL_W) }}>
            <div style={{ width: vs(32), height: vs(32) }}>
              <SvgIcon32 maskId="s06-ne" path={svgPaths.p2b38b00} fill="#04165D" />
            </div>
            <div style={{ width: vs(32), height: vs(32) }}>
              <SvgIcon32 maskId="s06-se" path={svgPaths.p35a70680} fill="#04165D" />
            </div>
          </div>

          {/* ── CENTER: Row ──────────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: vs(ROW_W) }}>

            {/* IA apoio transversal */}
            <div style={{ position: "relative", borderRadius: vs(28), width: "100%", flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: 0, border: `${vs(1)}px solid #6e7587`, borderRadius: vs(28), pointerEvents: "none" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: vs(20), alignItems: "center", padding: `${vs(24)}px ${vs(56)}px`, position: "relative" }}>
                <p style={{ fontFamily: "'Bronkoh-Heavy', sans-serif", fontSize: vs(24), lineHeight: `${vs(32)}px`, color: "#04165d", textAlign: "center", fontStyle: "normal" }}>
                  IA como camada de apoio transversal
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                  {IA_ITEMS.map((item) => (
                    <div key={item.maskId} style={{ display: "flex", gap: vs(8), alignItems: "center", justifyContent: "center", width: vs(160), flexShrink: 0 }}>
                      <div style={{ width: vs(32), height: vs(32), flexShrink: 0 }}>
                        <SvgIcon32 maskId={item.maskId} path={item.path} fill={item.fill} />
                      </div>
                      <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: vs(15), color: "#2f3237", letterSpacing: vs(-0.25), lineHeight: "normal" }}>
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Swap-vert arrows row */}
            <div style={{ display: "flex", gap: vs(190), alignItems: "center", justifyContent: "center", padding: `${vs(2)}px 0`, width: "100%" }}>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} style={{ width: vs(32), height: vs(32), flexShrink: 0 }}>
                  <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
                    <mask id={`s06-sv-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32" style={{ maskType: "alpha" as const }}>
                      <rect width="32" height="32" fill="#D9D9D9" />
                    </mask>
                    <g mask={`url(#s06-sv-${i})`}>
                      <path d={svgPaths.p15dcc200} fill="#04165D" />
                    </g>
                  </svg>
                </div>
              ))}
            </div>

            {/* Steps frame */}
            <div style={{ background: "rgba(3,110,242,0.06)", position: "relative", borderRadius: vs(28), width: "100%", flexShrink: 0 }}>
              <div style={{ position: "absolute", inset: 0, border: `${vs(1)}px solid #036ef2`, borderRadius: vs(28), pointerEvents: "none" }} />
              {/* Horizontal connector line */}
              <div style={{ position: "absolute", background: "#036ef2", height: vs(4), left: vs(130), right: vs(130), top: vs(100), zIndex: 1 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: vs(32), padding: `${vs(32)}px ${vs(20)}px ${vs(20)}px` }}>
                {/* 6 steps */}
                <div style={{ display: "flex", alignItems: "flex-start", width: "100%" }}>
                  {STEPS.map((step, i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: vs(16), alignItems: "center", overflow: "visible", flex: "1 0 0" }}>
                      <p style={{ fontFamily: "'Bronkoh-Heavy', sans-serif", fontSize: vs(24), lineHeight: `${vs(32)}px`, color: "#04165d", textAlign: "center", fontStyle: "normal", width: "100%" }}>
                        {step.title}
                      </p>
                      <div style={{ width: vs(44), height: vs(44), flexShrink: 0, position: "relative", zIndex: 2 }}>
                        <StepCircle />
                      </div>
                      <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: vs(14), color: "#2f3237", textAlign: "center", letterSpacing: vs(0.25), lineHeight: 1.4, width: vs(190) }}>
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Decidir container */}
                <div style={{ background: "rgba(3,110,242,0.06)", position: "relative", borderRadius: vs(16), width: "100%", flexShrink: 0 }}>
                  <div style={{ position: "absolute", inset: 0, border: `${vs(1)}px solid rgba(43,118,193,0.4)`, borderRadius: vs(16), pointerEvents: "none" }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: vs(8), alignItems: "center", padding: `${vs(16)}px ${vs(32)}px` }}>
                    <p style={{ fontFamily: "'Bronkoh-Heavy', sans-serif", fontSize: vs(18), lineHeight: `${vs(24)}px`, color: "#04165d", textAlign: "center", fontStyle: "normal", whiteSpace: "nowrap" }}>
                      Decidir o quanto investir, acelerar ou aprofundar em cada fase com base em:
                    </p>
                    <div style={{ display: "flex", gap: vs(8), alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
                      {TAGS.map((tag) => (
                        <div key={tag} style={{ background: "#fff", position: "relative", borderRadius: vs(999), flexShrink: 0, padding: `${vs(6)}px ${vs(16)}px` }}>
                          <div style={{ position: "absolute", inset: 0, border: `${vs(1)}px solid rgba(43,118,193,0.4)`, borderRadius: vs(999), pointerEvents: "none" }} />
                          <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: vs(14), color: "#2f3237", letterSpacing: vs(-0.25), lineHeight: "normal", whiteSpace: "nowrap" }}>
                            {tag}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Processo contínuo */}
            <div style={{ paddingTop: vs(8), width: "100%" }}>
              <div style={{ background: "rgba(44,201,44,0.06)", position: "relative", borderRadius: vs(28), width: "100%", display: "flex", gap: vs(16), alignItems: "center", justifyContent: "center", padding: `${vs(24)}px ${vs(56)}px` }}>
                <div style={{ position: "absolute", inset: 0, border: `${vs(1)}px solid #3b953b`, borderRadius: vs(28), pointerEvents: "none" }} />
                <div style={{ background: "#078207", borderRadius: vs(999), width: vs(44), height: vs(44), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: vs(28), height: vs(28) }}>
                    <svg width="100%" height="100%" viewBox="0 0 28 28" fill="none">
                      <mask id="s06-renew" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28" style={{ maskType: "alpha" as const }}>
                        <rect width="28" height="28" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#s06-renew)">
                        <path d={svgPaths.p37063700} fill="white" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <p style={{ fontFamily: "'Bronkoh-Heavy', sans-serif", fontSize: vs(22), lineHeight: `${vs(28)}px`, color: "#078207", fontStyle: "normal", whiteSpace: "nowrap" }}>
                    Processo contínuo de aprendizado e iteração
                  </p>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: vs(14), color: "#2f3237", letterSpacing: vs(0.25), lineHeight: 1.4, whiteSpace: "nowrap" }}>
                    Cada ciclo gera evidências que realimentam o contexto e melhoram as próximas decisões
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT arrows column ───────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", paddingTop: vs(140), flexShrink: 0, width: vs(COL1_W) }}>
            <div style={{ width: vs(40), height: vs(40), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" style={{ transform: "rotate(-90deg)" }}>
                <mask id="s06-arrow-right" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40" style={{ maskType: "alpha" as const }}>
                  <rect width="40" height="40" fill="#D9D9D9" />
                </mask>
                <g mask="url(#s06-arrow-right)">
                  <path d={svgPaths.p3a327f1} fill="#04165D" />
                </g>
              </svg>
            </div>
          </div>

          {/* ── RIGHT: Valor step ─────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: vs(16), alignItems: "center", paddingTop: vs(88), flexShrink: 0, width: vs(SIDE_STEP_W), overflow: "visible" }}>
            <div style={{ background: "#078207", borderRadius: vs(999), width: vs(48), height: vs(48), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <div style={{ width: vs(32), height: vs(32) }}>
                <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
                  <mask id="s06-star" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32" style={{ maskType: "alpha" as const }}>
                    <rect width="32" height="32" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#s06-star)">
                    <path d={svgPaths.p12090600} fill="white" />
                  </g>
                </svg>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: vs(8), alignItems: "center", textAlign: "center", width: "100%" }}>
              <p style={{ fontFamily: "'Bronkoh-Heavy', sans-serif", fontSize: vs(24), color: "#078207", lineHeight: "normal", fontStyle: "normal", whiteSpace: "nowrap" }}>Valor</p>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: vs(14), color: "#2f3237", lineHeight: 1.4, letterSpacing: vs(0.25) }}>
                Valor gerado para os utilizadores e o negócio
              </p>
            </div>
            <ConectionRight sc={vs} />
          </div>

        </div>{/* /inner wrapper */}
      </motion.div>
    </motion.div>
  );
}