import { vehicles } from "@/data/vehicles";
import Link from "next/link";
import { notFound } from "next/navigation";
export function generateStaticParams(){ return vehicles.map(v=>({ slug:v.slug })); }
export default async function VehicleDetail({ params }: { params: Promise<{slug:string}> }){
  const { slug } = await params;
  const v = vehicles.find(x=>x.slug===slug);
  if(!v) return notFound();
  const kms=300, days=2;
  const subtotal = v.pricing.perKm * kms;
  const driver = v.pricing.driverPerDay * days;
  const taxes = Math.round((subtotal+driver)*v.pricing.taxPct/100);
  const total = subtotal+driver+taxes;
  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-8">
      <Link href="/vehicles" className="text-sm text-[var(--stone)] hover:text-[var(--ink)]">← All vehicles</Link>
      <div className="mt-4 bg-white border border-[var(--line)] rounded-[24px] overflow-hidden shadow-card">
        <div className="h-64 bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200 grid place-items-center text-[var(--stone)] relative">
          <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:"radial-gradient(circle at 1px 1px, black 1px, transparent 0)", backgroundSize:"18px 18px"}}></div>
          <span className="text-6xl relative">{v.category==="Car"?"◉":"▭"}</span>
          <span className="absolute top-4 left-4 bg-white border border-[var(--line)] px-3 py-1 rounded-full text-xs font-bold">{v.category} • {v.seater} Seater</span>
          <span className="absolute top-4 right-4 bg-[var(--ink)] text-white px-3 py-1 rounded-full text-xs font-bold">{v.ac?"AC":"NON-AC"}</span>
        </div>
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold" style={{fontFamily:"var(--font-display)"}}>{v.name}</h1>
          <p className="text-sm text-[var(--muted)] mt-2 leading-6">{v.description} • {v.seater} Seater • {v.category}</p>
          <div className="flex flex-wrap gap-2 mt-4">{v.features.map(f=> <span key={f} className="text-xs bg-[var(--paper)] border border-[var(--rule)] px-3 py-1.5 text-[var(--muted)]">{f}</span>)}</div>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="border border-[var(--rule)] p-5 bg-[var(--paper)]">
              <div className="font-bold text-sm">Price example — 300 km, 2 days</div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-[var(--stone)]">{kms} km × ₹{v.pricing.perKm}</span><span className="font-medium">₹{subtotal}</span></div>
                <div className="flex justify-between"><span className="text-[var(--stone)]">Driver {days} × ₹{v.pricing.driverPerDay}</span><span className="font-medium">₹{driver}</span></div>
                <div className="flex justify-between"><span className="text-[var(--stone)]">Taxes {v.pricing.taxPct}%</span><span className="font-medium">₹{taxes}</span></div>
                <div className="flex justify-between font-bold border-t border-[var(--line)] pt-3 text-[var(--ink)]"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
                <div className="text-xs text-[var(--stone)] mt-2">Extra km ₹{v.pricing.extraPerKm}/km after {v.pricing.minKmPerDay} km/day. Toll/parking extra at actuals.</div>
              </div>
            </div>
            <div className="space-y-3">
              <Link href={`/booking?vehicle=${v.id}`} className="block text-center bg-[var(--ink)] text-white py-3.5 rounded-xl font-bold hover:bg-black">Book this {v.name} →</Link>
              <Link href="/contact" className="block text-center bg-white border border-[var(--line)] py-3.5 rounded-xl font-semibold">Enquire</Link>
              <p className="text-xs text-[var(--stone)] text-center">Shareable URL: <code className="bg-[var(--paper)] border border-[var(--rule)] px-1 py-0.5">/vehicles/{v.slug}</code> — SSG, later API.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
