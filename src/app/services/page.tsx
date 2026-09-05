import { services } from "@/data/vehicles";
import Link from "next/link";
export const metadata={ title:"Services" };
export default function Services(){
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="text-xs tracking-widest font-semibold text-[var(--ink)]">SERVICES • 6 MODES</div>
      <h1 className="text-3xl md:text-4xl font-bold mt-1" style={{fontFamily:"var(--font-display)"}}>Built for how you travel</h1>
      <p className="text-sm text-[var(--stone)] mt-2">Each from <code className="bg-[var(--paper)] border px-1.5 py-0.5 rounded text-xs">/data/vehicles.ts</code>. Outstation is 70% of our trips — tempo travellers dominate group travel.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {services.map(s=>(
          <div key={s.slug} className="bg-white border border-[var(--line)] rounded-2xl p-6 flex flex-col">
            <div className="w-9 h-9 rounded-xl bg-[var(--ink)] text-white grid place-items-center text-xs">◆</div>
            <div className="font-bold mt-3" style={{fontFamily:"var(--font-display)"}}>{s.title}</div>
            <p className="text-sm text-[var(--muted)] mt-1.5 leading-6">{s.desc}</p>
            <ul className="text-xs text-[var(--stone)] mt-4 space-y-1.5">{s.points.map(p=> <li key={p} className="flex gap-2"><span className="text-[var(--brass)]">—</span> {p}</li>)}</ul>
            <Link href="/booking" className="mt-5 inline-flex items-center gap-2 bg-[var(--paper)] border border-[var(--line)] px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-white">Book {s.title} →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

