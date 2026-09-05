import { destinations } from "@/data/vehicles";
import Link from "next/link";
import { notFound } from "next/navigation";
export function generateStaticParams(){ return destinations.map(d=>({ slug:d.slug })); }
export default async function DestDetail({ params }: { params: Promise<{slug:string}> }){
  const { slug } = await params;
  const d = destinations.find(x=>x.slug===slug);
  if(!d) return notFound();
  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-8">
      <Link href="/destinations" className="text-sm text-[var(--stone)] hover:text-[var(--ink)]">← All corridors</Link>
      <div className="mt-4 bg-white border border-[var(--rule)] p-6 md:p-8">
        <div className="text-xs tracking-wide font-semibold text-[var(--stone)]">CORRIDOR</div>
        <h1 className="text-3xl font-bold mt-1" style={{fontFamily:"var(--font-display)"}}>New Delhi → {d.name}</h1>
        <p className="text-sm text-[var(--muted)] mt-2">{d.tagline} • Sample corridor. Replace with any pickup/drop.</p>
        <div className="mt-6 border border-[var(--rule)] divide-y text-sm">
          <div className="grid grid-cols-2 px-4 py-3 bg-[var(--paper)] font-semibold"><span>From</span><span>To</span></div>
          <div className="grid grid-cols-2 px-4 py-3"><span>New Delhi (Connaught Place)</span><span>{d.name}</span></div>
          <div className="px-4 py-3 text-xs text-[var(--stone)]">250 km/day included • Extra per km • Driver allowance + 5% taxes</div>
        </div>
        <div className="mt-6 flex gap-3">
          <Link href={`/booking?pickup=New Delhi&drop=${encodeURIComponent(d.name)}`} className="flex-1 text-center bg-[var(--ink)] text-white py-3 font-bold">Book this corridor</Link>
          <Link href="/vehicles" className="flex-1 text-center border border-[var(--rule)] py-3 font-semibold">Choose vehicle</Link>
        </div>
        <p className="text-xs text-[var(--stone)] mt-3 text-center">Shareable: <code className="bg-[var(--paper)] border border-[var(--rule)] px-1">/destinations/{d.slug}</code></p>
      </div>
    </div>
  );
}
