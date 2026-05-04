import svgPaths from "./svg-v4jzanzdmi";

function ArrowBack() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="arrow_back">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="arrow_back">
          <mask height="32" id="mask0_8_333" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="32" id="Bounding box" width="32" />
          </mask>
          <g mask="url(#mask0_8_333)">
            <path d={svgPaths.p1cb876f0} fill="var(--fill-0, white)" id="arrow_back_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Back() {
  return (
    <div className="bg-[#036ef2] content-stretch flex items-center justify-center p-[12px] relative rounded-[999px] size-full" data-name="Back">
      <ArrowBack />
    </div>
  );
}