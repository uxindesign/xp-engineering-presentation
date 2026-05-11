import { useRef, useState, type MouseEvent, type ReactNode, type WheelEvent } from "react";
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

function stopEvent(event: MouseEvent<HTMLButtonElement>) {
  event.stopPropagation();
}

function NavDot({ active, hovered }: { active: boolean; hovered: boolean }) {
  const highlighted = active || hovered;

  return (
    <motion.svg width={24} height={24} viewBox="0 0 24 24" fill="none" style={{ display: "block", overflow: "visible", flexShrink: 0 }}>
      <motion.circle
        cx="12"
        cy="12"
        animate={{
          r: highlighted ? 10 : 8,
          fill: highlighted ? BLUE : STROKE_BLUE,
        }}
        initial={false}
        transition={{ duration: 0.24, ease: EASE }}
      />
    </motion.svg>
  );
}

function NavDotButton({
  active,
  onClick,
  ariaLabel,
}: {
  active: boolean;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-current={active ? "true" : undefined}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onBlur={() => setHovered(false)}
      style={{
        width: 24,
        height: 24,
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
      <NavDot active={active} hovered={hovered} />
    </button>
  );
}

function VerticalNavArrow({ direction }: { direction: "up" | "down" }) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" style={{ display: "block", flexShrink: 0 }}>
      <path
        d={direction === "up" ? NAV_ARROW_UP_PATH : NAV_ARROW_DOWN_PATH}
        fill="currentColor"
        style={{ transition: "fill 150ms ease" }}
      />
    </svg>
  );
}

function NavArrowButton({
  onClick,
  ariaLabel,
  children,
  size,
}: {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
  children: ReactNode;
  size: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onBlur={() => setHovered(false)}
      style={{
        width: size,
        height: size,
        border: 0,
        padding: 0,
        borderRadius: "50%",
        background: hovered ? BLUE : "transparent",
        color: hovered ? "#fff" : BLUE,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        outline: "none",
        transition: "background-color 150ms ease, color 150ms ease",
      }}
    >
      {children}
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
  const canGoUp = page > 0;
  const canGoDown = page < pageCount - 1;
  const handleContainerClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientY - rect.top) / rect.height;
    if (ratio < 0.37 && canGoUp) setPage(page - 1);
    if (ratio > 0.63 && canGoDown) setPage(page + 1);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: vx(1810),
        top: vy(420),
        width: 88,
        height: 240,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        zIndex: 20,
      }}
      onClick={handleContainerClick}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div
        style={{
          marginLeft: vx(22),
          width: 40,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        <NavArrowButton
          ariaLabel="Página anterior do slide 8"
          onClick={(event) => {
            stopEvent(event);
            if (canGoUp) setPage(page - 1);
          }}
          size={40}
        >
          <VerticalNavArrow direction="up" />
        </NavArrowButton>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          {Array.from({ length: pageCount }).map((_, index) => (
            <NavDotButton
              key={index}
              active={index === page}
              onClick={(event) => {
                stopEvent(event);
                setPage(index);
              }}
              ariaLabel={`Ir para página ${index + 1} do slide 8`}
            />
          ))}
        </div>
        <NavArrowButton
          ariaLabel="Próxima página do slide 8"
          onClick={(event) => {
            stopEvent(event);
            if (canGoDown) setPage(page + 1);
          }}
          size={40}
        >
          <VerticalNavArrow direction="down" />
        </NavArrowButton>
      </div>
    </div>
  );
}

function RoiCard({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;
  const rowHeights = [92, 78, 78, 72];

  return (
    <motion.div
      initial={{ opacity: 0, x: vx(32) }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.52, delay: 0.16, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: vx(1148),
        top: vy(220),
        width: vx(620),
        height: vy(547),
        boxSizing: "border-box",
        borderRadius: vs(40),
        background: PALE_BLUE,
        padding: `${vy(48)}px ${vx(56)}px`,
        display: "flex",
        flexDirection: "column",
        gap: vy(40),
      }}
    >
      <p
        style={{
          width: vx(508),
          margin: 0,
          fontFamily: "'Bronkoh-SemiBold', sans-serif",
          fontSize: vs(16),
          letterSpacing: vs(2),
          lineHeight: "normal",
          color: BLUE,
          textTransform: "uppercase",
        }}
      >
        Redução de Custos e ROI (Design system + IA)
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: vy(24), width: vx(491) }}>
        {metricsRows.map((row, index) => (
          <div
            key={row.title}
            style={{
              display: "flex",
              alignItems: "center",
              gap: vx(24),
              width: "100%",
              height: vy(rowHeights[index]),
            }}
          >
            <p
              style={{
                margin: 0,
                width: vx(120),
                flexShrink: 0,
                fontFamily: "'Bronkoh-Heavy', sans-serif",
                fontSize: 0,
                lineHeight: 0,
                letterSpacing: index === 3 ? vs(-2) : vs(-1),
                color: BLUE,
              }}
            >
              {index === 0 ? (
                <>
                  <span style={{ display: "block", fontFamily: "'Bronkoh-Regular', sans-serif", fontSize: vs(30), lineHeight: 0.9 }}>Até</span>
                  <span style={{ fontSize: vs(64), lineHeight: 0.9 }}>70</span>
                  <span style={{ fontSize: vs(48), lineHeight: 0.9 }}>%</span>
                </>
              ) : index === 3 ? (
                <>
                  <span style={{ fontSize: vs(56), lineHeight: "normal" }}>800</span>
                  <span style={{ fontSize: vs(32), lineHeight: "normal" }}>%</span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: vs(64), lineHeight: "normal" }}>{index === 1 ? "65" : "85"}</span>
                  <span style={{ fontSize: vs(48), lineHeight: "normal" }}>%</span>
                </>
              )}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: vy(4), width: vx(347), minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "'Bronkoh-Bold', sans-serif",
                  fontSize: vs(20),
                  lineHeight: 1.2,
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
                  fontSize: vs(16),
                  lineHeight: 1.4,
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
        top: vy(384),
        width: vx(760),
        display: "flex",
        flexDirection: "column",
        gap: vy(28),
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "'Bronkoh-Heavy', sans-serif",
          fontSize: vs(26),
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
          gap: vy(28),
        }}
      >
        {benefits.map((benefit) => (
          <li key={benefit.title} style={{ display: "grid", gridTemplateColumns: `${vs(10)}px 1fr`, columnGap: vx(16), alignItems: "baseline" }}>
            <span style={{ width: vs(10), height: vs(10), background: BLUE, display: "block", transform: `translateY(${vs(-1)}px)` }} />
            <p
              style={{
                margin: 0,
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: vs(20),
                lineHeight: 1.5,
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
          left: vx(130),
          top: vy(813),
          width: vx(829),
          margin: 0,
          fontFamily: "'Bronkoh-Heavy', sans-serif",
          fontSize: vs(26),
          lineHeight: 1.3,
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
