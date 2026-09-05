import Link from "next/link";
import Image from "next/image";
import { Vehicle } from "@/data/vehicles";

export default function VehicleCard({ v, state, onSelect }: { v: Vehicle; state?: "available"|"held"|"booked"|"blocked"; onSelect?: ()=>void }){
  const disabled = state==="booked" || state==="blocked";
  const isTT = v.category==="Tempo Traveller";
  return (
    <div className={`bg-white border rounded-xl overflow-hidden flex flex-col card-hover ${disabled?"opacity-70":""}`} style={{borderColor:"var(--rule)"}}>
      <div className="h-[168px] relative overflow-hidden bg-[var(--paper)] border-b border-[var(--rule)]">
        <Image src={v.image} alt={v.imageAlt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover card-img" priority={false}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="bg-white/95 backdrop-blur border border-white/60 text-xs px-2.5 py-1 font-medium rounded-full shadow-sm">{v.category} • {v.seater}</span>
          <span className={`text-xs px-2.5 py-1 font-bold border rounded-full shadow-sm ${v.ac?"bg-[var(--ink)] text-white border-[var(--ink)]":"bg-white/95 border-white/60"}`}>{v.ac?"AC":"NON-AC"}</span>
        </div>
        {isTT && <div className="absolute top-0 right-0 w-1 h-full bg-[var(--brass)]"></div>}
        {state && <span className={`absolute bottom-2 right-2 text-xs px-2.5 py-1 font-bold border rounded-full shadow-sm ${state==="available"?"bg-emerald-600 text-white border-emerald-700":state==="held"?"bg-amber-500 text-white border-amber-600":state==="booked"?"bg-[var(--ink)] text-white":"bg-red-600 text-white"}`}>{state.toUpperCase()}</span>}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--brass)]"></div>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div>
          <div className="font-bold text-sm" style={{fontFamily:"var(--font-display)"}}>{v.name}</div>
          <div className="text-xs text-[var(--stone)] mt-1 leading-5 line-clamp-2">{v.description}</div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {v.features.slice(0,4).map(f=> <span key={f} className="text-xs bg-[var(--paper)] border border-[var(--rule)] px-2 py-1 rounded-full">{f}</span>)}
        </div>
        <div className="border border-[var(--rule)] bg-[var(--paper)] p-3 flex items-baseline justify-between rounded-lg">
          <div><span className="font-bold">₹{v.pricing.perKm}</span><span className="text-xs text-[var(--stone)]">/km</span><div className="text-xs text-[var(--stone)]">₹{v.pricing.driverPerDay}/day • Min {v.pricing.minKmPerDay}km</div></div>
          <div className="text-right"><div className="text-xs text-[var(--stone)]">extra</div><div className="text-xs font-bold">₹{v.pricing.extraPerKm}/km</div></div>
        </div>
        <div className="flex gap-2 mt-auto">
          {onSelect ? (
            <button disabled={disabled} onClick={onSelect} className={`flex-1 py-3 text-sm font-bold border btn-press cursor-pointer rounded-lg ${disabled?"bg-[var(--paper)] text-[var(--stone)] border-[var(--rule)]":"bg-[var(--ink)] text-white border-[var(--ink)] hover:bg-black"}`}>
              {disabled ? (state==="booked"?"Booked":"Unavailable") : "Hold this vehicle"}
            </button>
          ) : (
            <>
              <Link href={`/vehicles/${v.slug}`} className="flex-1 text-center py-3 text-sm font-semibold bg-white border border-[var(--rule)] hover:bg-[var(--paper)] btn-press rounded-lg">Details</Link>
              <Link href={`/booking?vehicle=${v.id}`} className="flex-1 text-center py-3 text-sm font-bold bg-[var(--ink)] text-white btn-press rounded-lg">Book</Link>
            </>
          )}
        </div>
        <div className="text-xs text-[var(--stone)]/60 text-center">5% taxes • Toll at actuals</div>
      </div>
    </div>
  );
}
