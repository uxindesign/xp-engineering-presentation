import svgPaths from "./svg-nfjmokf13z";

function ArrowBackIosNew() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_back_ios_new">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_back_ios_new">
          <mask height="24" id="mask0_2026_538" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_2026_538)">
            <path d={svgPaths.p90d8b80} fill="var(--fill-0, white)" id="arrow_back_ios_new_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ArrowForwardIos() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_forward_ios">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_forward_ios">
          <mask height="24" id="mask0_2026_534" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_2026_534)">
            <path d={svgPaths.p23cbb200} fill="var(--fill-0, white)" id="arrow_forward_ios_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function Drag() {
  return (
    <div className="bg-[#036ef2] content-stretch flex gap-[8px] items-center justify-center p-[8px] relative rounded-[999px] size-full" data-name="Drag">
      <ArrowBackIosNew />
      <ArrowForwardIos />
    </div>
  );
}