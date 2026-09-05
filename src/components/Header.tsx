import Link from "next/link";
import { company } from "@/data/vehicles";
import HeaderNav from "./HeaderNav";

// Server Component — static shell, branding hoisted to module level (server-hoist-static-io)
// Client interactivity isolated to HeaderNav leaf (server-first, minimal JS)
export default function Header(){
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[var(--rule)]">
      <div className="hidden md:block bg-[var(--ink)] text-white text-xs">
        <div className="max-w-[1280px] mx-auto px-6 h-7 flex items-center gap-3">
          <span className="w-1 h-4 bg-[var(--brass)]"></span>
          <span className="opacity-80 hidden lg:inline">Livery maintained • Workshop verified daily at 06:00</span>
          <span className="opacity-60 hidden md:inline">Delhi NCR • Jaipur • Agra • Chandigarh</span>
          <span className="ml-auto flex items-center gap-3">
            <a href={`mailto:${company.email}`} className="opacity-60 hover:opacity-100 hidden lg:inline">{company.email}</a>
            <a href={`tel:${company.phone.replace(/\s/g,"")}`} className="font-semibold text-[var(--brass)]">{company.phone}</a>
          </span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-4 relative">
        <Link href="/" className="flex items-center gap-3">
          <span className="w-9 h-9 bg-[var(--ink)] text-[var(--brass)] grid place-items-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 3 L4 11 L7 11 L7 18 L17 18 L17 11 L20 11 Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><circle cx="12" cy="11" r="1.6" fill="currentColor"/></svg>
          </span>
          <span className="leading-none">
            <span className="block text-[16px] font-bold tracking-tight" style={{fontFamily:"var(--font-display)"}}>NorthStar</span>
            <span className="block text-xs text-[var(--stone)]">Livery • Since 2014</span>
          </span>
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
}
