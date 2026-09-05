"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import VehicleCard from "@/components/VehicleCard";
import Stepper from "@/components/Stepper";
import Reveal from "@/components/Reveal";
import { vehicles as allVehicles } from "@/data/vehicles";

function Price({ v }:{v:any}){
  const kms=300, days=2;
  const sub=v.pricing.perKm*kms, drv=v.pricing.driverPerDay*days, tax=Math.round((sub+drv)*v.pricing.taxPct/100);
  return <span className="font-semibold text-[var(--ink)]">₹{sub+drv+tax.toLocaleString("en-IN")}<span className="font-normal text-[var(--stone)] text-xs"> • {kms}km · {days}d incl. tax</span></span>;
}

function AvailabilityInner(){
  const sp = useSearchParams();
  const router = useRouter();
  const query = Object.fromEntries(sp.entries());
  const [data,setData]=useState<any>(null);
  const [err,setErr]=useState("");
  const [holding,setHolding]=useState<string | null>(null);
  const [holdInfo,setHoldInfo]=useState<any>(null);
  const qStr = sp.toString();
  useEffect(()=>{
    if(!query.date){ setErr("Missing date — start from booking search"); return; }
    fetch(`/api/availability?${qStr}`).then(r=>r.json()).then(setData).catch(()=>setErr("Network failed"));
  },[qStr]);
  async function hold(vehicleId:string){
    setHolding(vehicleId); setErr("");
    const date = query.date;
    const r = await fetch("/api/holds",{ method:"POST", headers:{ "Content-Type":"application/json", "x-session-id": "demo-session"}, body: JSON.stringify({ vehicleId, date })});
    const j = await r.json();
    if(!r.ok){ setErr(j.error?.message || "Hold failed"); setHolding(null); return; }
    setHoldInfo({ holdId:j.holdId, expiresAt:j.expiresAt, vehicleId });
  }
  useEffect(()=>{
    if(!holdInfo) return;
    const t = setTimeout(()=>{
      const params = new URLSearchParams({ ...query, holdId: holdInfo.holdId, vehicleId: holdInfo.vehicleId });
      router.push(`/booking/details?${params.toString()}`);
    }, 400);
    return ()=>clearTimeout(t);
  },[holdInfo]);
  const [countdown,setCountdown]=useState("");
  useEffect(()=>{
    if(!holdInfo?.expiresAt) return;
    const iv=setInterval(()=>{
      const s=Math.max(0, Math.floor((holdInfo.expiresAt - Date.now())/1000));
      if(s<=0){ setCountdown("Expired"); clearInterval(iv); setHoldInfo(null); setErr("Hold expired — choose again")}
      else setCountdown(`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`);
    },500);
    return ()=>clearInterval(iv);
  },[holdInfo]);
  if(err && !data) return <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8"><div className="bg-red-50 border border-red-200 p-4 text-sm text-red-800">{err} — <a href="/booking" className="underline decoration-red-300 cursor-pointer">Start again</a></div></div>;
  if(!data) return <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8"><Stepper step={2}/><div className="grid md:grid-cols-3 gap-5">{[1,2,3].map(i=> <div key={i} className="h-64 bg-[var(--paper)] border border-[var(--rule)] shimmer"></div>)}</div></div>;
  const passengers = parseInt(query.passengers||"1",10);
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <Stepper step={2}/>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold" style={{fontFamily:"var(--font-display)"}}>Availability</h1>
        <div className="text-sm text-[var(--muted)] bg-white border border-[var(--line)] rounded-full px-3 py-1.5">{query.pickup} → {query.drop} • {query.date} {query.time} • {passengers} pax • {query.vehicleType}</div>
      </div>
      {holdInfo && <div className="mt-4 bg-amber-50 border border-amber-200 px-4 py-3 text-sm flex items-center justify-between pop">Hold created for <span className="font-mono font-bold">{holdInfo.vehicleId}</span> — expires in <span className="font-mono font-bold">{countdown}</span> <span className="w-2 h-2 bg-amber-500 rounded-full pulse-dot"></span></div>}
      {err && <div className="mt-4 bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 pop">{err}</div>}
      <div className="mt-8">
        <h2 className="font-bold text-sm tracking-wide" style={{fontFamily:"var(--font-display)"}}>AVAILABLE — {data.available.length}</h2>
        {data.available.length===0 ? (
          <div className="mt-3 bg-white border border-[var(--line)] rounded-2xl p-6 text-sm shadow-card">
            <div className="font-bold">No vehicles for {passengers} passengers on {query.date}</div>
            <p className="text-[var(--muted)] mt-1">Try a larger vehicle or next date.</p>
            <div className="flex gap-2 mt-4">
              <button onClick={()=>{
                const d=new Date(query.date); d.setDate(d.getDate()+1);
                const p=new URLSearchParams({ ...query, date: d.toISOString().slice(0,10)}); location.href=`/booking/availability?${p.toString()}`;
              }} className="bg-white border border-[var(--rule)] px-4 py-2 text-sm font-semibold btn-press cursor-pointer">Try next date</button>
              <a href="/booking" className="bg-[var(--ink)] text-white px-5 py-2 text-sm font-semibold btn-press cursor-pointer">New search</a>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
            {data.available.map((v:any,i:number)=> (
              <Reveal key={v.id} delay={i*40}>
                <div className="relative">
                  <VehicleCard v={v} state="available" onSelect={()=>hold(v.id)}/>
                  <div className="mx-1 -mt-1 bg-[var(--paper)] border border-[var(--rule)] border-t-0 px-4 py-2.5 text-xs flex items-center justify-between"><Price v={v}/><span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full pulse-dot"></span>Available</span></div>
                  {holding===v.id && <div className="absolute inset-0 bg-white/80 backdrop-blur-sm grid place-items-center text-sm font-semibold"><span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-[var(--ink)] border-t-transparent rounded-full spin"></span>Holding…</span></div>}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
      {data.unavailable.length>0 && (
        <div className="mt-10">
          <h3 className="font-bold text-sm tracking-wide" style={{fontFamily:"var(--font-display)"}}>UNAVAILABLE — {data.unavailable.length} <span className="font-normal text-[var(--stone)]">— demo mix, not “Available everywhere”</span></h3>
          <div className="grid md:grid-cols-3 gap-5 mt-4">
            {data.unavailable.map((u:any)=>{
              const v = allVehicles.find(x=>x.id===u.vehicleId);
              if(!v) return null;
              const state = u.reason==="booked"?"booked": u.reason==="held"?"held":"blocked";
              return <VehicleCard key={v.id} v={v} state={state as any}/>;
            })}
          </div>
        </div>
      )}
      <div className="mt-8 bg-[var(--paper)] border border-[var(--line)] rounded-2xl p-4 text-xs text-[var(--stone)]">
        Slot key = vehicleId | date. Held/Booked checked server-side. Mock store is in-memory — resets on deploy (ponytail: upgrade to KV/Redis for multi-instance).
      </div>
    </div>
  );
}
export default function AvailabilityPage(){ return <Suspense fallback={<div className="max-w-5xl mx-auto px-4 py-8">Loading availability…</div>}><AvailabilityInner/></Suspense>; }


