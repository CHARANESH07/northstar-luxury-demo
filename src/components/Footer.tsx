import Link from "next/link";
import { company } from "@/data/vehicles";

export default function Footer(){
  return (
    <footer className="mt-16 bg-[var(--ink)] text-white">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="py-10 md:py-12 grid lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.7fr_1.1fr] gap-8 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 bg-white text-[var(--ink)] grid place-items-center rounded">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2.5 14.3 9.2 21 12 14.3 14.8 12 21.5 9.7 14.8 3 12 9.7 9.2 12 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/></svg>
              </span>
              <span className="text-lg font-bold tracking-tight" style={{fontFamily:"var(--font-display)"}}>{company.name}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/70 max-w-sm">{company.tagline} Outstation, local & airport. Own fleet, verified drivers, one bill.</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              {["GST Invoiced","Verified Drivers","Sanitized Fleet","24×7 Support"].map(b=>(
                <span key={b} className="px-2.5 py-1 bg-white/10 border border-white/15 text-white/80">{b}</span>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/40">Mock payment only. Real Razorpay via provider swap.</p>
          </div>

          <div>
            <div className="text-xs tracking-wide text-white/50 font-semibold">FLEET</div>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li><Link href="/vehicles" className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brass)]">All vehicles</Link></li>
              <li><Link href="/vehicles/sedan" className="hover:text-white">Sedan — 4</Link></li>
              <li><Link href="/vehicles/12-seater-tt" className="hover:text-white">12 Seater TT</Link></li>
              <li><Link href="/vehicles/17-seater-tt" className="hover:text-white">17 Seater TT</Link></li>
              <li><Link href="/vehicles" className="text-white underline decoration-white/30 underline-offset-4">View fleet →</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs tracking-wide text-white/50 font-semibold">ROUTES</div>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li><Link href="/destinations" className="hover:text-white">All corridors</Link></li>
              <li><Link href="/destinations/jaipur" className="hover:text-white">Delhi → Jaipur</Link></li>
              <li><Link href="/destinations/agra" className="hover:text-white">Delhi → Agra</Link></li>
              <li><Link href="/destinations/goa" className="hover:text-white">Delhi → Goa</Link></li>
              <li><Link href="/services" className="hover:text-white">Services</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-xs tracking-wide text-white/50 font-semibold">SUPPORT</div>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/manage" className="hover:text-white">Manage booking</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/booking" className="hover:text-white">Check availability</Link></li>
            </ul>
          </div>

          <div className="bg-white/[0.06] border border-white/10 p-5">
            <div className="text-xs tracking-wide text-white/50 font-semibold">CONTACT</div>
            <div className="mt-3 text-sm font-medium text-white">{company.phone}</div>
            <div className="text-sm text-white/70">{company.email}</div>
            <div className="mt-3 text-xs leading-5 text-white/60">{company.address}</div>
            <div className="mt-3 text-xs text-white/50">{company.hours}</div>
            <div className="mt-4 flex gap-2">
              <a href={`https://wa.me/${company.whatsapp.replace(/\D/g,"")}`} target="_blank" className="flex-1 text-center bg-[#25D366] text-white py-2.5 text-sm font-semibold cursor-pointer">WhatsApp</a>
              <a href={`tel:${company.phone.replace(/\s/g,"")}`} className="flex-1 text-center bg-white text-[var(--ink)] py-2.5 text-sm font-semibold cursor-pointer">Call</a>
            </div>
          </div>
        </div>

        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <span>© {new Date().getFullYear()} {company.name}. Carefully operated — not a marketplace.</span>
          <span className="flex items-center gap-3">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <span className="w-px h-3 bg-white/15"></span>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <span className="w-px h-3 bg-white/15"></span>
            <Link href="/faq" className="hover:text-white">FAQ</Link>
            <span className="w-px h-3 bg-white/15"></span>
            <span>Delhi NCR • Jaipur • Agra • Chandigarh</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
