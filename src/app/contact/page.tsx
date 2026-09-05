"use client";
import { company } from "@/data/vehicles";
export default function Contact(){
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="text-xs tracking-widest font-semibold text-[var(--ink)]">CONTACT • 24×7 DISPATCH</div>
      <h1 className="text-3xl md:text-4xl font-bold mt-1" style={{fontFamily:"var(--font-display)"}}>Talk to dispatch —<br/>not a bot.</h1>
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 mt-8">
        <div className="bg-white border border-[var(--line)] rounded-2xl p-6">
          <div className="space-y-4 text-sm">
            <div><div className="text-xs tracking-widest font-semibold text-[var(--stone)]">PHONE</div><div className="font-bold text-lg mt-1">{company.phone}</div><div className="text-xs text-[var(--stone)]">Tap to call — fastest way to confirm</div></div>
            <div><div className="text-xs tracking-widest font-semibold text-[var(--stone)]">EMAIL</div><div className="font-semibold mt-1">{company.email}</div></div>
            <div><div className="text-xs tracking-widest font-semibold text-[var(--stone)]">ADDRESS</div><div className="mt-1 leading-6">{company.address}</div></div>
            <div className="pt-4 border-t border-[var(--line)] flex gap-2">
              <a href={`https://wa.me/${company.whatsapp.replace(/\D/g,"")}`} target="_blank" className="flex-1 text-center bg-[#25D366] text-white py-3 rounded-xl font-semibold">WhatsApp</a>
              <a href={`tel:${company.phone.replace(/\s/g,"")}`} className="flex-1 text-center bg-[var(--ink)] text-white py-3 rounded-xl font-semibold">Call now</a>
            </div>
            <div className="text-xs text-[var(--stone)] text-center">{company.hours} • Avg. reply 12 min</div>
          </div>
        </div>
        <form className="bg-white border border-[var(--line)] rounded-2xl p-6 space-y-4" onSubmit={e=>{e.preventDefault(); alert("Demo: enquiry logged (mock). In production this POSTs to /api/contact");}}>
          <div><div className="font-bold" style={{fontFamily:"var(--font-display)"}}>Send an enquiry</div><div className="text-sm text-[var(--stone)]">We’ll reply with vehicle suggestion and firm quote.</div></div>
          <div className="grid md:grid-cols-2 gap-3">
            <label className="text-xs font-semibold tracking-wide text-[var(--stone)]">YOUR NAME<input placeholder="Rahul Sharma" required className="w-full mt-1.5 border border-[var(--line)] rounded-xl px-3.5 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ink)]/10"/></label>
            <label className="text-xs font-semibold tracking-wide text-[var(--stone)]">PHONE<input placeholder="98XXXXXXXX" required className="w-full mt-1.5 border border-[var(--line)] rounded-xl px-3.5 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ink)]/10"/></label>
          </div>
          <label className="text-xs font-semibold tracking-wide text-[var(--stone)] block">TELL US PICKUP, DROP, DATE, PASSENGERS<textarea placeholder="Delhi → Jaipur, 12 Sep, 12 pax, 12 Seater TT preferred..." rows={4} className="w-full mt-1.5 border border-[var(--line)] rounded-xl px-3.5 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--ink)]/10"></textarea></label>
          <button className="w-full bg-[var(--ink)] text-white py-3.5 rounded-xl font-bold hover:bg-black">Send enquiry (mock) →</button>
          <p className="text-xs text-[var(--stone)] text-center">No email sent in Zone 1. POST to /api/contact in production.</p>
        </form>
      </div>
    </div>
  );
}

