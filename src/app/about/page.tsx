import { company } from "@/data/vehicles";
import Link from "next/link";
export const metadata={ title:"About" };
export default function About(){
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="max-w-3xl">
        <div className="text-xs tracking-widest font-semibold text-[var(--ink)]">ABOUT • SINCE 2014 • DELHI</div>
        <h1 className="text-3xl md:text-4xl font-bold mt-2 leading-tight" style={{fontFamily:"var(--font-display)"}}>A Delhi operator,<br/>not a marketplace.</h1>
        <p className="text-[var(--muted)] mt-3 leading-7">We own and maintain our fleet. No aggregation markup — our drivers, our vehicles, one bill. Built for families, corporate teams and wedding groups who need to arrive together, comfortably.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-8">
        <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
          <div className="bg-white border border-[var(--line)] rounded-2xl p-6">
            <div className="w-8 h-8 rounded-full bg-[var(--ink)] text-white grid place-items-center text-xs">◈</div>
            <h3 className="font-bold mt-3">What we operate</h3>
            <ul className="text-sm text-[var(--muted)] mt-2 space-y-1.5">
              <li>• Sedan, SUV, Premium — 4–6 seater</li>
              <li>• 9 / 12 / 17 / 20 Seater Tempo Travellers</li>
              <li>• Force Traveller / Urbania class</li>
            </ul>
          </div>
          <div className="bg-white border border-[var(--line)] rounded-2xl p-6">
            <div className="w-8 h-8 rounded-full bg-[var(--paper)] border border-[var(--line)] grid place-items-center text-xs">◎</div>
            <h3 className="font-bold mt-3">Operating areas</h3>
            <div className="flex flex-wrap gap-2 mt-3">{company.areas.map(a=> <span key={a} className="bg-[var(--paper)] border border-[var(--line)] px-3 py-1.5 rounded-full text-xs font-medium">{a}</span>)}</div>
            <p className="text-xs text-[var(--stone)] mt-3">Destinations are configurable — not hard business routes.</p>
          </div>
          <div className="bg-white border border-[var(--line)] rounded-2xl p-6">
            <h3 className="font-bold">Drivers</h3>
            <p className="text-sm text-[var(--muted)] mt-2 leading-6">Verified, licensed, uniformed, rated. Trained for hill and city routes. Punctual, courteous, and reachable on phone before pickup.</p>
            <div className="mt-3 text-xs inline-flex gap-2"><span className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-1 rounded-full">Licensed</span><span className="bg-amber-50 border border-amber-200 text-amber-700 px-2 py-1 rounded-full">Rated 4.8 ★</span></div>
          </div>
          <div className="bg-white border border-[var(--line)] rounded-2xl p-6">
            <h3 className="font-bold">Vehicle quality & support</h3>
            <p className="text-sm text-[var(--muted)] mt-2 leading-6">Sanitized before every trip, AC serviced, GPS enabled. 24×7 support on phone & WhatsApp. GST invoices for corporate.</p>
          </div>
        </div>
        <div className="bg-[var(--ink)] text-white rounded-2xl p-6 md:p-7">
          <div className="text-xs tracking-widest text-white/50 font-semibold">TIMELINE</div>
          <div className="mt-4 space-y-4 text-sm">
            <div className="flex gap-3"><span className="text-[var(--brass)] font-bold">2014</span><span className="text-white/80">Started with 2 Innovas — Delhi to Jaipur outstation.</span></div>
            <div className="flex gap-3"><span className="text-[var(--brass)] font-bold">2019</span><span className="text-white/80">Added Tempo Travellers, began group & wedding travel.</span></div>
            <div className="flex gap-3"><span className="text-[var(--brass)] font-bold">2024</span><span className="text-white/80">Fleet of 7 vehicles, 12,000+ groups served.</span></div>
          </div>
          <div className="mt-6 bg-white/10 border border-white/10 rounded-xl p-4">
            <div className="font-semibold">Customer support</div>
            <div className="text-sm text-white/70 mt-1">{company.phone} • {company.email}</div>
            <div className="text-xs text-white/50 mt-1">{company.address}</div>
            <div className="text-xs text-white/50">{company.hours}</div>
            <Link href="/contact" className="inline-block mt-3 bg-white text-[var(--ink)] px-4 py-2 rounded-full text-sm font-semibold">Contact us →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

