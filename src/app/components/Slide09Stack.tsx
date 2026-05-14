import { useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import svgPaths from "../../imports/06EstruturaEProcessoIdeal/svg-qr6s1d1r3a";
import { imgGroup } from "../../imports/06EstruturaEProcessoIdeal/svg-cceda";
import accessibleIcon from "../../assets/slide09/accessible.svg";
import accountCircleIcon from "../../assets/slide09/account-circle.svg";
import assignmentIcon from "../../assets/slide09/assignment.svg";
import barChartIcon from "../../assets/slide09/bar-chart-4-bars.svg";
import bidLandscapeIcon from "../../assets/slide09/bid-landscape.svg";
import cardsStackIcon from "../../assets/slide09/cards-stack.svg";
import categorySearchIcon from "../../assets/slide09/category-search.svg";
import checkbookIcon from "../../assets/slide09/checkbook.svg";
import checklistIcon from "../../assets/slide09/checklist.svg";
import clinicalNotesIcon from "../../assets/slide09/clinical-notes.svg";
import codeXmlIcon from "../../assets/slide09/code-xml.svg";
import cognitionIcon from "../../assets/slide09/cognition.svg";
import compareIcon from "../../assets/slide09/compare.svg";
import diamondShineIcon from "../../assets/slide09/diamond-shine.svg";
import docsIcon from "../../assets/slide09/docs.svg";
import exploreIcon from "../../assets/slide09/explore.svg";
import feedbackIcon from "../../assets/slide09/feedback.svg";
import gestureSelectIcon from "../../assets/slide09/gesture-select.svg";
import gridViewIcon from "../../assets/slide09/grid-view.svg";
import handshakeIcon from "../../assets/slide09/handshake.svg";
import helpIcon from "../../assets/slide09/help.svg";
import lineStyleIcon from "../../assets/slide09/line-style.svg";
import listAltCheckIcon from "../../assets/slide09/list-alt-check.svg";
import mapIcon from "../../assets/slide09/map.svg";
import mobileHandIcon from "../../assets/slide09/mobile-hand.svg";
import multimodalHandEyeIcon from "../../assets/slide09/multimodal-hand-eye.svg";
import packageIcon from "../../assets/slide09/package-2.svg";
import recordVoiceOverIcon from "../../assets/slide09/record-voice-over.svg";
import searchInsightsIcon from "../../assets/slide09/search-insights.svg";
import statIcon from "../../assets/slide09/stat-0.svg";
import stickyNoteIcon from "../../assets/slide09/sticky-note-2.svg";
import syncSavedLocallyIcon from "../../assets/slide09/sync-saved-locally.svg";
import tableIcon from "../../assets/slide09/table.svg";
import thumbsUpDownIcon from "../../assets/slide09/thumbs-up-down.svg";
import viewKanbanIcon from "../../assets/slide09/view-kanban.svg";
import viewQuiltIcon from "../../assets/slide09/view-quilt.svg";
import workspacesIcon from "../../assets/slide09/workspaces.svg";

interface Props {
  scaleX: number;
  scaleY: number;
}

type TooltipData = {
  title: string;
  body: string;
  tools: string[];
  ai: string;
};

type StackItem = {
  label: string;
  icon: string;
  tooltip?: TooltipData;
  compact?: boolean;
};

type StackColumn = {
  stage: string;
  icon: string;
  items: StackItem[];
  width?: number;
};

const BLUE = "#036ef2";
const NAVY = "#04165d";
const INK = "#2f3237";
const MUTED = "#6e7587";
const TAG_BG = "rgba(3,110,242,0.1)";
const AI_PURPLE = "#3126b4";
const FOOTER_TEXT = "PLANO DE IMPLANTAÇÃO  -  EXPERIENCE ENGINEERING";
const ease = "easeOut" as const;
const fade = (delay: number) => ({ duration: 0.55, delay, ease });

const tooltipByLabel: Record<string, TooltipData> = {
  Mapeamento: {
    title: "Mapeamento",
    body: "Organizar informações, stakeholders, problemas, oportunidades e hipóteses.",
    tools: ["FigJam", "Miro", "Notion", "Office", "Microsoft Whiteboard"],
    ai: "Ajuda para estruturar e organizar informação, CSD, formular hipótese e identificar oportunidades.",
  },
  Benchmarks: {
    title: "Benchmarks",
    body: "Analisar concorrentes, referências de mercado, padrões de UX e oportunidades.",
    tools: ["Semrush", "G2", "Mobbin", "FigJam", "Google search"],
    ai: "Acelera síntese comparativa, matriz de concorrentes e identificação de padrões.",
  },
  Analytics: {
    title: "Analytics",
    body: "Entender comportamento atual, funis, abandono, retenção e pontos de fricção.",
    tools: ["Google Analytics", "Hotjar", "Amplitude", "Power BI", "Dados de suporte"],
    ai: "Interpretação de dados, levantamento de hipóteses e geração de perguntas para investigação.",
  },
  Inquéritos: {
    title: "Inquéritos",
    body: "Coletar opiniões, percepções, satisfação, necessidades e dados quantitativos.",
    tools: ["Typeform", "Maze", "Google Forms", "Microsoft Forms", "Office"],
    ai: "Ajuda a criar questionários, limpar respostas abertas e agrupar padrões.",
  },
  Entrevistas: {
    title: "Entrevistas",
    body: "Entender contexto, motivações, dores, objeções, linguagem e comportamento.",
    tools: ["Dovetail", "Lookback", "UserTesting", "Google Meet", "Teams", "Office"],
    ai: "Apoio na construção de roteiro, perguntas de aprofundamento, transcrição e síntese.",
  },
};

const columns: StackColumn[] = [
  {
    stage: "Descobrir",
    icon: exploreIcon,
    items: [
      { label: "Mapeamento", icon: stickyNoteIcon, tooltip: tooltipByLabel.Mapeamento },
      { label: "Benchmarks", icon: thumbsUpDownIcon, tooltip: tooltipByLabel.Benchmarks },
      { label: "Analytics", icon: barChartIcon, tooltip: tooltipByLabel.Analytics },
      { label: "Inquéritos", icon: checklistIcon, tooltip: tooltipByLabel.Inquéritos },
      { label: "Entrevistas", icon: recordVoiceOverIcon, tooltip: tooltipByLabel.Entrevistas },
    ],
  },
  {
    stage: "Definir",
    icon: assignmentIcon,
    items: [
      { label: "Análise SWOT", icon: gridViewIcon },
      { label: "Mapa de empatia", icon: mapIcon },
      { label: "User Stories", icon: clinicalNotesIcon },
      { label: "Jobs to be done", icon: checkbookIcon },
      { label: "Personas", icon: accountCircleIcon },
    ],
  },
  {
    stage: "Explorar",
    icon: categorySearchIcon,
    items: [
      { label: "Protótipos", icon: viewQuiltIcon },
      { label: "Wireframes", icon: tableIcon },
      { label: "Card Sorting", icon: cardsStackIcon },
      { label: "Workshops", icon: workspacesIcon },
      { label: "Ideação", icon: cognitionIcon },
    ],
  },
  {
    stage: "Validar",
    icon: syncSavedLocallyIcon,
    items: [
      { label: "Análise heurística", icon: listAltCheckIcon },
      { label: "Testes de acessibilidade", icon: accessibleIcon, compact: true },
      { label: "Refinamento", icon: diamondShineIcon },
      { label: "Teste A/B", icon: compareIcon },
      { label: "Testes de usabilidade", icon: mobileHandIcon, compact: true },
    ],
  },
  {
    stage: "Entregar",
    icon: packageIcon,
    items: [
      { label: "Implementação", icon: codeXmlIcon },
      { label: "Backlog", icon: viewKanbanIcon },
      { label: "Design System", icon: gestureSelectIcon },
      { label: "Handoff", icon: handshakeIcon },
      { label: "Documentação", icon: docsIcon },
    ],
  },
  {
    stage: "Acompanhar",
    icon: searchInsightsIcon,
    width: 300,
    items: [
      { label: "Suporte", icon: helpIcon },
      { label: "Coleta de feedbacks", icon: feedbackIcon },
      { label: "Observar utilizadores", icon: multimodalHandEyeIcon },
      { label: "Análise de heatmaps", icon: lineStyleIcon },
      { label: "Coleta de dados", icon: bidLandscapeIcon },
    ],
  },
];

function TisLogo({ scale }: { scale: (n: number) => number }) {
  return (
    <div style={{ width: scale(120), height: scale(56), position: "relative", opacity: 0.9, overflow: "visible", flexShrink: 0 }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: scale(120),
          height: scale(54),
          maskImage: `url('${imgGroup}')`,
          WebkitMaskImage: `url('${imgGroup}')`,
          maskSize: `${scale(236)}px ${scale(105.223)}px`,
          WebkitMaskSize: `${scale(236)}px ${scale(105.223)}px`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "0px 0px",
          WebkitMaskPosition: "0px 0px",
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

function Footer({ vs, vx, vy }: { vs: (n: number) => number; vx: (n: number) => number; vy: (n: number) => number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={fade(0.35)}
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
        <p style={{ margin: 0, fontFamily: "'Bronkoh-SemiBold', sans-serif", fontSize: vs(14), letterSpacing: vs(1.5), lineHeight: "normal", color: BLUE, textTransform: "uppercase", whiteSpace: "nowrap" }}>
          09
        </p>
        <div style={{ width: vx(24), height: vy(2), overflow: "hidden", position: "relative", flexShrink: 0 }}>
          <div style={{ position: "absolute", background: "rgba(43,118,193,0.4)", height: vs(1), left: 0, right: 0, top: 0 }} />
        </div>
        <p style={{ margin: 0, fontFamily: "'Bronkoh-SemiBold', sans-serif", fontSize: vs(14), letterSpacing: vs(1.5), lineHeight: "normal", color: MUTED, textTransform: "uppercase", whiteSpace: "nowrap" }}>
          {FOOTER_TEXT}
        </p>
      </div>
      <TisLogo scale={vs} />
    </motion.div>
  );
}

function Header({ vx, vy, vs }: { vx: (n: number) => number; vy: (n: number) => number; vs: (n: number) => number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: vy(-24) }}
      animate={{ opacity: 1, y: 0 }}
      transition={fade(0.08)}
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
        <p style={{ margin: 0, fontFamily: "'Bronkoh-SemiBold', sans-serif", fontSize: vs(16), letterSpacing: vs(2), lineHeight: "normal", color: BLUE, textTransform: "uppercase" }}>
          Ferramentas essenciais
        </p>
        <p style={{ margin: 0, fontFamily: "'Bronkoh-Heavy', sans-serif", fontSize: vs(80), letterSpacing: vs(-1.5), lineHeight: 1, color: NAVY }}>
          Stack e IA no processo
        </p>
      </div>
      <p style={{ width: vx(703), margin: 0, fontFamily: "'Bronkoh-Regular', sans-serif", fontSize: vs(28), lineHeight: 1.5, color: INK }}>
        Ferramentas e IA organizadas por etapa do ciclo de trabalho, com critérios de uso e governança.
      </p>
    </motion.div>
  );
}

function ItemTag({
  item,
  vx,
  vy,
  vs,
  onTooltipChange,
}: {
  item: StackItem;
  vx: (n: number) => number;
  vy: (n: number) => number;
  vs: (n: number) => number;
  onTooltipChange: (tooltip: TooltipData | null, position?: { x: number; y: number }) => void;
}) {
  const handleEnter = (event: MouseEvent<HTMLButtonElement>) => {
    if (item.tooltip) onTooltipChange(item.tooltip, { x: event.clientX, y: event.clientY });
  };

  const handleMove = (event: MouseEvent<HTMLButtonElement>) => {
    if (item.tooltip) onTooltipChange(item.tooltip, { x: event.clientX, y: event.clientY });
  };

  const handleLeave = () => onTooltipChange(null);

  return (
    <button
      type="button"
      aria-label={item.tooltip ? `Ver detalhes de ${item.label}` : item.label}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onFocus={(event) => {
        if (!item.tooltip) return;
        const rect = event.currentTarget.getBoundingClientRect();
        onTooltipChange(item.tooltip, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      }}
      onBlur={handleLeave}
      style={{
        border: 0,
        padding: `${vy(10)}px ${vx(20)}px ${vy(10)}px ${vx(12)}px`,
        borderRadius: vs(16),
        background: TAG_BG,
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: vx(12),
        cursor: "pointer",
        color: NAVY,
        flexShrink: 0,
        outline: "none",
      }}
    >
      <img src={item.icon} alt="" style={{ width: vs(32), height: vs(32), display: "block", flex: "0 0 auto" }} />
      <span
        style={{
          margin: 0,
          fontFamily: "'Bronkoh-Bold', sans-serif",
          fontSize: vs(22),
          lineHeight: `${vs(22)}px`,
          color: NAVY,
          whiteSpace: item.compact ? "normal" : "nowrap",
          width: item.compact ? vx(item.label === "Testes de acessibilidade" ? 142 : 118) : undefined,
          textAlign: "left",
        }}
      >
        {item.label}
      </span>
    </button>
  );
}

function StageTag({ column, vx, vy, vs }: { column: StackColumn; vx: (n: number) => number; vy: (n: number) => number; vs: (n: number) => number }) {
  return (
    <div
      style={{
        width: "100%",
        borderRadius: vs(16),
        background: BLUE,
        padding: `${vy(12)}px ${vx(24)}px ${vy(12)}px ${vx(16)}px`,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: vx(16),
      }}
    >
      <img src={column.icon} alt="" style={{ width: vs(32), height: vs(32), display: "block", flexShrink: 0 }} />
      <p style={{ margin: 0, fontFamily: "'Bronkoh-Heavy', sans-serif", fontSize: vs(28), lineHeight: `${vs(32)}px`, color: "#fff", whiteSpace: "nowrap" }}>
        {column.stage}
      </p>
    </div>
  );
}

function Tooltip({
  tooltip,
  x,
  y,
  vs,
}: {
  tooltip: TooltipData | null;
  x: number;
  y: number;
  vs: (n: number) => number;
}) {
  const width = vs(360);
  const offset = vs(18);
  const left = Math.min(window.innerWidth - width - vs(16), x + offset);
  const top = Math.min(window.innerHeight - vs(300), y + offset);

  return (
    <AnimatePresence>
      {tooltip ? (
        <motion.div
          key={tooltip.title}
          initial={{ opacity: 0, scale: 0.96, y: vs(6) }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: vs(4) }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: Math.max(vs(16), left),
            top: Math.max(vs(16), top),
            width,
            zIndex: 5000,
            pointerEvents: "none",
            borderRadius: vs(28),
            padding: vs(24),
            boxSizing: "border-box",
            background: "rgba(0,0,0,0.9)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            display: "flex",
            flexDirection: "column",
            gap: vs(8),
          }}
        >
          <p style={{ margin: 0, fontFamily: "'Bronkoh-Heavy', sans-serif", fontSize: vs(20), lineHeight: `${vs(20)}px`, color: "#fff", whiteSpace: "nowrap" }}>
            {tooltip.title}
          </p>
          <p style={{ minWidth: "100%", margin: 0, fontFamily: "'Manrope', sans-serif", fontWeight: 400, fontSize: vs(16), lineHeight: 1.4, color: "#fff" }}>
            {tooltip.body}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: vs(4), paddingTop: vs(8), paddingBottom: vs(4), width: "100%" }}>
            {tooltip.tools.map((tool) => (
              <span
                key={tool}
                style={{
                  borderRadius: vs(8),
                  background: "#113e75",
                  padding: `${vs(8)}px ${vs(12)}px`,
                  fontFamily: "'Bronkoh-Heavy', sans-serif",
                  fontSize: vs(16),
                  lineHeight: `${vs(16)}px`,
                  color: "#7bdcff",
                  whiteSpace: "nowrap",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
          <div style={{ width: "100%", boxSizing: "border-box", borderRadius: vs(8), padding: vs(16), background: BLUE }}>
            <p style={{ margin: 0, fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: vs(15), lineHeight: 1.3, color: "#fff" }}>
              <strong style={{ fontWeight: 800 }}>✦ IA:</strong> {tooltip.ai}
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export function Slide09Stack({ scaleX, scaleY }: Props) {
  const s = Math.min(scaleX, scaleY);
  const vx = (n: number) => n * scaleX;
  const vy = (n: number) => n * scaleY;
  const vs = (n: number) => n * s;
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const updateTooltip = (next: TooltipData | null, position?: { x: number; y: number }) => {
    setTooltip(next);
    if (position) setTooltipPos(position);
  };

  return (
    <motion.div
      key="slide-9"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 overflow-hidden bg-white"
    >
      <Header vx={vx} vy={vy} vs={vs} />
      <motion.div
        initial={{ opacity: 0, y: vy(28) }}
        animate={{ opacity: 1, y: 0 }}
        transition={fade(0.18)}
        style={{
          position: "absolute",
          left: vx(120),
          top: vy(399),
          width: vx(1680),
          display: "flex",
          flexDirection: "column",
          gap: vy(24),
        }}
      >
        <div style={{ width: "100%", display: "flex", gap: vx(24), alignItems: "flex-start", justifyContent: "center" }}>
          {columns.map((column) => (
            <div
              key={column.stage}
              style={{
                width: column.width ? vx(column.width) : undefined,
                flex: column.width ? "0 0 auto" : "1 0 0",
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                gap: vy(16),
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <StageTag column={column} vx={vx} vy={vy} vs={vs} />
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: vy(8), alignItems: "stretch", flexShrink: 0 }}>
                {column.items.map((item) => (
                  <ItemTag key={item.label} item={item} vx={vx} vy={vy} vs={vs} onTooltipChange={updateTooltip} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            width: "100%",
            borderRadius: vs(16),
            background: AI_PURPLE,
            padding: `${vy(12)}px ${vx(24)}px ${vy(12)}px ${vx(16)}px`,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: vx(16),
          }}
        >
          <img src={statIcon} alt="" style={{ width: vs(32), height: vs(32), display: "block", flexShrink: 0 }} />
          <p style={{ margin: 0, fontFamily: "'Bronkoh-Heavy', sans-serif", fontSize: vs(28), lineHeight: `${vs(32)}px`, color: "#fff", whiteSpace: "nowrap" }}>
            Aceleração com IA
          </p>
        </div>
      </motion.div>
      <Footer vx={vx} vy={vy} vs={vs} />
      <Tooltip tooltip={tooltip} x={tooltipPos.x} y={tooltipPos.y} vs={vs} />
    </motion.div>
  );
}
