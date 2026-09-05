"use client";
import { useEffect, useRef } from "react";

// ui-animation: scroll reveals — once, staggered, respecting reduced-motion, not for above-fold
// web-animation: only for rare marketing moments, not product UI
export default function Reveal({ children, delay=0, className="" }: { children: React.ReactNode; delay?: number; className?: string }){
  const ref = useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const el = ref.current;
    if(!el) return;
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){ el.classList.add("in"); return; }
    const io = new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        // stagger via delay
        setTimeout(()=> el.classList.add("in"), delay);
        io.unobserve(el);
      }
    }, { threshold: 0.15 });
    // start hidden
    el.classList.add("reveal");
    // force reflow then observe
    requestAnimationFrame(()=> io.observe(el));
    return ()=> io.disconnect();
  },[delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Stagger({ children, baseDelay=0, step=40 }: { children: React.ReactNode[]; baseDelay?: number; step?: number }){
  return <>{children.map((child,i)=> <Reveal key={i} delay={baseDelay + i*step}>{child}</Reveal>)}</>;
}
