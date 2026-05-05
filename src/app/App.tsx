import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import svgPaths from "../imports/01Capa/svg-9xym7sn689";
import backSvgPaths from "../imports/Back/svg-v4jzanzdmi";
import dragSvgPaths from "../imports/Drag/svg-nfjmokf13z";
import { Slide02 } from "./components/Slide02";
import { Slide03 } from "./components/Slide03";
import { Slide04 } from "./components/Slide04";
import { Slide05 } from "./components/Slide05";
import { Slide06 } from "./components/Slide06";
import { ResponsivePresentation } from "./components/ResponsivePresentation";

const TOTAL_SLIDES = 6;
const RESPONSIVE_WIDTH = 1440;
const RESPONSIVE_HEIGHT = 900;

function getViewportMode() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < RESPONSIVE_WIDTH || window.innerHeight < RESPONSIVE_HEIGHT;
}

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const [isResponsiveMode, setIsResponsiveMode] = useState(getViewportMode);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorReady, setCursorReady] = useState(false);
  const [isLeftHalf, setIsLeftHalf] = useState(false);
  const [isTapping, setIsTapping] = useState(false);
  const [isNearInteractive, setIsNearInteractive] = useState(false);
  const [isOnInteractive, setIsOnInteractive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragAreaActive, setIsDragAreaActive] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);

  // Logo 3D tilt effect (distorção 3D)
  const logoX = useMotionValue(0);
  const logoY = useMotionValue(0);
  const logoSpringConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const logoSpringX = useSpring(logoX, logoSpringConfig);
  const logoSpringY = useSpring(logoY, logoSpringConfig);
  const logoRotateX = useTransform(logoSpringY, [-0.5, 0.5], [15, -15]);
  const logoRotateY = useTransform(logoSpringX, [-0.5, 0.5], [-15, 15]);

  const handleLogoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    logoX.set(x / rect.width - 0.5);
    logoY.set(y / rect.height - 0.5);
  };

  const handleLogoMouseLeave = () => {
    logoX.set(0);
    logoY.set(0);
  };

  // Uniform scale for fonts / decorative elements
  const s = Math.min(scaleX, scaleY);
  const vx = (n: number) => n * scaleX;
  const vy = (n: number) => n * scaleY;
  const vs = (n: number) => n * s;

  useEffect(() => {
    const update = () => {
      setScaleX(window.innerWidth / 1920);
      setScaleY(window.innerHeight / 1080);
      setIsResponsiveMode(getViewportMode());
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Custom cursor ready after cover animations finish
  useEffect(() => {
    const timer = setTimeout(() => setCursorReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const goToSlide = (n: number) => setCurrentSlide(Math.max(0, Math.min(TOTAL_SLIDES - 1, n)));
  const goNext = () => goToSlide(currentSlide + 1);
  const goPrev = () => goToSlide(currentSlide - 1);

  // ── Navegação por teclado ──────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, isModalOpen]);
  // ──────────────────────────────────────────────────────────────────────

  const PROXIMITY_BUFFER = 32; // px — custom cursor starts hiding before reaching element

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    setIsLeftHalf(e.clientX < window.innerWidth / 2);
    if (!cursorVisible) setCursorVisible(true);

    // Calculate rotation regardless of current slide, though only slide 0 shows the logo
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xRatio = (clientX / innerWidth) - 0.5; // -0.5 to 0.5
    const yRatio = (clientY / innerHeight) - 0.5; // -0.5 to 0.5
    
    // Set values within the expected [-0.5, 0.5] range for useTransform
    logoX.set(xRatio);
    logoY.set(yRatio);

    const els = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
    let near = false;
    let on = false;
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (
        e.clientX >= r.left - PROXIMITY_BUFFER &&
        e.clientX <= r.right + PROXIMITY_BUFFER &&
        e.clientY >= r.top - PROXIMITY_BUFFER &&
        e.clientY <= r.bottom + PROXIMITY_BUFFER
      ) near = true;
      if (
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top  && e.clientY <= r.bottom
      ) { on = true; near = true; }
      if (near && on) break;
    }
    setIsNearInteractive(near);
    setIsOnInteractive(on);
  };

  const handleClick = () => {
    if (isModalOpen) return;
    if (isDragAreaActive) return;

    setIsTapping(true);
    setTimeout(() => setIsTapping(false), 180);

    if (currentSlide === 0 || !isLeftHalf) {
      goNext();
    } else {
      goPrev();
    }
  };

  const isSlide0 = currentSlide === 0;
  const showBackCursor = currentSlide > 0 && isLeftHalf;

  if (isResponsiveMode) {
    return (
      <ResponsivePresentation
        currentSlide={currentSlide}
        totalSlides={TOTAL_SLIDES}
        onNext={goNext}
        onPrev={goPrev}
        onGoTo={goToSlide}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setCursorVisible(false); setIsNearInteractive(false); setIsOnInteractive(false); logoX.set(0); logoY.set(0); }}
      onMouseEnter={() => setCursorVisible(true)}
      onClick={handleClick}
      style={{ backgroundColor: isSlide0 ? "#04165d" : "#ffffff" }}
      className={`w-screen h-screen overflow-hidden relative select-none transition-colors duration-500 ${isModalOpen ? "cursor-auto" : (isNearInteractive ? "" : "cursor-none")}`}
    >
      <AnimatePresence mode="wait">
        {/* ─────────────── SLIDE 1 — Cover ─────────────── */}
        {currentSlide === 0 && (
          <motion.div
            key="slide-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                left: vx(120),
                top: `calc(35% - ${vy(151)}px)`,
                transform: "translateY(-50%)",
              }}
              className="absolute flex flex-col items-start"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ fontSize: vs(24), letterSpacing: vs(1) }}
                className="font-['Bronkoh-Regular',sans-serif] not-italic text-[#036ef2] uppercase whitespace-nowrap"
              >
                Planejamento da área
              </motion.p>

              <div style={{ height: vy(40) }} />

              <div
                style={{ fontSize: vs(168), letterSpacing: vs(-5) }}
                className="font-['Bronkoh-Heavy',sans-serif] not-italic text-white whitespace-nowrap"
              >
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  style={{ lineHeight: 0.92 }}
                >
                  Experience
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  style={{ lineHeight: 0.92 }}
                >
                  Engineering
                </motion.p>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              style={{ left: vx(120), bottom: vy(96), gap: vx(20) }}
              className="absolute flex items-center"
            >
              <p
                style={{ fontSize: vs(14), letterSpacing: vs(1.5) }}
                className="font-['Bronkoh-SemiBold',sans-serif] not-italic text-[#036ef2] uppercase whitespace-nowrap"
              >
                2026
              </p>
              <div style={{ width: vx(24), height: vy(2) }} className="overflow-clip relative shrink-0">
                <div className="absolute bg-[rgba(43,118,193,0.4)] h-px left-0 right-0 top-0" />
              </div>
              <p
                style={{ fontSize: vs(14), letterSpacing: vs(1.5) }}
                className="font-['Bronkoh-SemiBold',sans-serif] not-italic text-white uppercase whitespace-nowrap"
              >
                Kickoff
              </p>
            </motion.div>

            {/* Decorative SVG */}
            <motion.div
              style={{
                bottom: vy(80),
                right: vx(80),
                width: vs(540),
                height: vs(538),
                perspective: 1200,
              }}
              className="absolute pointer-events-none"
            >
              <motion.svg
                style={{
                  rotateX: logoRotateX,
                  rotateY: logoRotateY,
                  transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, x: vs(-80) }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                className="absolute block inset-0 size-full"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 540 538.358"
              >
                <g>
                  <path d={svgPaths.p26e5dc80} fill="#036EF2" />
                  <path d={svgPaths.p2da8a80} fill="#036EF2" />
                  <path d={svgPaths.p21370b80} fill="#036EF2" />
                </g>
              </motion.svg>
            </motion.div>
          </motion.div>
        )}

        {/* ─────────────── SLIDE 2 ─────────────── */}
        {currentSlide === 1 && (
          <Slide02
            key="slide-2"
            scaleX={scaleX}
            scaleY={scaleY}
            onPrev={goPrev}
            onNext={goNext}
            onModalChange={setIsModalOpen}
          />
        )}

        {/* ─────────────── SLIDE 3 ─────────────── */}
        {currentSlide === 2 && (
          <Slide03
            key="slide-3"
            scaleX={scaleX}
            scaleY={scaleY}
            onPrev={goPrev}
            onNext={goNext}
            onDragAreaHover={setIsDragAreaActive}
          />
        )}

        {/* ─────────────── SLIDE 4 ─────────────── */}
        {currentSlide === 3 && (
          <Slide04
            key="slide-4"
            scaleX={scaleX}
            scaleY={scaleY}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}

        {/* ─────────────── SLIDE 5 ─────────────── */}
        {currentSlide === 4 && (
          <Slide05
            key="slide-5"
            scaleX={scaleX}
            scaleY={scaleY}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}

        {/* ─────────────── SLIDE 6 ─────────────── */}
        {currentSlide === 5 && (
          <Slide06
            key="slide-6"
            scaleX={scaleX}
            scaleY={scaleY}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>

      {/* ── Custom cursor ── */}
      <motion.div
        style={{
          position: "fixed",
          left: cursorXSpring,
          top: cursorYSpring,
          x: "-50%",
          y: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
        }}
        animate={{
          opacity: !isModalOpen && cursorReady && cursorVisible && !isNearInteractive ? 1 : 0,
          scale: isNearInteractive ? 0 : (isTapping ? 0.82 : (cursorReady && cursorVisible ? 1 : 0.4)),
          width: isDragAreaActive ? vs(80) : (showBackCursor ? vs(56) : vs(80)),
          height: isDragAreaActive ? vs(40) : (showBackCursor ? vs(56) : vs(80)),
        }}
        transition={{
          opacity: { duration: isNearInteractive ? 0.18 : 0.3, ease: "easeInOut" },
          scale: {
            duration: isNearInteractive ? 0.22 : (isTapping ? 0.12 : 0.3),
            ease: isNearInteractive ? "easeIn" : (isTapping ? "easeOut" : undefined),
            type: (!isNearInteractive && !isTapping) ? "spring" : "tween",
            stiffness: 300,
          },
          width: { duration: 0.25, ease: "easeInOut" },
          height: { duration: 0.25, ease: "easeInOut" },
        }}
        className="flex items-center justify-center bg-[#036ef2] rounded-full"
      >
        <AnimatePresence mode="wait">
          {isDragAreaActive ? (
            <motion.div
              key="drag"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex items-center justify-center"
              style={{ gap: vs(2) }}
            >
              <svg width={vs(18)} height={vs(18)} viewBox="0 0 24 24" fill="none">
                <mask id="cursor-drag-back" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" style={{ maskType: "alpha" }}>
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#cursor-drag-back)">
                  <path d={dragSvgPaths.p90d8b80} fill="white" />
                </g>
              </svg>
              <svg width={vs(18)} height={vs(18)} viewBox="0 0 24 24" fill="none">
                <mask id="cursor-drag-fwd" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" style={{ maskType: "alpha" }}>
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#cursor-drag-fwd)">
                  <path d={dragSvgPaths.p23cbb200} fill="white" />
                </g>
              </svg>
            </motion.div>
          ) : showBackCursor ? (
            <motion.div
              key="back"
              initial={{ opacity: 0, rotate: 45, scale: 0.4 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -45, scale: 0.4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <svg width={vs(32)} height={vs(32)} viewBox="0 0 32 32" fill="none">
                <mask id="cursor-back-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32" style={{ maskType: "alpha" }}>
                  <rect width="32" height="32" fill="#D9D9D9" />
                </mask>
                <g mask="url(#cursor-back-mask)">
                  <path d={backSvgPaths.p1cb876f0} fill="white" />
                </g>
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="forward"
              initial={{ opacity: 0, rotate: -45, scale: 0.4 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex items-center justify-center"
            >
              <svg width={vs(48)} height={vs(48)} viewBox="0 0 48 48" fill="none">
                <mask id="cursor-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48" style={{ maskType: "alpha" }}>
                  <rect width="48" height="48" fill="#D9D9D9" />
                </mask>
                <g mask="url(#cursor-mask)">
                  <path d={svgPaths.pa0c5900} fill="white" />
                </g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
