import { useRef, useState, type CSSProperties, type MouseEvent, type ReactNode, type WheelEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import svgPaths from "../../imports/06EstruturaEProcessoIdeal/svg-qr6s1d1r3a";
import { imgGroup } from "../../imports/06EstruturaEProcessoIdeal/svg-cceda";
import coreArrow from "../../assets/slide07/core-arrow.svg";
import coreConnector from "../../assets/slide07/core-connector.svg";
import coreRenew from "../../assets/slide07/core-renew.svg";
import earlyArrowDiagonalDown from "../../assets/slide07/early-arrow-diagonal-down.svg";
import earlyArrowDiagonalUp from "../../assets/slide07/early-arrow-diagonal-up.svg";
import earlyArrowLong from "../../assets/slide07/early-arrow-long.svg";
import earlyArrowSmall from "../../assets/slide07/early-arrow-small.svg";
import earlyArrowUp from "../../assets/slide07/early-arrow-up.svg";
import earlyQuestionMark from "../../assets/slide07/early-question-mark.svg";
import earlyRenewA from "../../assets/slide07/early-renew-a.svg";
import earlyRenewB from "../../assets/slide07/early-renew-b.svg";
import growthArrow from "../../assets/slide07/growth-arrow.svg";
import growthRenew from "../../assets/slide07/growth-renew.svg";
import navArrowDown from "../../assets/slide07/nav-arrow-down.svg";
import navArrowUp from "../../assets/slide07/nav-arrow-up.svg";
import navDot from "../../assets/slide07/nav-dot.svg";
import navDotCurrent from "../../assets/slide07/nav-dot-current.svg";

interface Slide07ModelProps {
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
const EASE = [0.22, 1, 0.36, 1] as const;
const FOOTER_TEXT = "PLANO DE IMPLANTAÇÃO  -  EXPERIENCE ENGINEERING";
const AUTORENEW_PATH =
  "M35.3 12.65C32.4 9.75 28.4 8 24 8C15.15 8 8 15.15 8 24C8 32.85 15.15 40 24 40C31.45 40 37.7 34.9 39.45 28H35.25C33.6 32.65 29.15 36 24 36C17.35 36 12 30.65 12 24C12 17.35 17.35 12 24 12C27.3 12 30.25 13.35 32.4 15.5L26 22H40V8L35.3 12.65Z";

const classificationPages = [
  {
    title: "Quick win (Muita certeza + Baixo risco)",
    body: "Ajuste visual rápido ou alteração simples no fluxo com grande potencial de sucesso, que já seja uma necessidade comprovada e também de fácil reversão, se necessário.",
  },
  {
    title: "Melhoria (Alguma certeza + Risco médio)",
    body: "Possui um maior risco por se tratar de mudança em funcionalidade existente, sendo necessário alinhamento com os stakeholders e análise de métricas. Neste caso, a execução de desk research e benchmark podem ajudar na exploração de ideias, e também teste A/B (idealmente), em um ciclo mais curto.",
  },
  {
    title: "Nova funcionalidade (Pouca certeza + Risco alto)",
    body: "Neste caso é importante aumentar o grau de certeza, pois o risco de criar algo que pode não ser utilizado é real, então é interessante um discovery um pouco mais estruturado, com pesquisa, benchmark, entrevistas com os utilizadores, definição de fluxo, ideação, testes de usabilidade e handoff mais robusto.",
  },
  {
    title: "Novo produto (Escopo estratégico ou incerto)",
    body: "A construção de um novo produto envolve um risco altamente elevado aliado a um mar de incertezas, é importante ter a máxima preocupação em focar nos problemas certos para alcançar o MVP necessário que dará base para que se possa escalar. Para isso, Discovery e Pesquisa são obrigatórios, com o utilizador como integrante ativo e todas as áreas do time envolvidas em cada etapa.",
  },
];

const maturityCards = [
  {
    title: "1. Apostas (Early stage)",
    body: "Produtos com alta incerteza. O foco correcto é aprendizagem validada, protótipos, testes com clientes e decisão rápida: continuar, ajustar ou despriorizar.",
    variant: "early" as const,
  },
  {
    title: "2. Produtos em escala (Growth)",
    body: "Produtos já validados parcialmente, com base activa e sinais de uso. O foco passa a ser escalar, medir adopção, retenção, satisfação, qualidade e operação em produção.",
    variant: "growth" as const,
  },
  {
    title: "3. Produtos maduros (Core)",
    body: "Produtos estabelecidos. O foco é optimização contínua, retenção, eficiência, suporte, evolução incremental e decisões de refresh, consolidação ou eventual descontinuação.",
    variant: "core" as const,
  },
];

const matrixRows = [
  { label: "Quick win", fills: ["", "", "rgba(3,110,242,0.12)", BLUE, BLUE] },
  { label: "Melhoria", fills: ["", "rgba(3,110,242,0.12)", "rgba(3,110,242,0.48)", BLUE, BLUE] },
  { label: "Nova funcionalidade", fills: ["rgba(3,110,242,0.12)", "rgba(3,110,242,0.48)", BLUE, BLUE, BLUE] },
  { label: "Novo produto", fills: [BLUE, BLUE, BLUE, BLUE, BLUE] },
];

const phases = ["Discovery", "Pesquisa", "Ideação", "Design", "Monitoramento"];

function stopEvent(event: MouseEvent<HTMLButtonElement>) {
  event.stopPropagation();
}

function ArrowIcon({ direction = "right", size }: { direction?: "left" | "right" | "up" | "down"; size: number }) {
  const rotation = direction === "left" ? 180 : direction === "up" ? -90 : direction === "down" ? 90 : 0;

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ transform: `rotate(${rotation}deg)` }}>
      <path d="M12 7L21 16L12 25" stroke={BLUE} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FlowArrow({ width, metrics, dark = false }: { width: number; metrics: Metrics; dark?: boolean }) {
  const { vx, vs } = metrics;
  return (
    <svg width={vx(width)} height={vs(18)} viewBox={`0 0 ${width} 18`} fill="none" style={{ flexShrink: 0 }}>
      <path d={`M1 9H${width - 6}`} stroke={dark ? NAVY : BLUE} strokeWidth="2.4" strokeLinecap="round" />
      <path d={`M${width - 13} 3L${width - 5} 9L${width - 13} 15`} stroke={dark ? NAVY : BLUE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RenewIcon({ metrics, color = NAVY }: { metrics: Metrics; color?: string }) {
  const { vs } = metrics;
  return (
    <svg width={vs(40)} height={vs(40)} viewBox="0 0 48 48" fill="none" style={{ flexShrink: 0 }}>
      <path d={AUTORENEW_PATH} fill={color} />
    </svg>
  );
}

function SvgAsset({
  src,
  width,
  height,
  metrics,
  scaleMode = "stretch",
  style,
}: {
  src: string;
  width: number;
  height: number;
  metrics: Metrics;
  scaleMode?: "stretch" | "uniform";
  style?: CSSProperties;
}) {
  const { vx, vy, vs } = metrics;
  const renderedWidth = scaleMode === "uniform" ? vs(width) : vx(width);
  const renderedHeight = scaleMode === "uniform" ? vs(height) : vy(height);

  return (
    <img
      alt=""
      src={src}
      draggable={false}
      style={{
        display: "block",
        width: renderedWidth,
        height: renderedHeight,
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

function NavDot({
  active,
  metrics,
}: {
  active: boolean;
  metrics: Metrics;
}) {
  const { vs } = metrics;
  const size = vs(24);

  return (
    <span style={{ position: "relative", display: "block", width: size, height: size, overflow: "visible" }}>
      <motion.img
        alt=""
        src={navDot}
        draggable={false}
        initial={false}
        animate={{ opacity: active ? 0 : 1 }}
        transition={{ duration: 0.24, ease: EASE }}
        style={{
          position: "absolute",
          inset: 0,
          width: size,
          height: size,
          display: "block",
        }}
      />
      <motion.img
        alt=""
        src={navDotCurrent}
        draggable={false}
        initial={false}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.8 }}
        whileHover={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.28, ease: EASE }}
        style={{
          position: "absolute",
          inset: 0,
          width: size,
          height: size,
          display: "block",
        }}
      />
    </span>
  );
}

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

function Header({ page, metrics }: { page: number; metrics: Metrics }) {
  const { vx, vy, vs } = metrics;
  const subtitle =
    page === 0
      ? "Modelo operacional para modular profundidade de UX conforme risco, incerteza e impacto do projecto."
      : "Da criação pontual de telas para um modelo operacional de experiência.";

  return (
    <motion.div
      initial={{ opacity: 0, y: vy(-24) }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: vx(120),
        top: vy(96),
        width: vx(1680),
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
          Padronização do trabalho
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
          {page === 0 ? "Modelo de atuação" : "Modelo de actuação"}
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
        {subtitle}
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
          07
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

function VerticalNav({
  page,
  setPage,
  metrics,
}: {
  page: number;
  setPage: (page: number) => void;
  metrics: Metrics;
}) {
  const { vx, vy, vs } = metrics;
  const canGoUp = page > 0;
  const canGoDown = page < 2;
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
        width: vx(88),
        height: vy(240),
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
          width: vs(40),
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: vy(40),
        }}
      >
        <motion.button
          type="button"
          aria-label="Página anterior do slide 7"
          onClick={(event) => {
            stopEvent(event);
            if (canGoUp) setPage(page - 1);
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.28, ease: EASE }}
          style={{
            border: 0,
            background: "transparent",
            padding: 0,
            width: vs(40),
            height: vs(40),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            opacity: 1,
            outline: "none",
          }}
        >
          <SvgAsset src={navArrowUp} width={24} height={24} metrics={metrics} scaleMode="uniform" />
        </motion.button>

        <div style={{ display: "flex", flexDirection: "column", gap: vy(4), alignItems: "center" }}>
          {[0, 1, 2].map((dot) => (
            <motion.button
              key={dot}
              type="button"
              aria-label={`Ir para página ${dot + 1} do slide 7`}
              onClick={(event) => {
                stopEvent(event);
                setPage(dot);
              }}
              whileHover={{ scale: page === dot ? 1.04 : 1.12 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.28, ease: EASE }}
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
              <NavDot active={page === dot} metrics={metrics} />
            </motion.button>
          ))}
        </div>

        <motion.button
          type="button"
          aria-label="Próxima página do slide 7"
          onClick={(event) => {
            stopEvent(event);
            if (canGoDown) setPage(page + 1);
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ duration: 0.28, ease: EASE }}
          style={{
            border: 0,
            background: "transparent",
            padding: 0,
            width: vs(40),
            height: vs(40),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            opacity: 1,
            outline: "none",
          }}
        >
          <SvgAsset src={navArrowDown} width={24} height={24} metrics={metrics} scaleMode="uniform" />
        </motion.button>
      </div>
    </div>
  );
}

function Bullet({
  children,
  metrics,
}: {
  children: ReactNode;
  metrics: Metrics;
}) {
  const { vx, vy, vs } = metrics;

  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: vx(12), listStyle: "none", width: "100%" }}>
      <span style={{ height: vy(32), display: "flex", alignItems: "center", flexShrink: 0 }}>
        <span
          style={{
            width: vs(10),
            height: vs(10),
            background: BLUE,
            flexShrink: 0,
          }}
        />
      </span>
      <span
        style={{
          flex: "1 0 0",
          minWidth: 0,
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 400,
          fontSize: vs(20),
          lineHeight: 1.5,
          color: NAVY,
        }}
      >
        {children}
      </span>
    </li>
  );
}

function PageOne({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <ul
        style={{
          position: "absolute",
          left: vx(120),
          top: vy(357),
          width: vx(736),
          margin: 0,
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: vy(32),
        }}
      >
        <Bullet metrics={metrics}>
          <span style={{ display: "block", marginBottom: vy(8) }}>Criar uma porta de entrada única para pedidos, com briefing mínimo:</span>
          <strong style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800 }}>
            Objectivos de negócio, público, contexto de uso, restrições, prazo, stakeholders e critérios de sucesso.
          </strong>
        </Bullet>
        <Bullet metrics={metrics}>Classificar pedidos por níveis de risco e incerteza.</Bullet>
        <Bullet metrics={metrics}>
          Definir tipos de demandas:{" "}
          <strong style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800 }}>
            Quick win, Melhoria, Nova funcionalidade e Novo produto
          </strong>
          , cada um com métodos, prazos, papéis e entregáveis compatíveis.
        </Bullet>
        <Bullet metrics={metrics}>
          <strong style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800 }}>Estabelecer gates mínimos:</strong> problema
          compreendido, escopo validado, uso do Design System, critérios de acessibilidade, handoff e métrica pós-release.
        </Bullet>
      </ul>

      <p
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
        A área passa a atuar com critério de triagem e priorização. Reduzindo entrada tardia, retrabalho e decisões baseadas apenas em percepção
        visual.
      </p>

      <motion.div
        initial={{ opacity: 0, x: vx(32) }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
        style={{
          position: "absolute",
          left: vx(1072),
          top: vy(384),
          width: vx(620),
          borderRadius: vs(40),
          background: PALE_BLUE,
          padding: `${vy(48)}px ${vx(56)}px`,
          display: "flex",
          flexDirection: "column",
          gap: vy(32),
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: vy(8), justifyContent: "center", width: "100%" }}>
          <p
            style={{
              margin: 0,
              fontFamily: "'Bronkoh-Heavy', sans-serif",
              fontSize: vs(32),
              lineHeight: 1.3,
              color: NAVY,
            }}
          >
            Pesquisa e Discovery
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "'Manrope', sans-serif",
              fontSize: vs(18),
              lineHeight: 1.5,
              color: INK,
            }}
          >
            Compreender o problema antes de resolver reduz o risco de construir o produto errado.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: vy(8), width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: vx(16),
              paddingBottom: vy(32),
              borderBottom: `${vs(1)}px solid ${STROKE_BLUE}`,
              width: "100%",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "'Bronkoh-Heavy', sans-serif",
                fontSize: vs(64),
                lineHeight: `${vs(56)}px`,
                letterSpacing: vs(-1),
                color: BLUE,
                whiteSpace: "nowrap",
              }}
            >
              135<span style={{ fontSize: vs(48), lineHeight: `${vs(56)}px` }}>%</span>
            </p>
            <p
              style={{
                flex: "1 0 0",
                minWidth: 0,
                margin: 0,
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 700,
                fontSize: vs(20),
                lineHeight: 1.3,
                color: NAVY,
              }}
            >
              de melhoria média nas métricas após redesenho focado em usabilidade
            </p>
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: "'Manrope', sans-serif",
              fontSize: vs(14),
              lineHeight: 1.5,
              color: INK,
              whiteSpace: "nowrap",
            }}
          >
            Nielsen Norman Group
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function ArrowPairNav({
  previous,
  next,
  metrics,
  justify = "center",
}: {
  previous: () => void;
  next: () => void;
  metrics: Metrics;
  justify?: CSSProperties["justifyContent"];
}) {
  const { vx, vs } = metrics;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: justify,
        gap: vx(32),
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <motion.button
        type="button"
        aria-label="Anterior"
        onClick={(event) => {
          stopEvent(event);
          previous();
        }}
        whileHover={{ scale: 1.16, x: -vs(2) }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.28, ease: EASE }}
        style={{
          width: vs(40),
          height: vs(40),
          borderRadius: "50%",
          border: 0,
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          outline: "none",
        }}
      >
        <ArrowIcon direction="left" size={vs(24)} />
      </motion.button>
      <motion.button
        type="button"
        aria-label="Próximo"
        onClick={(event) => {
          stopEvent(event);
          next();
        }}
        whileHover={{ scale: 1.16, x: vs(2) }}
        whileTap={{ scale: 0.92 }}
        transition={{ duration: 0.28, ease: EASE }}
        style={{
          width: vs(40),
          height: vs(40),
          borderRadius: "50%",
          border: 0,
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          outline: "none",
        }}
      >
        <ArrowIcon direction="right" size={vs(24)} />
      </motion.button>
    </div>
  );
}

function TextPager({
  index,
  total,
  setIndex,
  metrics,
}: {
  index: number;
  total: number;
  setIndex: (next: number) => void;
  metrics: Metrics;
}) {
  const previous = () => setIndex((index - 1 + total) % total);
  const next = () => setIndex((index + 1) % total);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <ArrowPairNav previous={previous} next={next} metrics={metrics} justify="flex-end" />
    </div>
  );
}

function ClassificationText({
  index,
  setIndex,
  direction,
  metrics,
  reducedMotion,
}: {
  index: number;
  setIndex: (next: number) => void;
  direction: number;
  metrics: Metrics;
  reducedMotion: boolean;
}) {
  const { vy, vs } = metrics;
  const page = classificationPages[index];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: vy(24), width: "100%", background: "#fff" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: vy(24), minHeight: vy(260), overflow: "hidden" }}>
        <p
          style={{
            margin: 0,
            fontFamily: "'Bronkoh-SemiBold', sans-serif",
            fontSize: vs(16),
            letterSpacing: vs(2),
            textTransform: "uppercase",
            color: BLUE,
          }}
        >
          CritérioS de classificação
        </p>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: reducedMotion ? 0 : direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reducedMotion ? 0 : direction * -32 }}
            transition={{ duration: reducedMotion ? 0 : 0.32, ease: EASE }}
            style={{ display: "flex", flexDirection: "column", gap: vy(12), lineHeight: 1.5 }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "'Bronkoh-Heavy', sans-serif",
                fontSize: vs(26),
                lineHeight: 1.5,
                color: NAVY,
              }}
            >
              {page.title}
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: "'Manrope', sans-serif",
                fontSize: vs(22),
                lineHeight: 1.5,
                color: INK,
              }}
            >
              {page.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <TextPager index={index} total={classificationPages.length} setIndex={setIndex} metrics={metrics} />
    </div>
  );
}

function ClassificationMatrix({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;
  const fillGroups = (fills: string[]) => {
    const groups: Array<{ fill: string; start: number; end: number }> = [];
    let start = 0;

    while (start < fills.length) {
      const fill = fills[start];
      if (!fill) {
        start += 1;
        continue;
      }

      let end = start;
      while (end + 1 < fills.length && fills[end + 1] === fill) {
        end += 1;
      }

      groups.push({ fill, start, end });
      start = end + 1;
    }

    return groups;
  };

  return (
    <div
      style={{
        width: vx(760),
        borderRadius: vs(40),
        background: PALE_BLUE,
        padding: `${vy(48)}px ${vx(56)}px`,
        display: "flex",
        flexDirection: "column",
        gap: vy(32),
      }}
    >
      {matrixRows.map((row, rowIndex) => (
        <div key={row.label} style={{ display: "flex", flexDirection: "column", gap: vy(12), alignItems: "flex-start", width: "100%" }}>
          <p
            style={{
              margin: 0,
              width: "100%",
              fontFamily: "'Bronkoh-Heavy', sans-serif",
              fontSize: vs(24),
              lineHeight: 1.5,
              color: NAVY,
            }}
          >
            {row.label}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: vy(12), width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
              {phases.map((phase) => (
                <p
                  key={`${row.label}-${phase}`}
                  style={{
                    flex: "1 0 0",
                    minWidth: 0,
                    margin: 0,
                    fontFamily: "'Manrope', sans-serif",
                    fontWeight: 800,
                    fontSize: vs(16),
                    lineHeight: 1.4,
                    color: INK,
                    textAlign: "center",
                  }}
                >
                  {phase}
                </p>
              ))}
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: vy(48),
                background: "#fff",
                overflow: "hidden",
                borderRadius: vs(999),
              }}
            >
              {fillGroups(row.fills).map((group) => {
                const leftPadding = group.start === 0 ? 12 : 6;
                const rightPadding = group.end === phases.length - 1 ? 12 : 6;
                const segmentPercent = 100 / phases.length;

                return (
                  <div
                    key={`${row.label}-${group.fill}-${group.start}-${group.end}`}
                    style={{
                      position: "absolute",
                      left: `calc(${group.start * segmentPercent}% + ${vx(leftPadding)}px)`,
                      top: vy(12),
                      width: `calc(${(group.end - group.start + 1) * segmentPercent}% - ${vx(leftPadding + rightPadding)}px)`,
                      height: vy(24),
                      background: group.fill,
                      borderRadius: vs(999),
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PageTwo({
  metrics,
  classificationIndex,
  setClassificationIndex,
  classificationDirection,
  setClassificationDirection,
  reducedMotion,
}: {
  metrics: Metrics;
  classificationIndex: number;
  setClassificationIndex: (next: number) => void;
  classificationDirection: number;
  setClassificationDirection: (direction: number) => void;
  reducedMotion: boolean;
}) {
  const { vx, vy, vs } = metrics;

  const updateIndex = (next: number) => {
    const normalized = (next + classificationPages.length) % classificationPages.length;
    setClassificationDirection(normalized > classificationIndex || (classificationIndex === classificationPages.length - 1 && normalized === 0) ? 1 : -1);
    setClassificationIndex(normalized);
  };

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div
        style={{
          position: "absolute",
          left: vx(124),
          top: vy(357),
          width: vx(720),
          display: "flex",
          flexDirection: "column",
          gap: vy(80),
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 400,
            fontSize: vs(22),
            lineHeight: 1.5,
            color: NAVY,
          }}
        >
          O processo e os entregáveis mudam conforme a necessidade, considerando o grau de risco e incerteza envolvidos. Nem toda demanda precisa
          de Discovery completo, mas toda demanda precisa seguir um critério claro.
        </p>
        <ClassificationText
          index={classificationIndex}
          setIndex={updateIndex}
          direction={classificationDirection}
          metrics={metrics}
          reducedMotion={reducedMotion}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: vx(34) }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.48, delay: 0.12, ease: EASE }}
        style={{ position: "absolute", left: vx(1016), top: vy(160) }}
      >
        <ClassificationMatrix metrics={metrics} />
      </motion.div>
    </div>
  );
}

function FlowRow({
  children,
  metrics,
  top = 0,
  outlined = false,
}: {
  children: ReactNode;
  metrics: Metrics;
  top?: number;
  outlined?: boolean;
}) {
  const { vx, vy, vs } = metrics;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: vy(top),
        width: "100%",
        minHeight: vy(60),
        borderRadius: vs(24),
        background: outlined ? "#fff" : PALE_BLUE,
        border: outlined ? `${vs(1)}px solid ${STROKE_BLUE}` : "none",
        padding: `${vy(20)}px ${vx(40)}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: vx(32),
      }}
    >
      {children}
    </div>
  );
}

function FlowLabel({
  children,
  metrics,
  width,
  color = BLUE,
  weight = 800,
}: {
  children: ReactNode;
  metrics: Metrics;
  width?: number;
  color?: string;
  weight?: number;
}) {
  const { vx, vs } = metrics;

  return (
    <p
      style={{
        margin: 0,
        width: width ? vx(width) : undefined,
        fontFamily: "'Manrope', sans-serif",
        fontWeight: weight,
        fontSize: vs(16),
        lineHeight: 1.2,
        letterSpacing: vs(-0.5),
        color,
        textAlign: "center",
        whiteSpace: width ? "normal" : "nowrap",
      }}
    >
      {children}
    </p>
  );
}

function QuestionMark({ metrics }: { metrics: Metrics }) {
  const { vs } = metrics;
  return (
    <div
      style={{
        width: vs(40),
        height: vs(40),
        borderRadius: "50%",
        border: `${vs(2)}px solid ${BLUE}`,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <SvgAsset src={earlyQuestionMark} width={24} height={24} metrics={metrics} />
    </div>
  );
}

function EarlyDiagram({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;

  return (
    <div style={{ position: "relative", height: vy(220), width: "100%", overflow: "hidden" }}>
      <FlowRow metrics={metrics} top={62}>
        <FlowLabel metrics={metrics}>Protótipos</FlowLabel>
        <SvgAsset src={earlyArrowSmall} width={51} height={14.728} metrics={metrics} />
        <FlowLabel metrics={metrics}>
          Testes com público alvo
          <br />
          <span style={{ fontWeight: 400 }}>(gerar aprendizado)</span>
        </FlowLabel>
        <SvgAsset src={earlyArrowSmall} width={51} height={14.728} metrics={metrics} />
        <QuestionMark metrics={metrics} />
        <SvgAsset src={earlyArrowLong} width={486} height={14.728} metrics={metrics} style={{ minWidth: 0 }} />
        <FlowLabel metrics={metrics} width={158}>
          Backlog de produto e/ou produção
        </FlowLabel>
      </FlowRow>

      <div style={{ position: "absolute", left: vx(653.3), top: vy(30), width: vx(90.898), height: vy(48), display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "rotate(-27.84deg) skewX(4.42deg)" }}>
          <SvgAsset src={earlyArrowDiagonalUp} width={103.793} height={14.728} metrics={metrics} />
        </div>
      </div>
      <div style={{ position: "absolute", left: vx(652.72), top: vy(126), width: vx(90.898), height: vy(48), display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ transform: "rotate(27.84deg) skewX(-4.42deg)" }}>
          <SvgAsset src={earlyArrowDiagonalDown} width={103.793} height={14.728} metrics={metrics} />
        </div>
      </div>

      <p
        style={{
          position: "absolute",
          left: vx(764),
          top: vy(16),
          width: vx(168),
          margin: 0,
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 800,
          fontSize: vs(16),
          lineHeight: 1.1,
          letterSpacing: vs(-0.5),
          color: INK,
        }}
      >
        Despriorizar/Pivotar
      </p>
      <div
        style={{
          position: "absolute",
          left: vx(764),
          top: vy(166),
          width: vx(432),
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlowLabel metrics={metrics} width={116} color={INK}>
          Continuar aprendendo
          <br />
          <span style={{ fontWeight: 400 }}>(novos testes)</span>
        </FlowLabel>
        <SvgAsset src={earlyRenewA} width={40} height={40} metrics={metrics} />
        <SvgAsset src={earlyRenewB} width={40} height={40} metrics={metrics} />
        <SvgAsset src={earlyRenewB} width={40} height={40} metrics={metrics} />
        <SvgAsset src={earlyRenewA} width={40} height={40} metrics={metrics} />
        <div style={{ width: 0, height: vs(40), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <SvgAsset src={earlyArrowUp} width={40} height={14.728} metrics={metrics} style={{ transform: "rotate(-90deg)" }} />
        </div>
      </div>
    </div>
  );
}

function GrowthDiagram({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;

  return (
    <div style={{ position: "relative", height: vy(140), width: "100%", overflow: "hidden" }}>
      <FlowRow metrics={metrics} top={24}>
        <FlowLabel metrics={metrics}>Protótipos</FlowLabel>
        <SvgAsset src={growthArrow} width={51} height={14.728} metrics={metrics} />
        <FlowLabel metrics={metrics}>
          Testes com clientes
          <br />
          <span style={{ fontWeight: 400 }}>(Rápido de avaliação)</span>
        </FlowLabel>
        <SvgAsset src={growthArrow} width={51} height={14.728} metrics={metrics} />
        <FlowLabel metrics={metrics} width={102}>
          Produto em produção
        </FlowLabel>
        <div style={{ display: "flex", gap: vx(22), alignItems: "center", flexShrink: 0 }}>
          {[0, 1, 2, 3].map((item) => (
            <SvgAsset key={item} src={growthRenew} width={40} height={40} metrics={metrics} />
          ))}
        </div>
        <SvgAsset src={growthArrow} width={51} height={14.728} metrics={metrics} />
        <FlowLabel metrics={metrics} width={158}>
          Versão validada
        </FlowLabel>
      </FlowRow>
      <p
        style={{
          position: "absolute",
          left: vx(698),
          top: vy(116),
          margin: 0,
          fontFamily: "'Manrope', sans-serif",
          fontSize: vs(16),
          lineHeight: 1.1,
          letterSpacing: vs(-0.5),
          color: INK,
        }}
      >
        Ciclo de testes/acompanhamento
      </p>
    </div>
  );
}

function CoreDiagram({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;

  return (
    <div style={{ position: "relative", height: vy(222), width: "100%", overflow: "hidden" }}>
      <FlowRow metrics={metrics} top={0} outlined>
        <FlowLabel metrics={metrics}>Pesquisas, análise de feedbacks, pedidos de suporte e analytics</FlowLabel>
        <SvgAsset src={coreArrow} width={51} height={14.728} metrics={metrics} />
        <FlowLabel metrics={metrics}>Oportunidades de melhoria</FlowLabel>
      </FlowRow>

      <SvgAsset
        src={coreConnector}
        width={899.364}
        height={102.5}
        metrics={metrics}
        style={{ position: "absolute", left: vx(218), top: vy(32), overflow: "visible" }}
      />

      <FlowRow metrics={metrics} top={116}>
        <FlowLabel metrics={metrics}>Protótipos</FlowLabel>
        <SvgAsset src={coreArrow} width={51} height={14.728} metrics={metrics} />
        <FlowLabel metrics={metrics}>
          Testes com clientes
          <br />
          <span style={{ fontWeight: 400 }}>(Gerar aprendizado)</span>
        </FlowLabel>
        <SvgAsset src={coreArrow} width={51} height={14.728} metrics={metrics} />
        <div style={{ display: "flex", gap: vx(22), alignItems: "center", flexShrink: 0 }}>
          {[0, 1, 2, 3].map((item) => (
            <SvgAsset key={item} src={coreRenew} width={40} height={40} metrics={metrics} />
          ))}
        </div>
        <SvgAsset src={coreArrow} width={51} height={14.728} metrics={metrics} />
        <FlowLabel metrics={metrics} width={158}>
          Backlog de produto e/ou produção
        </FlowLabel>
      </FlowRow>
      <p
        style={{
          position: "absolute",
          left: vx(629),
          top: vy(204),
          margin: 0,
          fontFamily: "'Manrope', sans-serif",
          fontSize: vs(16),
          lineHeight: 1.1,
          letterSpacing: vs(-0.5),
          color: INK,
        }}
      >
        Ciclo de testes/acompanhamento
      </p>
    </div>
  );
}

function MaturityCard({
  card,
  metrics,
}: {
  card: (typeof maturityCards)[number];
  metrics: Metrics;
}) {
  const { vx, vy, vs } = metrics;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: vs(40),
        border: `${vs(1)}px solid ${MUTED}`,
        background: "#fff",
        padding: `${vy(64)}px ${vx(64)}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: vy(24), alignItems: "flex-start" }}>
        <p
          style={{
            margin: 0,
            width: "100%",
            fontFamily: "'Bronkoh-SemiBold', sans-serif",
            fontSize: vs(16),
            letterSpacing: vs(2),
            lineHeight: "normal",
            textTransform: "uppercase",
            color: BLUE,
          }}
        >
          Estratégia por maturidade do produto
        </p>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: vy(12), alignItems: "flex-start" }}>
          <p
            style={{
              margin: 0,
              width: "100%",
              fontFamily: "'Bronkoh-Heavy', sans-serif",
              fontSize: vs(26),
              lineHeight: 1.5,
              color: NAVY,
            }}
          >
            {card.title}
          </p>
          <p
            style={{
              margin: 0,
              width: "100%",
              fontFamily: "'Manrope', sans-serif",
              fontSize: vs(22),
              lineHeight: 1.5,
              color: INK,
            }}
          >
            {card.body}
          </p>
          {card.variant === "early" && <EarlyDiagram metrics={metrics} />}
          {card.variant === "growth" && <GrowthDiagram metrics={metrics} />}
          {card.variant === "core" && <CoreDiagram metrics={metrics} />}
        </div>
      </div>
    </div>
  );
}

function CardShell({ metrics }: { metrics: Metrics }) {
  const { vs } = metrics;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: vs(40),
        border: `${vs(1)}px solid ${MUTED}`,
        background: "#fff",
      }}
    />
  );
}

function PageThree({
  metrics,
  maturityIndex,
  setMaturityIndex,
  setMaturityDirection,
  reducedMotion,
}: {
  metrics: Metrics;
  maturityIndex: number;
  setMaturityIndex: (index: number) => void;
  setMaturityDirection: (direction: number) => void;
  reducedMotion: boolean;
}) {
  const { vx, vy, vs } = metrics;
  const cardHeight = (variant: (typeof maturityCards)[number]["variant"]) => (variant === "growth" ? 440 : variant === "core" ? 522 : 520);

  const updateIndex = (next: number) => {
    const normalized = (next + maturityCards.length) % maturityCards.length;
    setMaturityDirection(normalized > maturityIndex || (maturityIndex === maturityCards.length - 1 && normalized === 0) ? 1 : -1);
    setMaturityIndex(normalized);
  };

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <div
        style={{
          position: "absolute",
          left: vx(120),
          top: vy(341),
          width: vx(1440),
          height: vy(593),
          overflow: "hidden",
        }}
      >
        {maturityCards.map((card, i) => {
          const depth = (i - maturityIndex + maturityCards.length) % maturityCards.length;
          const y = [0, 103.35, 49.15][depth];
          const scale = [1, 0.9666, 0.9343][depth];

          return (
            <motion.div
              key={card.title}
              animate={{
                y: vy(y),
                scale,
                zIndex: 10 - depth,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.48,
                ease: EASE,
              }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: vx(1440),
                height: vy(cardHeight(card.variant)),
                transformOrigin: "top center",
              }}
            >
              {depth === 0 ? <MaturityCard card={card} metrics={metrics} /> : <CardShell metrics={metrics} />}
            </motion.div>
          );
        })}
      </div>
      <div
        style={{
          position: "absolute",
          left: vx(784),
          top: vy(894),
          width: vx(112),
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
        }}
      >
        <ArrowPairNav
          previous={() => updateIndex(maturityIndex - 1)}
          next={() => updateIndex(maturityIndex + 1)}
          metrics={metrics}
        />
      </div>
    </div>
  );
}

export function Slide07Model({ scaleX, scaleY }: Slide07ModelProps) {
  const reducedMotion = useReducedMotion() ?? false;
  const [page, setPageState] = useState(0);
  const [pageDirection, setPageDirection] = useState(1);
  const [classificationIndex, setClassificationIndex] = useState(0);
  const [classificationDirection, setClassificationDirection] = useState(1);
  const [maturityIndex, setMaturityIndex] = useState(0);
  const [, setMaturityDirection] = useState(1);
  const lastWheelRef = useRef(0);
  const s = Math.min(scaleX, scaleY);
  const metrics = {
    vx: (n: number) => n * scaleX,
    vy: (n: number) => n * scaleY,
    vs: (n: number) => n * s,
  };
  const { vy } = metrics;

  const setPage = (next: number) => {
    const clamped = Math.max(0, Math.min(2, next));
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
      key="slide-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.35 }}
      className="absolute inset-0 overflow-hidden bg-white"
      onWheel={handleWheel}
    >
      <Header page={page} metrics={metrics} />
      <VerticalNav page={page} setPage={setPage} metrics={metrics} />
      <AnimatePresence mode="wait" custom={pageDirection}>
        <motion.div
          key={page}
          initial={{ opacity: 0, y: reducedMotion ? 0 : pageDirection * vy(40) }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reducedMotion ? 0 : pageDirection * vy(-34) }}
          transition={{ duration: reducedMotion ? 0 : 0.42, ease: EASE }}
          style={{ position: "absolute", inset: 0 }}
        >
          {page === 0 && <PageOne metrics={metrics} />}
          {page === 1 && (
            <PageTwo
              metrics={metrics}
              classificationIndex={classificationIndex}
              setClassificationIndex={setClassificationIndex}
              classificationDirection={classificationDirection}
              setClassificationDirection={setClassificationDirection}
              reducedMotion={reducedMotion}
            />
          )}
          {page === 2 && (
            <PageThree
              metrics={metrics}
              maturityIndex={maturityIndex}
              setMaturityIndex={setMaturityIndex}
              setMaturityDirection={setMaturityDirection}
              reducedMotion={reducedMotion}
            />
          )}
        </motion.div>
      </AnimatePresence>
      <Footer metrics={metrics} />
    </motion.div>
  );
}
