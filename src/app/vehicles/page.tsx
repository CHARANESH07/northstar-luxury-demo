import VehicleCard from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";
export const metadata={ title:"Fleet — Sedan, SUV & Tempo Travellers" };
export default function VehiclesPage(){
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs tracking-widest font-semibold text-[var(--ink)]">FLEET • 7 VEHICLES • OWN FLEET</div>
          <h1 className="text-3xl md:text-4xl font-bold mt-1" style={{fontFamily:"var(--font-display)"}}>Choose by group size</h1>
          <p className="text-sm text-[var(--stone)] mt-2 max-w-[60ch]">Per-km + driver allowance + 5% taxes. Min 250 km/day. Extra km at same per-km rate. Data from <code className="bg-[var(--paper)] border px-1.5 py-0.5 rounded text-xs">/data/vehicles.ts</code> — swap to API without component change.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs bg-white border border-[var(--line)] rounded-full p-1">
          <span className="px-3 py-1.5 rounded-full bg-[var(--ink)] text-white font-semibold">All</span>
          <span className="px-3 py-1.5 text-[var(--stone)]">Cars (3)</span>
          <span className="px-3 py-1.5 text-[var(--stone)]">Tempo Travellers (4)</span>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {vehicles.map(v=> <VehicleCard key={v.id} v={v}/>)}
      </div>

      <div className="mt-8 bg-[var(--paper)] border border-[var(--line)] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div><div className="font-bold" style={{fontFamily:"var(--font-display)"}}>Not sure which size?</div><div className="text-sm text-[var(--stone)]">12 seater is most popular for 8–12. 17/20 for weddings and corporate.</div></div>
        <a href="/contact" className="bg-white border border-[var(--line)] px-5 py-3 rounded-full text-sm font-semibold">Ask for recommendation →</a>
      </div>
    </div>
  );
}

