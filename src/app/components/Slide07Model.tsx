import { useRef, useState, type MouseEvent, type ReactNode, type WheelEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import svgPaths from "../../imports/06EstruturaEProcessoIdeal/svg-qr6s1d1r3a";
import { imgGroup } from "../../imports/06EstruturaEProcessoIdeal/svg-cceda";

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
          Modelo de actuação
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
        top: vy(410),
        width: vx(80),
        height: vy(236),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: vy(14),
        zIndex: 20,
      }}
      onClick={handleContainerClick}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        aria-label="Página anterior do slide 7"
        onClick={(event) => {
          stopEvent(event);
          if (canGoUp) setPage(page - 1);
        }}
        disabled={!canGoUp}
        style={{
          border: 0,
          background: "transparent",
          padding: 0,
          width: vs(56),
          height: vs(56),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: canGoUp ? "pointer" : "default",
          opacity: canGoUp ? 1 : 0.35,
          outline: "none",
        }}
      >
        <ArrowIcon direction="up" size={vs(32)} />
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: vy(12), alignItems: "center" }}>
        {[0, 1, 2].map((dot) => (
          <button
            key={dot}
            type="button"
            aria-label={`Ir para página ${dot + 1} do slide 7`}
            onClick={(event) => {
              stopEvent(event);
              setPage(dot);
            }}
            style={{
              width: vs(12),
              height: vs(12),
              borderRadius: "50%",
              border: 0,
              padding: 0,
              cursor: "pointer",
              background: page === dot ? BLUE : "#b8d4ee",
              transform: page === dot ? `scale(${1.1})` : "scale(1)",
              transition: "transform 220ms cubic-bezier(0.22,1,0.36,1), background-color 220ms ease",
              outline: "none",
            }}
          />
        ))}
      </div>

      <button
        type="button"
        aria-label="Próxima página do slide 7"
        onClick={(event) => {
          stopEvent(event);
          if (canGoDown) setPage(page + 1);
        }}
        disabled={!canGoDown}
        style={{
          border: 0,
          background: "transparent",
          padding: 0,
          width: vs(56),
          height: vs(56),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: canGoDown ? "pointer" : "default",
          opacity: canGoDown ? 1 : 0.35,
          outline: "none",
        }}
      >
        <ArrowIcon direction="down" size={vs(32)} />
      </button>
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
  const { vx, vs } = metrics;

  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: vx(18), listStyle: "none" }}>
      <span
        style={{
          width: vs(8),
          height: vs(8),
          marginTop: vs(14),
          borderRadius: "50%",
          background: BLUE,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "'Bronkoh-Regular', sans-serif",
          fontSize: vs(28),
          lineHeight: 1.38,
          color: INK,
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
          gap: vy(22),
        }}
      >
        <Bullet metrics={metrics}>
          Criar uma porta de entrada única para pedidos, com briefing mínimo:{" "}
          <strong style={{ fontFamily: "'Bronkoh-SemiBold', sans-serif", fontWeight: 600 }}>
            Objectivos de negócio, público, contexto de uso, restrições, prazo, stakeholders e critérios de sucesso.
          </strong>
        </Bullet>
        <Bullet metrics={metrics}>Classificar pedidos por níveis de risco e incerteza.</Bullet>
        <Bullet metrics={metrics}>
          Definir tipos de demandas:{" "}
          <strong style={{ fontFamily: "'Bronkoh-SemiBold', sans-serif", fontWeight: 600 }}>
            Quick win, Melhoria, Nova funcionalidade e Novo produto
          </strong>
          , cada um com métodos, prazos, papéis e entregáveis compatíveis.
        </Bullet>
        <Bullet metrics={metrics}>
          <strong style={{ fontFamily: "'Bronkoh-SemiBold', sans-serif", fontWeight: 600 }}>Estabelecer gates mínimos:</strong> problema
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
          fontFamily: "'Bronkoh-SemiBold', sans-serif",
          fontSize: vs(28),
          lineHeight: 1.35,
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
          minHeight: vy(322),
          borderRadius: vs(40),
          background: PALE_BLUE,
          border: `${vs(1)}px solid ${STROKE_BLUE}`,
          padding: `${vy(56)}px ${vx(64)}px`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: vy(22) }}>
          <p
            style={{
              margin: 0,
              fontFamily: "'Bronkoh-Heavy', sans-serif",
              fontSize: vs(30),
              lineHeight: 1.2,
              color: NAVY,
            }}
          >
            Pesquisa e Discovery
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "'Manrope', sans-serif",
              fontSize: vs(22),
              lineHeight: 1.45,
              color: INK,
            }}
          >
            Compreender o problema antes de resolver reduz o risco de construir o produto errado.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: vy(10), marginTop: vy(40) }}>
          <p
            style={{
              margin: 0,
              fontFamily: "'Bronkoh-Heavy', sans-serif",
              fontSize: vs(76),
              lineHeight: 0.95,
              letterSpacing: vs(-1),
              color: BLUE,
            }}
          >
            135%
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "'Manrope', sans-serif",
              fontSize: vs(18),
              lineHeight: 1.45,
              color: NAVY,
              width: vx(420),
            }}
          >
            de melhoria média nas métricas após redesenho focado em usabilidade
          </p>
          <p
            style={{
              margin: `${vy(8)}px 0 0`,
              fontFamily: "'Bronkoh-SemiBold', sans-serif",
              fontSize: vs(14),
              letterSpacing: vs(1.6),
              textTransform: "uppercase",
              color: BLUE,
            }}
          >
            Nielsen Norman Group
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Pager({
  index,
  total,
  setIndex,
  metrics,
  label,
}: {
  index: number;
  total: number;
  setIndex: (next: number) => void;
  metrics: Metrics;
  label: string;
}) {
  const { vx, vy, vs } = metrics;
  const previous = () => setIndex((index - 1 + total) % total);
  const next = () => setIndex((index + 1) % total);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: vx(18) }} onClick={(event) => event.stopPropagation()}>
      <button
        type="button"
        aria-label={`${label} anterior`}
        onClick={(event) => {
          stopEvent(event);
          previous();
        }}
        style={{
          width: vs(48),
          height: vs(48),
          borderRadius: "50%",
          border: `${vs(1)}px solid ${STROKE_BLUE}`,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          outline: "none",
        }}
      >
        <ArrowIcon direction="left" size={vs(26)} />
      </button>
      <div style={{ display: "flex", gap: vx(8), alignItems: "center", height: vy(48) }}>
        {Array.from({ length: total }).map((_, dot) => (
          <span
            key={dot}
            style={{
              width: dot === index ? vs(22) : vs(8),
              height: vs(8),
              borderRadius: vs(999),
              background: dot === index ? BLUE : "#b8d4ee",
              transition: "width 240ms cubic-bezier(0.22,1,0.36,1), background-color 240ms ease",
            }}
          />
        ))}
      </div>
      <button
        type="button"
        aria-label={`Próximo ${label}`}
        onClick={(event) => {
          stopEvent(event);
          next();
        }}
        style={{
          width: vs(48),
          height: vs(48),
          borderRadius: "50%",
          border: `${vs(1)}px solid ${STROKE_BLUE}`,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          padding: 0,
          outline: "none",
        }}
      >
        <ArrowIcon direction="right" size={vs(26)} />
      </button>
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
    <div style={{ display: "flex", flexDirection: "column", gap: vy(34), width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: vy(18), minHeight: vy(292), overflow: "hidden" }}>
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
          Critérios de classificação
        </p>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: reducedMotion ? 0 : direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reducedMotion ? 0 : direction * -32 }}
            transition={{ duration: reducedMotion ? 0 : 0.32, ease: EASE }}
            style={{ display: "flex", flexDirection: "column", gap: vy(14) }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "'Bronkoh-Heavy', sans-serif",
                fontSize: vs(30),
                lineHeight: 1.25,
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
                lineHeight: 1.55,
                color: INK,
              }}
            >
              {page.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      <Pager index={index} total={classificationPages.length} setIndex={setIndex} metrics={metrics} label="critério" />
    </div>
  );
}

function ClassificationMatrix({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;

  return (
    <div
      style={{
        width: vx(760),
        minHeight: vy(646),
        borderRadius: vs(40),
        background: PALE_BLUE,
        border: `${vs(1)}px solid ${STROKE_BLUE}`,
        padding: `${vy(52)}px ${vx(48)}px`,
        display: "flex",
        flexDirection: "column",
        gap: vy(28),
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `${vx(154)}px repeat(5, 1fr)`,
          columnGap: vx(8),
          alignItems: "center",
          width: "100%",
        }}
      >
        <div />
        {phases.map((phase) => (
          <p
            key={phase}
            style={{
              margin: 0,
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: vs(14),
              lineHeight: 1.2,
              color: NAVY,
              textAlign: "center",
            }}
          >
            {phase}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: vy(20) }}>
        {matrixRows.map((row) => (
          <div
            key={row.label}
            style={{
              display: "grid",
              gridTemplateColumns: `${vx(154)}px 1fr`,
              columnGap: vx(16),
              alignItems: "center",
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: "'Bronkoh-Heavy', sans-serif",
                fontSize: vs(21),
                lineHeight: 1.2,
                color: NAVY,
              }}
            >
              {row.label}
            </p>
            <div
              style={{
                height: vy(48),
                borderRadius: vs(999),
                background: "#fff",
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                overflow: "hidden",
                border: `${vs(1)}px solid rgba(43,118,193,0.22)`,
              }}
            >
              {row.fills.map((fill, i) => (
                <div
                  key={`${row.label}-${phases[i]}`}
                  style={{
                    background: fill || "transparent",
                    borderLeft: i === 0 ? "none" : `${vs(1)}px solid rgba(43,118,193,0.12)`,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
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
            fontFamily: "'Bronkoh-Regular', sans-serif",
            fontSize: vs(28),
            lineHeight: 1.45,
            color: INK,
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
      <p
        style={{
          margin: 0,
          fontFamily: "'Manrope', sans-serif",
          fontWeight: 800,
          fontSize: vs(25),
          lineHeight: 1,
          color: BLUE,
        }}
      >
        ?
      </p>
    </div>
  );
}

function EarlyDiagram({ metrics }: { metrics: Metrics }) {
  const { vx, vy, vs } = metrics;

  return (
    <div style={{ position: "relative", height: vy(220), width: "100%", overflow: "hidden" }}>
      <FlowRow metrics={metrics} top={62}>
        <FlowLabel metrics={metrics}>Protótipos</FlowLabel>
        <FlowArrow width={50} metrics={metrics} />
        <FlowLabel metrics={metrics}>
          Testes com público alvo
          <br />
          <span style={{ fontWeight: 400 }}>(gerar aprendizado)</span>
        </FlowLabel>
        <FlowArrow width={50} metrics={metrics} />
        <QuestionMark metrics={metrics} />
        <FlowArrow width={330} metrics={metrics} />
        <FlowLabel metrics={metrics} width={158}>
          Backlog de produto e/ou produção
        </FlowLabel>
      </FlowRow>

      <svg
        width={vx(110)}
        height={vy(78)}
        viewBox="0 0 110 78"
        fill="none"
        style={{ position: "absolute", left: vx(653), top: vy(24), overflow: "visible" }}
      >
        <path d="M4 70C30 34 55 14 104 8" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
        <path d="M95 3L106 7L99 16" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg
        width={vx(110)}
        height={vy(78)}
        viewBox="0 0 110 78"
        fill="none"
        style={{ position: "absolute", left: vx(653), top: vy(117), overflow: "visible" }}
      >
        <path d="M4 8C31 43 55 63 104 70" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
        <path d="M97 62L106 71L94 74" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

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
        {[0, 1, 2, 3].map((item) => (
          <RenewIcon key={item} metrics={metrics} />
        ))}
        <svg width={vs(40)} height={vs(40)} viewBox="0 0 40 40" fill="none" style={{ flexShrink: 0 }}>
          <path d="M20 35V7" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M12 15L20 7L28 15" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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
        <FlowArrow width={50} metrics={metrics} />
        <FlowLabel metrics={metrics}>
          Testes com clientes
          <br />
          <span style={{ fontWeight: 400 }}>(Rápido de avaliação)</span>
        </FlowLabel>
        <FlowArrow width={50} metrics={metrics} />
        <FlowLabel metrics={metrics} width={102}>
          Produto em produção
        </FlowLabel>
        <div style={{ display: "flex", gap: vx(22), alignItems: "center", flexShrink: 0 }}>
          {[0, 1, 2, 3].map((item) => (
            <RenewIcon key={item} metrics={metrics} />
          ))}
        </div>
        <FlowArrow width={50} metrics={metrics} />
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
        <FlowArrow width={50} metrics={metrics} dark />
        <FlowLabel metrics={metrics}>Oportunidades de melhoria</FlowLabel>
      </FlowRow>

      <svg
        width={vx(892)}
        height={vy(101)}
        viewBox="0 0 892 101"
        fill="none"
        style={{ position: "absolute", left: vx(218), top: vy(32), overflow: "visible" }}
      >
        <path d="M890 28H650C634.5 28 624 38.5 624 54V63C624 78.5 613.5 89 598 89H25C9.5 89 1 97.5 1 100" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
        <path d="M-6 90L1 100L8 90" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <FlowRow metrics={metrics} top={116}>
        <FlowLabel metrics={metrics}>Protótipos</FlowLabel>
        <FlowArrow width={50} metrics={metrics} />
        <FlowLabel metrics={metrics}>
          Testes com clientes
          <br />
          <span style={{ fontWeight: 400 }}>(Gerar aprendizado)</span>
        </FlowLabel>
        <FlowArrow width={50} metrics={metrics} />
        <div style={{ display: "flex", gap: vx(22), alignItems: "center", flexShrink: 0 }}>
          {[0, 1, 2, 3].map((item) => (
            <RenewIcon key={item} metrics={metrics} />
          ))}
        </div>
        <FlowArrow width={50} metrics={metrics} />
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
        boxShadow: "0 18px 36px rgba(4,22,93,0.08)",
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
        boxShadow: "0 18px 36px rgba(4,22,93,0.08)",
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
          const y = [0, 52, 104][depth];
          const scale = [1, 0.967, 0.934][depth];
          const opacity = [1, 0.88, 0.72][depth];

          return (
            <motion.div
              key={card.title}
              animate={{
                y: vy(y),
                scale,
                opacity,
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
                height: vy(500),
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
          left: vx(678),
          top: vy(904),
          width: vx(320),
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pager index={maturityIndex} total={maturityCards.length} setIndex={updateIndex} metrics={metrics} label="card" />
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
