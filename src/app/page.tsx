import BookingWidget from "@/components/BookingWidget";
import VehicleCard from "@/components/VehicleCard";
import Link from "next/link";
import { vehicles, destinations, company, services } from "@/data/vehicles";
import Reveal from "@/components/Reveal";

export default function Home(){
  const popular = vehicles.slice(0,3);
  return (
    <div>
      {/* Hero — ledger */}
      <section className="bg-white border-b border-[var(--rule)]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-8 pt-8 pb-12 md:pb-16 items-start">
          <div className="pt-2">
            <div className="inline-flex items-center gap-2 border border-[var(--rule)] px-2.5 py-1 text-xs">
              <span className="w-1.5 h-1.5 bg-emerald-500 pulse-dot"></span> Own fleet • Dispatch open 24×7
              <span className="w-px h-3 bg-[var(--rule)]"></span> GST • 12,000+ groups
            </div>
            <h1 className="text-[40px] md:text-[54px] font-bold leading-[0.9] tracking-tight mt-4" style={{fontFamily:"var(--font-display)"}}>
              Charter the<br/>whole vehicle.<br/>
              <span className="bg-[var(--brass)] px-1">Not seats.</span>
            </h1>
            <p className="text-[var(--muted)] mt-4 max-w-[48ch] leading-7">
              For families and teams who need to arrive together. One tempo traveller, one verified driver, one bill — transparent per-km, no surge.
            </p>
            <div className="mt-6 border border-[var(--rule)] divide-y rounded-xl overflow-hidden">
              {[
                ["Delhi → Jaipur","281 km • 5h 30m • 12 Seater TT most booked","281"],
                ["Delhi → Agra","231 km • 4h 10m • Sedan for 4","231"],
                ["Delhi → Chandigarh","243 km • 5h • SUV for 6","243"],
              ].map(([route,meta,km])=>(
                <div key={route} className="flex items-center justify-between px-3 py-2.5 text-sm">
                  <span className="font-medium">{route}<span className="hidden sm:inline text-[var(--stone)] font-normal"> — {meta}</span></span>
                  <span className="font-mono text-xs border border-[var(--rule)] px-2 py-1 rounded-full">{km} KM</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Link href="/vehicles" className="border border-[var(--ink)] px-5 py-2.5 text-sm font-semibold hover:bg-[var(--paper)] btn-press cursor-pointer rounded-lg">View fleet</Link>
              <a href={`tel:${company.phone.replace(/\s/g,"")}`} className="bg-[var(--ink)] text-white px-5 py-2.5 text-sm font-bold btn-press cursor-pointer rounded-lg">Call {company.phone}</a>
            </div>
          </div>

          <div className="bg-[var(--paper)] border border-[var(--rule)] p-3 rounded-xl">
            <div className="bg-white border border-[var(--ink)] shadow-ticket rounded-xl overflow-hidden">
              <div className="bg-[var(--ink)] text-white px-4 py-2.5 flex items-center justify-between text-xs">
                <span className="font-bold tracking-wide">TRIP SLIP</span>
                <span className="bg-[var(--brass)] text-[var(--ink)] px-2 py-0.5 font-bold">HOLD 10 MIN</span>
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold text-[var(--stone)]">ROUTE BOARD</div>
                <div className="mt-2 border border-[var(--rule)] divide-y text-sm rounded-lg overflow-hidden">
                  <div className="grid grid-cols-3 px-3 py-2 font-medium bg-[var(--paper)]"><span>Vehicle</span><span>Per km</span><span className="text-right">For 12 pax</span></div>
                  <div className="grid grid-cols-3 px-3 py-2"><span>12 Seater TT</span><span>₹26</span><span className="text-right font-bold">₹7,800</span></div>
                  <div className="grid grid-cols-3 px-3 py-2 bg-[var(--paper)]"><span>17 Seater TT</span><span>₹30</span><span className="text-right font-bold">₹9,000</span></div>
                  <div className="grid grid-cols-3 px-3 py-2"><span>Sedan (4)</span><span>₹14</span><span className="text-right">—</span></div>
                </div>
                <div className="mt-3 text-xs text-[var(--stone)]">250 km/day included • Driver allowance extra • 5% taxes</div>
                <Link href="/booking" className="mt-3 block bg-[var(--brass)] text-[var(--ink)] text-center py-3 font-bold border border-[var(--ink)] btn-press cursor-pointer rounded-lg">Check real availability</Link>
              </div>
            </div>
            <div className="mt-3 text-xs text-[var(--stone)] text-center">Perforated ticket — hold expires, not charged until confirmed.</div>
          </div>
        </div>
      </section>

      <div className="px-4 sm:px-6 max-w-[1280px] mx-auto"><BookingWidget/></div>

      <Reveal>
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-6">
          <div className="border border-[var(--rule)] bg-white divide-x divide-[var(--rule)] grid grid-cols-2 md:grid-cols-4 text-xs rounded-xl overflow-hidden">
            {[
              ["Verified drivers","Licensed, trained"],
              ["Sanitized fleet","Cleaned every trip"],
              ["Transparent","Per-km + driver"],
              ["On time","Dispatch support"],
            ].map(([a,b])=> <div key={a} className="px-4 py-3 flex items-center gap-2"><span className="w-1 h-8 bg-[var(--brass)] rounded-full"></span><span><span className="font-bold block">{a}</span><span className="text-[var(--stone)]">{b}</span></span></div>)}
          </div>
        </section>
      </Reveal>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-8">
        <div className="flex items-end justify-between gap-4 border-b border-[var(--rule)] pb-3">
          <h2 className="text-xl font-bold" style={{fontFamily:"var(--font-display)"}}>Fleet by group size</h2>
          <Link href="/vehicles" className="text-sm border border-[var(--rule)] px-3 py-1.5 hover:bg-white btn-press rounded-full">View all 7 →</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {popular.map((v,i)=> <Reveal key={v.id} delay={i*40}><VehicleCard v={v}/></Reveal>)}
        </div>
      </section>

      <Reveal>
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-8">
          <h2 className="text-xl font-bold border-b border-[var(--ink)] pb-2 inline-block" style={{fontFamily:"var(--font-display)"}}>How you use it</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {services.slice(0,3).map((s,i)=> (
              <Reveal key={s.slug} delay={i*40}>
                <div className="bg-white border border-[var(--rule)] p-5 card-hover rounded-xl">
                  <div className="text-sm font-bold">{s.title}</div>
                  <p className="text-sm text-[var(--stone)] mt-1 leading-6">{s.desc}</p>
                  <Link href="/services" className="text-sm font-semibold underline decoration-[var(--brass)] decoration-4 underline-offset-4 mt-3 inline-block cursor-pointer">Learn more</Link>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-8 grid lg:grid-cols-2 gap-4">
        <Reveal>
          <div className="bg-white border border-[var(--rule)] p-6 card-hover rounded-xl">
            <h2 className="font-bold" style={{fontFamily:"var(--font-display)"}}>A real operator, not a marketplace</h2>
            <p className="text-sm text-[var(--muted)] mt-2 leading-6">Own fleet, full-time drivers. Operating across {company.areas.join(", ")}.</p>
            <div className="mt-4 border border-[var(--rule)] divide-y text-sm rounded-lg overflow-hidden">
              <div className="py-2 px-3 flex justify-between"><span>Drivers</span><span className="font-medium">Uniformed, punctual</span></div>
              <div className="py-2 px-3 flex justify-between"><span>Fleet</span><span className="font-medium">AC • Luggage carrier</span></div>
              <div className="py-2 px-3 flex justify-between"><span>Billing</span><span className="font-medium">GST invoice</span></div>
            </div>
            <Link href="/about" className="inline-block mt-4 bg-[var(--ink)] text-white px-4 py-2 text-sm font-bold btn-press rounded-lg">About us</Link>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="bg-[var(--ink)] text-white p-6 rounded-xl">
            <div className="text-xs tracking-wide opacity-60">OPERATING AREAS</div>
            <div className="flex flex-wrap gap-2 mt-3">{company.areas.map(a=> <span key={a} className="border border-white/20 px-3 py-1.5 text-sm rounded-full">{a}</span>)}</div>
            <Link href="/contact" className="inline-block mt-6 bg-[var(--brass)] text-[var(--ink)] px-4 py-2 text-sm font-bold btn-press rounded-lg">Enquire on WhatsApp</Link>
          </div>
        </Reveal>
      </section>

      <Reveal>
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-8">
          <h2 className="font-bold" style={{fontFamily:"var(--font-display)"}}>Popular corridors</h2>
          <div className="mt-3 border border-[var(--rule)] bg-white divide-y rounded-xl overflow-hidden">
            {destinations.map((d,i)=>(
              <Reveal key={d.id} delay={i*20}>
                <Link href={`/booking?pickup=New Delhi&drop=${d.name}&vehicle=Any`} className="flex items-center justify-between px-4 py-3 hover:bg-[var(--paper)] card-hover">
                  <span><span className="font-bold text-sm">{d.name}</span><span className="text-sm text-[var(--stone)]"> — {d.tagline}</span></span>
                  <span className="text-xs border border-[var(--rule)] px-2 py-1 hidden sm:block rounded-full">Prefill search</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-8">
          <div className="border border-[var(--rule)] bg-white p-6 rounded-xl">
            <h2 className="font-bold" style={{fontFamily:"var(--font-display)"}}>Groups on record</h2>
            <div className="grid md:grid-cols-3 gap-6 mt-4">
              {[
                ["17 seater, spotless, on time. Driver knew every dhaba stop.","Rohit S., Gurgaon"],
                ["Driver excellent with kids and elders. Billing matched quote.","Anjali M., Delhi"],
                ["GST invoice on time, no follow-ups.","Vikram P., Noida"],
              ].map(([q,a],i)=> <Reveal key={a} delay={i*40}><div className="border-l-2 border-[var(--brass)] pl-4"><p className="text-sm leading-6">“{q}”</p><div className="text-xs text-[var(--stone)] mt-2 font-medium">{a}</div></div></Reveal>)}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mt-6">
          <div className="bg-[var(--brass)] border border-[var(--ink)] p-4 flex flex-col md:flex-row items-center justify-between gap-3 rounded-xl">
            <span className="font-bold">Check availability — 10 second hold</span>
            <Link href="/booking" className="bg-[var(--ink)] text-white px-6 py-3 text-sm font-bold btn-press rounded-lg">Book your ride</Link>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
