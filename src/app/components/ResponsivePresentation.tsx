import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "../../imports/01Capa/svg-9xym7sn689";
import iconPaths from "../../imports/MainContainer/svg-xc3vwdt1gg";
import { NNgModal } from "./NNgModal";

interface ResponsivePresentationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (slide: number) => void;
}

const slideMeta = [
  "Capa",
  "Diagnóstico",
  "Processo atual",
  "Camadas",
  "Atuação",
  "Processo ideal",
];

const stats = [
  { value: "83%", label: "acredita que um profissional de UX seria útil para a sua área" },
  { value: "72%", label: "considera que UX impacta muito o sucesso dos produtos" },
  { value: "138", label: "pessoas querem saber mais sobre UX" },
  { value: "69", label: "pessoas pediram envolvimento desde o início dos projectos" },
  { value: "53%", label: "não conhecem bem o conceito de User Experience" },
  { value: "34%", label: "acham que UX é responsabilidade apenas dos designers" },
];

const currentProcess = [
  {
    number: "01",
    eyebrow: "Como entramos",
    title: "Entrada via proposta comercial",
    text: "A área é acionada para produzir telas com prazo apertado e sem embasamento prévio. Quando aprovadas, vão diretamente para desenvolvimento.",
  },
  {
    number: "02",
    eyebrow: "O que falta",
    title: "Discovery, validação e espaço de decisão",
    text: "UX ainda entra como desenho de telas. A compreensão do problema, o teste com usuários e alternativas de solução ficam de fora.",
  },
  {
    number: "03",
    eyebrow: "Consequência",
    title: "Projetos descartados",
    text: "Alguns projetos são descartados por não atenderem à necessidade real, ou por disputa externa.",
  },
];

const layers = [
  ["Superfície", "A interface visual"],
  ["Esqueleto", "Componentes, wireframes e navegação"],
  ["Estrutura", "Fluxos, arquitetura de informação e design de interação"],
  ["Escopo", "Funcionalidades, conteúdo e requisitos"],
  ["Estratégia", "Necessidades do utilizador e objetivos do produto"],
];

const fronts = [
  {
    num: "01",
    iconKey: "p22ba1e00",
    title: "Pesquisa e Discovery",
    items: ["Entrevistas", "Personas e jornadas", "Benchmarks"],
  },
  {
    num: "02",
    iconKey: "p1c0e6c00",
    title: "Interface e Interação",
    items: ["Wireframes", "Protótipos", "Especificação para DEV"],
  },
  {
    num: "03",
    iconKey: "p37c7f480",
    title: "Design de Serviço",
    items: ["Processos", "Blueprints", "Jornadas operacionais"],
  },
  {
    num: "04",
    iconKey: "p132ccd80",
    title: "Design System",
    items: ["Tokens", "Componentes", "Governança"],
  },
  {
    num: "05",
    iconKey: "p1fba0a80",
    title: "Acessibilidade",
    items: ["WCAG 2.2", "Boas práticas", "Testes diversos"],
  },
  {
    num: "06",
    iconKey: "p37567ac0",
    title: "Validação e Testes",
    items: ["Usabilidade", "Dados qualitativos", "Iteração"],
  },
];

const processSteps = [
  "Descobrir",
  "Definir",
  "Explorar",
  "Validar",
  "Entregar",
  "Acompanhar",
];

function SlideShell({ eyebrow, title, subtitle, children }: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rp-slide">
      <header className="rp-header">
        <p className="rp-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {subtitle && <p className="rp-subtitle">{subtitle}</p>}
      </header>
      {children}
    </div>
  );
}

export function ResponsivePresentation({
  currentSlide,
  totalSlides,
  onNext,
  onPrev,
  onGoTo,
}: ResponsivePresentationProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalScale =
    typeof window === "undefined"
      ? 0.72
      : Math.min(0.72, Math.max(0.4, (window.innerWidth - 32) / 960));

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <div className="rp-slide rp-cover">
            <div className="rp-cover-copy">
              <p className="rp-eyebrow">Planejamento da área</p>
              <h1>Experience Engineering</h1>
              <p>2026 · Kickoff</p>
            </div>
            <motion.svg
              className="rp-cover-mark"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 540 538.358"
              animate={{ rotate: [0, 1, 0, -1, 0], y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              <path d={svgPaths.p26e5dc80} fill="#036EF2" />
              <path d={svgPaths.p2da8a80} fill="#036EF2" />
              <path d={svgPaths.p21370b80} fill="#036EF2" />
            </motion.svg>
          </div>
        );

      case 1:
        return (
          <SlideShell
            eyebrow="Diagnóstico"
            title="Visão geral sobre UX na TIS até hoje"
            subtitle="Como a área opera e o que as pessoas pensam sobre UX."
          >
            <div className="rp-two-col">
              <section className="rp-panel">
                <p className="rp-section-label">Como a área opera até hoje</p>
                <ul className="rp-list">
                  <li>A área de UX opera de forma reactiva, sendo acionada pontualmente nos projectos.</li>
                  <li>A operação atual ainda não está formalizada por método repetível.</li>
                  <li>
                    Estágio de maturidade UX da TIS na escala NN/g:{" "}
                    <button className="rp-link" onClick={() => setModalOpen(true)}>nível entre 2 e 3</button>.
                  </li>
                </ul>
              </section>
              <section className="rp-stats">
                {stats.map((item) => (
                  <article key={`${item.value}-${item.label}`}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </article>
                ))}
              </section>
            </div>
            <p className="rp-conclusion">Há demanda. Mas o modo como ela é tratada hoje produz fricção.</p>
            <NNgModal open={modalOpen} onClose={() => setModalOpen(false)} scaleX={modalScale} scaleY={modalScale} />
          </SlideShell>
        );

      case 2:
        return (
          <SlideShell
            eyebrow="Estrutura e processo atual"
            title="Como tem decorrido o trabalho da área"
            subtitle="Da entrada nos projetos às consequências observáveis no resultado final."
          >
            <div className="rp-card-grid">
              {currentProcess.map((item) => (
                <article className="rp-process-card" key={item.number}>
                  <span>{item.eyebrow}</span>
                  <strong>{item.number}</strong>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
            <p className="rp-conclusion">A área entra tarde porque não tem uma porta de entrada formalizada.</p>
          </SlideShell>
        );

      case 3:
        return (
          <SlideShell eyebrow="Escopo de atuação" title="A experiência tem 5 camadas">
            <div className="rp-two-col rp-layer-layout">
              <section>
                <p className="rp-lead">
                  A interface é a parte visível de um trabalho que começa muito antes do desenho da tela.
                </p>
                <p className="rp-conclusion">A área de Experience Engineering deve atuar em todas elas.</p>
              </section>
              <section className="rp-layers">
                {layers.map(([name, description], index) => (
                  <article key={name} style={{ "--layer": index } as React.CSSProperties}>
                    <strong>{name}</strong>
                    <span>{description}</span>
                  </article>
                ))}
              </section>
            </div>
          </SlideShell>
        );

      case 4:
        return (
          <SlideShell
            eyebrow="Mudança de paradigma"
            title="Experience Engineering muito além do desenho de telas"
            subtitle="A área deve assegurar que as soluções atendam a problemas reais e cumpram requisitos de negócio."
          >
            <div className="rp-fronts-grid">
              {fronts.map((front) => (
                <article className="rp-front-card" key={front.num}>
                  <div>
                    <span>{front.num}</span>
                    <svg viewBox="0 0 32 32" fill="none">
                      <path d={iconPaths[front.iconKey as keyof typeof iconPaths]} fill="#036ef2" />
                    </svg>
                  </div>
                  <h2>{front.title}</h2>
                  <ul>
                    {front.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </SlideShell>
        );

      default:
        return (
          <SlideShell
            eyebrow="Como o trabalho passa a acontecer"
            title="Processo de Design apoiado por IA"
            subtitle="Etapas com profundidade ajustada ao problema, onde a IA atua como suporte para acelerar o processo."
          >
            <div className="rp-ai-strip">
              <strong>IA como camada de apoio transversal</strong>
              <span>Pesquisa · Ideação · Prototipação · Avaliação · Documentação · Automação</span>
            </div>
            <ol className="rp-timeline">
              {processSteps.map((step) => (
                <li key={step}>
                  <span />
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
            <div className="rp-tags">
              {["Incerteza", "Risco", "Impacto", "Tempo", "Evidências"].map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <p className="rp-conclusion rp-green">Processo contínuo de aprendizado e iteração.</p>
          </SlideShell>
        );
    }
  };

  return (
    <main className="rp-shell">
      <AnimatePresence mode="wait">
        <motion.section
          key={currentSlide}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="rp-content"
        >
          {renderSlide()}
        </motion.section>
      </AnimatePresence>

      <nav className="rp-nav" aria-label="Navegação da apresentação">
        <button onClick={onPrev} disabled={currentSlide === 0}>Anterior</button>
        <div>
          {slideMeta.map((label, index) => (
            <button
              key={label}
              aria-label={`Ir para ${label}`}
              aria-current={currentSlide === index ? "step" : undefined}
              onClick={() => onGoTo(index)}
            />
          ))}
        </div>
        <button onClick={onNext} disabled={currentSlide === totalSlides - 1}>Próximo</button>
      </nav>
    </main>
  );
}
