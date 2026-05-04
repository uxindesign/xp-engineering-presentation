import svgPaths from "./svg-9pv4xc9y9j";

function ArrowForward() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="arrow_forward">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="arrow_forward">
          <mask height="48" id="mask0_1_36" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="48" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="48" id="Bounding box" width="48" />
          </mask>
          <g mask="url(#mask0_1_36)">
            <path d={svgPaths.pa0c5900} fill="var(--fill-0, white)" id="arrow_forward_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Start() {
  return (
    <div className="bg-[#036ef2] content-stretch flex gap-[12px] items-center justify-center pl-[40px] pr-[24px] py-[16px] relative rounded-[999px] size-full" data-name="Start">
      <p className="font-['Bronkoh-Heavy:Regular',sans-serif] leading-[32px] not-italic relative shrink-0 text-[32px] text-white tracking-[-0.25px] whitespace-nowrap">Começar</p>
      <ArrowForward />
    </div>
  );
}