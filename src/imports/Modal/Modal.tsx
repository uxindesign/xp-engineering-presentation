import svgPaths from "./svg-plwxvk4et1";

function Tag() {
  return (
    <div className="bg-[#036ef2] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[10px] relative rounded-[999px] shrink-0" data-name="Tag">
      <p className="font-['Bronkoh-Bold:Regular',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[20px] text-white tracking-[-0.5px] whitespace-nowrap">Nível 2</p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Container">
      <Tag />
      <p className="font-['Bronkoh-Heavy:Regular',sans-serif] leading-[1.3] not-italic relative shrink-0 text-[40px] text-white tracking-[-0.5px] whitespace-nowrap">Limitado</p>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <Container />
      <p className="font-['Bronkoh-lightItalic:Italic',sans-serif] italic leading-[1.2] min-w-full relative shrink-0 text-[30px] text-white w-[min-content]">{`"Esforços de UX são esporádicos, informais e pouco valorizados. O design é considerado apenas fazer a interface."`}</p>
      <div className="font-['Manrope:Regular',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[20px] text-[rgba(255,255,255,0.6)] tracking-[0.25px] w-[min-content]">
        <p className="leading-[1.4] mb-[16px]">Uma organização na fase limitada aborda o UX de forma errática. São feitos pequenos esforços de UX, geralmente por uma das três razões:</p>
        <ol className="list-decimal" start="1">
          <li className="mb-[4px] ms-[30px]">
            <span className="leading-[1.4]">Necessidade legal</span>
          </li>
          <li className="mb-[4px] ms-[30px]">
            <span className="leading-[1.4]">Um indivíduo consciente de UX (talvez líder) que toma a iniciativa</span>
          </li>
          <li className="ms-[30px]">
            <span className="leading-[1.4]">Uma equipa experimental que tenta métodos de UX</span>
          </li>
        </ol>
      </div>
    </div>
  );
}

function CloseSmall() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="close_small">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="close_small">
          <mask height="32" id="mask0_8_515" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="32" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="32" id="Bounding box" width="32" />
          </mask>
          <g mask="url(#mask0_8_515)">
            <path d={svgPaths.peeed100} fill="var(--fill-0, white)" id="close_small_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Close() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex items-center right-[24px] rounded-[999px] top-[24px]" data-name="Close">
      <CloseSmall />
    </div>
  );
}

function ArrowBackIosNew() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_back_ios_new">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_back_ios_new">
          <mask height="24" id="mask0_8_511" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_8_511)">
            <path d={svgPaths.pc8e8d80} fill="var(--fill-0, white)" id="arrow_back_ios_new_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ArrowLeft() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center relative rounded-[999px] shrink-0 size-[40px]" data-name="Arrow Left">
      <ArrowBackIosNew />
    </div>
  );
}

function PaginationDot() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Pagination Dot">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Pagination Dot">
          <circle cx="12" cy="12" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse 1" r="8" />
        </g>
      </svg>
    </div>
  );
}

function CurrentPaginationDot() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Current Pagination Dot">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Current Pagination Dot">
          <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 1" r="10" />
        </g>
      </svg>
    </div>
  );
}

function PaginationDot1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Pagination Dot">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Pagination Dot">
          <circle cx="12" cy="12" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse 1" r="8" />
        </g>
      </svg>
    </div>
  );
}

function PaginationDot2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Pagination Dot">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Pagination Dot">
          <circle cx="12" cy="12" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse 1" r="8" />
        </g>
      </svg>
    </div>
  );
}

function PaginationDot3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Pagination Dot">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Pagination Dot">
          <circle cx="12" cy="12" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse 1" r="8" />
        </g>
      </svg>
    </div>
  );
}

function PaginationDot4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Pagination Dot">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Pagination Dot">
          <circle cx="12" cy="12" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse 1" r="8" />
        </g>
      </svg>
    </div>
  );
}

function PaginationContainer() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Pagination Container">
      <PaginationDot />
      <CurrentPaginationDot />
      <PaginationDot1 />
      <PaginationDot2 />
      <PaginationDot3 />
      <PaginationDot4 />
    </div>
  );
}

function ArrowForwardIos() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="arrow_forward_ios">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="arrow_forward_ios">
          <mask height="24" id="mask0_8_501" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="24" x="0" y="0">
            <rect fill="var(--fill-0, #D9D9D9)" height="24" id="Bounding box" width="24" />
          </mask>
          <g mask="url(#mask0_8_501)">
            <path d={svgPaths.p11a80500} fill="var(--fill-0, white)" id="arrow_forward_ios_2" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center relative rounded-[999px] shrink-0 size-[40px]" data-name="Arrow Right">
      <ArrowForwardIos />
    </div>
  );
}

function NavigationContainer() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[8px] relative shrink-0 w-full" data-name="Navigation Container">
      <ArrowLeft />
      <PaginationContainer />
      <ArrowRight />
    </div>
  );
}

export default function Modal() {
  return (
    <div className="bg-[#3126b4] content-stretch flex flex-col gap-[48px] items-start p-[64px] relative rounded-[40px] size-full" data-name="Modal">
      <Content />
      <Close />
      <NavigationContainer />
    </div>
  );
}