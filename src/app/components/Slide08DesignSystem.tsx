import { useRef, useState, type WheelEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import svgPaths from "../../imports/06EstruturaEProcessoIdeal/svg-qr6s1d1r3a";
import { imgGroup } from "../../imports/06EstruturaEProcessoIdeal/svg-cceda";

interface Slide08DesignSystemProps {
  scaleX: number;
  scaleY: number;
}

type Metrics = {
  vx: (n: number) => number;
  vy: (n: number) => number;
  vs: (n: number) => number;
};

const BLUE = "#036ef2";
const NAVY = "#04165d";
const INK = "#2f3237";
const MUTED = "#6e7587";
const PALE_BLUE = "rgba(3,110,242,0.06)";
const LIGHT_BLUE = "rgba(3,110,242,0.24)";
const STROKE_BLUE = "rgba(43,118,193,0.4)";
const FOOTER_TEXT = "PLANO DE IMPLANTAÇÃO  -  EXPERIENCE ENGINEERING";
const EASE = [0.22, 1, 0.36, 1] as const;
const NAV_ARROW_UP_PATH = "M2 16L12 6L22 16L20.225 17.775L12 9.55L3.775 17.775L2 16Z";
const NAV_ARROW_DOWN_PATH = "M2 8.025L3.775 6.25L12 14.475L20.225 6.25L22 8.025L12 18.025L2 8.025Z";

const metricsRows = [
  {
    value: "Até\n70%",
    title: "Redução de custos com Front-end",
    body: "Automação da escrita de código e geração de componentes com IA.",
  },
  {
    value: "65%",
    title: "Mais velocidade nas entregas",
    body: "Redução do ciclo entre a descoberta do problema e a entrega da solução.",
  },
  {
    value: "85%",
    title: "Redução de débitos técnicos",
    body: "Eliminação de componentes duplicados e padronização automática de código legado.",
  },
  {
    value: "800%",
    title: "Retorno sobre o Investimento anual",
    body: "Impacto gerado pela escala da automação em múltiplos produtos e squads.",
  },
];

const benefits = [
  {
    title: "Escalabilidade:",
    body: "Permite criar novas telas e funcionalidades muito mais rápido.",
  },
  {
    title: "Consistência:",
    body: "Garante que o usuário tenha a mesma experiência em diferentes partes do produto ou em dispositivos variados.",
  },
  {
    title: "Eficiência de Custos:",
    body: "Reduz o retrabalho de designers e desenvolvedores ao evitar que criem o mesmo componente do zero várias vezes.",
  },
  {
    title: "Melhor Comunicação:",
    body: "Serve como uma linguagem comum entre times de design e engenharia.",
  },
];

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
          <path d={svgPaths.p1bc3fc80} fill={BLUE} />
          <path d={svgPaths.p8ed8880} fill={BLUE} />
          <path d={svgPaths.p79b1980} fill={BLUE} />
          <path d={svgPaths.p3380500} fill={NAVY} />
          <path d={svgPaths.p3777a600} fill={NAVY} />
          <path d={svgPaths.p30300b00} fill={NAVY} />
        </svg>
      </div>
    </div>
  );
}

function Header({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;

  return (
    <motion.div
      initial={{ opacity: 0, y: vy(-24) }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: vx(120),
        top: vy(96),
        width: vx(760),
        display: "flex",
        flexDirection: "column",
        gap: vy(24),
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: vy(16), width: "100%" }}>
        <p
          style={{
            margin: 0,
            fontFamily: "'Bronkoh-SemiBold', sans-serif",
            fontSize: vs(16),
            letterSpacing: vs(2),
            lineHeight: "normal",
            color: BLUE,
            textTransform: "uppercase",
          }}
        >
          Em construção
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: "'Bronkoh-Heavy', sans-serif",
            fontSize: vs(80),
            letterSpacing: vs(-1.5),
            lineHeight: 1,
            color: NAVY,
          }}
        >
          Design System TIS
        </p>
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: "'Bronkoh-Regular', sans-serif",
          fontSize: vs(28),
          lineHeight: 1.5,
          color: INK,
        }}
      >
        Design System como infraestrutura operacional para consistência, velocidade, acessibilidade e integração com engenharia.
      </p>
    </motion.div>
  );
}

function Footer({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, delay: 0.35, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: vx(120),
        top: vy(946),
        width: vx(1680),
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: vx(20), alignItems: "center", overflow: "hidden" }}>
        <p
          style={{
            margin: 0,
            fontFamily: "'Bronkoh-SemiBold', sans-serif",
            fontSize: vs(14),
            letterSpacing: vs(1.5),
            lineHeight: "normal",
            color: BLUE,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          08
        </p>
        <div style={{ width: vx(24), height: vy(2), overflow: "hidden", position: "relative", flexShrink: 0 }}>
          <div style={{ position: "absolute", background: STROKE_BLUE, height: vs(1), left: 0, right: 0, top: 0 }} />
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: "'Bronkoh-SemiBold', sans-serif",
            fontSize: vs(14),
            letterSpacing: vs(1.5),
            lineHeight: "normal",
            color: MUTED,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {FOOTER_TEXT}
        </p>
      </div>
      <TisLogo scale={vs} />
    </motion.div>
  );
}

function NavDot({ active, hovered, metrics }: { active: boolean; hovered: boolean; metrics: Metrics }) {
  const { vs } = metrics;
  const size = active || hovered ? 16 : 14;

  return (
    <motion.span
      animate={{
        width: vs(size),
        height: vs(size),
        backgroundColor: active ? BLUE : hovered ? LIGHT_BLUE : "rgba(43,118,193,0.32)",
      }}
      transition={{ duration: 0.2, ease: EASE }}
      style={{ display: "block", borderRadius: "50%" }}
    />
  );
}

function NavDotButton({
  active,
  onClick,
  metrics,
  ariaLabel,
}: {
  active: boolean;
  onClick: () => void;
  metrics: Metrics;
  ariaLabel: string;
}) {
  const [hovered, setHovered] = useState(false);
  const { vs } = metrics;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-current={active ? "true" : undefined}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onBlur={() => setHovered(false)}
      style={{
        width: vs(24),
        height: vs(24),
        borderRadius: "50%",
        border: 0,
        padding: 0,
        cursor: "pointer",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
        overflow: "visible",
      }}
    >
      <NavDot active={active} hovered={hovered} metrics={metrics} />
    </button>
  );
}

function NavArrowButton({
  path,
  onClick,
  metrics,
  ariaLabel,
}: {
  path: string;
  onClick: () => void;
  metrics: Metrics;
  ariaLabel: string;
}) {
  const [hovered, setHovered] = useState(false);
  const { vs } = metrics;

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onBlur={() => setHovered(false)}
      style={{
        width: vs(48),
        height: vs(48),
        border: 0,
        padding: 0,
        borderRadius: "50%",
        background: "transparent",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
      }}
    >
      <motion.svg
        width={vs(24)}
        height={vs(24)}
        viewBox="0 0 24 24"
        fill="none"
        animate={{ scale: hovered ? 1.18 : 1 }}
        transition={{ duration: 0.22, ease: EASE }}
      >
        <path d={path} fill={BLUE} />
      </motion.svg>
    </button>
  );
}

function VerticalNav({
  page,
  setPage,
  pageCount,
  metrics,
}: {
  page: number;
  setPage: (page: number) => void;
  pageCount: number;
  metrics: Metrics;
}) {
  const { vx, vy } = metrics;

  return (
    <motion.div
      initial={{ opacity: 0, x: vx(20) }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.22, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: vx(1648),
        top: vy(388),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: vy(18),
        zIndex: 12,
      }}
    >
      <NavArrowButton path={NAV_ARROW_UP_PATH} onClick={() => setPage(page - 1)} metrics={metrics} ariaLabel="Página anterior do slide 8" />
      <div style={{ display: "flex", flexDirection: "column", gap: vy(8), alignItems: "center" }}>
        {Array.from({ length: pageCount }).map((_, index) => (
          <NavDotButton
            key={index}
            active={index === page}
            onClick={() => setPage(index)}
            metrics={metrics}
            ariaLabel={`Ir para página ${index + 1} do slide 8`}
          />
        ))}
      </div>
      <NavArrowButton path={NAV_ARROW_DOWN_PATH} onClick={() => setPage(page + 1)} metrics={metrics} ariaLabel="Próxima página do slide 8" />
    </motion.div>
  );
}

function RoiCard({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;

  return (
    <motion.div
      initial={{ opacity: 0, x: vx(32) }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.52, delay: 0.16, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: vx(1100),
        top: vy(244),
        width: vx(440),
        minHeight: vy(388),
        borderRadius: vs(40),
        background: PALE_BLUE,
        padding: `${vy(36)}px ${vx(40)}px`,
        display: "flex",
        flexDirection: "column",
        gap: vy(28),
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "'Bronkoh-SemiBold', sans-serif",
          fontSize: vs(12),
          letterSpacing: vs(2),
          lineHeight: "normal",
          color: "#7fb3fb",
          textTransform: "uppercase",
        }}
      >
        Redução de custos e ROI (Design System + IA)
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: vy(22) }}>
        {metricsRows.map((row) => (
          <div key={row.title} style={{ display: "grid", gridTemplateColumns: `${vx(98)}px 1fr`, columnGap: vx(12), alignItems: "start" }}>
            <p
              style={{
                margin: 0,
                fontFamily: "'Bronkoh-Heavy', sans-serif",
                fontSize: vs(42),
                lineHeight: 0.9,
                color: BLUE,
                whiteSpace: "pre-line",
              }}
            >
              {row.value}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: vy(4) }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Bronkoh-Heavy', sans-serif",
                  fontSize: vs(14),
                  lineHeight: 1.25,
                  color: NAVY,
                }}
              >
                {row.title}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 400,
                  fontSize: vs(12),
                  lineHeight: 1.25,
                  color: INK,
                }}
              >
                {row.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Benefits({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;

  return (
    <motion.div
      initial={{ opacity: 0, y: vy(24) }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: vx(120),
        top: vy(428),
        width: vx(690),
        display: "flex",
        flexDirection: "column",
        gap: vy(24),
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "'Bronkoh-Heavy', sans-serif",
          fontSize: vs(22),
          lineHeight: 1.3,
          color: NAVY,
        }}
      >
        Benefícios na implantação
      </p>
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: vy(20),
        }}
      >
        {benefits.map((benefit) => (
          <li key={benefit.title} style={{ display: "grid", gridTemplateColumns: `${vs(8)}px 1fr`, columnGap: vx(14), alignItems: "baseline" }}>
            <span style={{ width: vs(8), height: vs(8), background: BLUE, display: "block", transform: `translateY(${vs(-1)}px)` }} />
            <p
              style={{
                margin: 0,
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: vs(16),
                lineHeight: 1.45,
                color: NAVY,
              }}
            >
              <span style={{ fontWeight: 800 }}>{benefit.title}</span> {benefit.body}
            </p>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function PageOne({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;

  return (
    <>
      <Header metrics={metrics} />
      <Benefits metrics={metrics} />
      <RoiCard metrics={metrics} />
      <motion.p
        initial={{ opacity: 0, y: vy(18) }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.46, delay: 0.28, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: vx(120),
          top: vy(742),
          width: vx(1110),
          margin: 0,
          fontFamily: "'Bronkoh-Heavy', sans-serif",
          fontSize: vs(22),
          lineHeight: 1.5,
          color: NAVY,
        }}
      >
        Nosso Design System já nasce preparado para o uso por agentes, fornecendo contexto e acelerando o processo.
      </motion.p>
    </>
  );
}

function PlaceholderPage() {
  return null;
}

export function Slide08DesignSystem({ scaleX, scaleY }: Slide08DesignSystemProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [page, setPageState] = useState(0);
  const [pageDirection, setPageDirection] = useState(1);
  const lastWheelRef = useRef(0);
  const pageCount = 3;
  const s = Math.min(scaleX, scaleY);
  const metrics = {
    vx: (n: number) => n * scaleX,
    vy: (n: number) => n * scaleY,
    vs: (n: number) => n * s,
  };
  const { vy } = metrics;

  const setPage = (next: number) => {
    const clamped = Math.max(0, Math.min(pageCount - 1, next));
    if (clamped === page) return;
    setPageDirection(clamped > page ? 1 : -1);
    setPageState(clamped);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (Math.abs(event.deltaY) < 20) return;

    const now = window.performance.now();
    if (now - lastWheelRef.current < 650) return;
    lastWheelRef.current = now;
    setPage(event.deltaY > 0 ? page + 1 : page - 1);
  };

  return (
    <motion.div
      key="slide-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
      className="absolute inset-0 overflow-hidden bg-white"
      onWheel={handleWheel}
    >
      <VerticalNav page={page} setPage={setPage} pageCount={pageCount} metrics={metrics} />
      <AnimatePresence mode="wait" custom={pageDirection}>
        <motion.div
          key={page}
          initial={{ opacity: 0, y: reducedMotion ? 0 : pageDirection * vy(40) }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : pageDirection * vy(-34) }}
          transition={{ duration: reducedMotion ? 0 : 0.42, ease: EASE }}
          style={{ position: "absolute", inset: 0 }}
        >
          {page === 0 ? <PageOne metrics={metrics} /> : <PlaceholderPage />}
        </motion.div>
      </AnimatePresence>
      <Footer metrics={metrics} />
    </motion.div>
  );
}
