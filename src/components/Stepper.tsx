export default function Stepper({ step }:{ step:number }){
  const labels=["Search","Availability","Details","Payment","Confirm"];
  return (
    <div className="flex items-center gap-1.5 md:gap-3 text-xs mb-6 overflow-x-auto pb-1">
      {labels.map((l,i)=>{
        const n=i+1;
        const active=n===step, done=n<step;
        return (
          <div key={l} className="flex items-center gap-1.5 md:gap-3 shrink-0">
            <span className={`w-7 h-7 rounded-full grid place-items-center font-bold border text-xs shrink-0 btn-press ${active?"bg-[var(--ink)] text-white border-[var(--ink)] pop": done?"bg-emerald-500 text-white border-emerald-500":"bg-white text-[var(--stone)] border-[var(--line)]"}`} style={{transition:"transform var(--dur-micro) var(--ease-enter), background-color var(--dur-hover) ease"}}>{done?"✓":n}</span>
            <span className={`${active?"text-[var(--ink)] font-semibold": done?"text-[var(--ink)]":"text-[var(--stone)]"} hidden sm:inline text-xs tracking-wide`}>{l}</span>
            {i<4 && <span className={`w-6 md:w-10 h-px hidden sm:block transition-colors duration-300 ${done?"bg-emerald-500":"bg-[var(--line)]"}`} style={{transition:"background-color 300ms var(--ease-enter)"}}></span>}
          </div>
        );
      })}
    </div>
  );
}
