"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const nav = [
  ["/","Home"],
  ["/vehicles","Fleet"],
  ["/services","Services"],
  ["/about","About"],
  ["/contact","Contact"],
] as const;

export default function HeaderNav(){
  const [open,setOpen]=useState(false);
  const pathname = usePathname() || "/";
  return (
    <>
      <nav className="hidden md:flex items-center gap-7 text-sm">
        {nav.map(([href,label])=>{
          const active = pathname===href || (href!=="/" && pathname.startsWith(href));
          return <Link key={href} href={href} className={`${active ? "text-[var(--ink)] font-semibold" : "text-[var(--stone)] hover:text-[var(--ink)]"} relative py-1`}>{label}{active && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--brass)]"></span>}</Link>;
        })}
      </nav>
      <div className="hidden md:flex items-center gap-3">
        <span className="hidden lg:inline-flex items-center gap-2 text-xs border border-[var(--rule)] px-3 py-1.5 bg-[var(--paper)] rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-600 pulse-dot rounded-full"></span> 04 ready today
        </span>
        <Link href="/booking" className="bg-[var(--ink)] text-white px-5 py-2.5 text-sm font-semibold hover:bg-black btn-press cursor-pointer rounded-full">Check availability</Link>
      </div>
      <button className="md:hidden w-9 h-9 grid place-items-center border border-[var(--rule)] bg-white rounded-lg" aria-label="Toggle menu" aria-expanded={open} onClick={()=>setOpen(!open)}>
        <span className={`block w-4 h-0.5 bg-[var(--ink)] transition-transform ${open?"rotate-45 translate-y-1":""}`}></span>
        <span className={`block w-4 h-0.5 bg-[var(--ink)] my-1 transition-opacity ${open?"opacity-0":""}`}></span>
        <span className={`block w-4 h-0.5 bg-[var(--ink)] transition-transform ${open?"-rotate-45 -translate-y-1":""}`}></span>
      </button>
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 border-t border-[var(--rule)] bg-white px-4 py-4 space-y-1 shadow-ticket">
          {nav.map(([h,l])=> <Link key={h} href={h} onClick={()=>setOpen(false)} className={`block px-3 py-3 text-sm rounded-lg ${pathname===h?"bg-[var(--ink)] text-white":"bg-[var(--paper)] text-[var(--ink)]"}`}>{l}</Link>)}
          <Link href="/booking" onClick={()=>setOpen(false)} className="mt-3 block bg-[var(--ink)] text-white text-center py-3 font-semibold rounded-lg">Check availability</Link>
        </div>
      )}
    </>
  );
}
