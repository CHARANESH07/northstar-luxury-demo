import Link from "next/link";
import { destinations } from "@/data/vehicles";
export const metadata={ title:"Routes • Destinations" };
export default function DestinationsPage(){
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="border-b border-[var(--rule)] pb-4">
        <div className="text-xs tracking-wide font-semibold text-[var(--stone)]">CORRIDORS • 6 ROUTES • CONFIGURABLE</div>
        <h1 className="text-3xl md:text-4xl font-bold mt-1" style={{fontFamily:"var(--font-display)"}}>Where Delhi goes</h1>
        <p className="text-sm text-[var(--muted)] mt-2 max-w-[60ch]">Not assumed business routes — each is a template. Tap to prefill booking. Add your own pickup/drop in the next step.</p>
      </div>
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {destinations.map(d=>(
          <Link key={d.id} href={`/destinations/${d.slug}`} className="bg-white border border-[var(--rule)] p-5 hover:bg-[var(--paper)] flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold text-sm" style={{fontFamily:"var(--font-display)"}}>{d.name}</div>
                <div className="text-xs text-[var(--stone)] mt-1">{d.tagline}</div>
              </div>
              <span className="text-xs border border-[var(--rule)] px-2 py-1 bg-[var(--paper)]">Route</span>
            </div>
            <div className="mt-4 border-t border-[var(--rule)] pt-3 flex items-center justify-between text-sm">
              <span className="text-[var(--stone)]">Prefill</span>
              <span className="font-semibold">New Delhi → {d.name} →</span>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 border border-[var(--rule)] bg-[var(--paper)] p-4 text-sm">
        <div className="font-bold">Need a different corridor?</div>
        <div className="text-[var(--stone)] mt-1">Enter any pickup/drop in <Link href="/booking" className="underline decoration-[var(--brass)] decoration-4">booking</Link> — destinations are just shortcuts.</div>
      </div>
    </div>
  );
}
