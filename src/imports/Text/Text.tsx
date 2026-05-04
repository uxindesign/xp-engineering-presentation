export default function Text() {
  return (
    <div className="relative size-full" data-name="Text">
      <div className="absolute bg-[#036ef2] h-[42px] left-[192px] top-[54px] w-[323px]" />
      <div className="absolute bg-[#036ef2] h-[42px] left-0 top-[101px] w-[306px]" />
      <p className="absolute font-['Manrope:SemiBold',sans-serif] font-semibold leading-[0] left-[6px] text-[#04165d] text-[0px] top-0 tracking-[-0.48px] w-[516px] whitespace-pre-wrap">
        <span className="font-['Manrope:Regular',sans-serif] font-normal leading-[1.5] text-[32px]">A interface é a parte visível de um trabalho que</span>
        <span className="leading-[1.5] text-[32px]">{` `}</span>
        <span className="leading-[1.5] text-[32px]">{` `}</span>
        <span className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[1.5] text-[32px] text-white">{`começa muito antes `}</span>
        <span className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[1.5] text-[32px] text-white">do desenho da tela</span>
        <span className="font-['Manrope:ExtraBold',sans-serif] font-extrabold leading-[1.5] text-[32px] text-white">.</span>
      </p>
    </div>
  );
}