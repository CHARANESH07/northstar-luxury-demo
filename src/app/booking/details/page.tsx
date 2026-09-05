"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Stepper from "@/components/Stepper";
import { vehicles } from "@/data/vehicles";

function DetailsInner(){
  const sp = useSearchParams();
  const router = useRouter();
  const query = Object.fromEntries(sp.entries());
  const holdId = query.holdId;
  const vehicleId = query.vehicleId;
  const v = vehicles.find(x=>x.id===vehicleId);
  const [hold,setHold]=useState<any>(null);
  const [err,setErr]=useState("");
  const [countdown,setCountdown]=useState("");
  useEffect(()=>{
    if(!holdId){ setErr("Missing hold — start from availability"); return; }
    fetch(`/api/holds?id=${holdId}`).then(r=>r.json()).then(j=>{ if(j.error) setErr(j.error.message); else setHold(j); }).catch(()=>setErr("Network failed"));
  },[holdId]);
  useEffect(()=>{
    if(!hold?.expiresAt) return;
    const iv=setInterval(()=>{
      const s=Math.max(0, Math.floor((hold.expiresAt - Date.now())/1000));
      if(s<=0){ setCountdown("Expired"); clearInterval(iv); setErr("Hold expired — check availability again"); }
      else setCountdown(`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`);
    },500);
    return ()=>clearInterval(iv);
  },[hold]);
  const [form,setForm]=useState({ name:"", phone:"", email:"", address:"", altPhone:"", notes:"" });
  const [submitting,setSubmitting]=useState(false);
  function valid(){
    if(form.name.trim().length<2) return "Enter full name";
    if(!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g,"").slice(-10))) return "Enter valid 10-digit Indian phone";
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter valid email";
    if(!form.address.trim()) return "Enter pickup address";
    return "";
  }
  async function submit(e:any){
    e.preventDefault();
    const vErr = valid();
    if(vErr) return setErr(vErr);
    if(!hold || countdown==="Expired") return setErr("Hold expired");
    setSubmitting(true); setErr("");
    const price = v ? (()=>{ const kms=300, days=query.tripType==="OneWay"?1:2; const sub=v.pricing.perKm*kms, drv=v.pricing.driverPerDay*days, tax=Math.round((sub+drv)*v.pricing.taxPct/100); return { kms, days, subtotal:sub, driver:drv, taxes:tax, total:sub+drv+tax };})() : { total:0 };
    const payload = { holdId, vehicleId, trip: query, customer: form, price };
    sessionStorage.setItem(`booking_${holdId}`, JSON.stringify(payload));
    const p = new URLSearchParams({ holdId, vehicleId });
    Object.entries(query).forEach(([k,v])=>{ if(!p.has(k)) p.set(k, String(v)); });
    router.push(`/booking/payment?${p.toString()}`);
  }
  if(!v) return <div className="max-w-3xl mx-auto px-4 py-8">Vehicle not found — <a href="/booking" className="underline">start again</a></div>;
  const price = (()=>{ const kms=300, days=query.tripType==="OneWay"?1:2; const sub=v.pricing.perKm*kms, drv=v.pricing.driverPerDay*days, tax=Math.round((sub+drv)*v.pricing.taxPct/100); return { kms, days, sub, drv, tax, total:sub+drv+tax };})();
  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[1.35fr_0.85fr] gap-6">
      <div className="lg:col-span-1">
        <Stepper step={3}/>
        <h1 className="text-2xl md:text-3xl font-bold" style={{fontFamily:"var(--font-display)"}}>Customer details</h1>
        <div className="text-sm text-[var(--muted)] mt-1 flex flex-wrap items-center gap-2">Hold <span className="font-mono bg-white border border-[var(--rule)] px-2 py-0.5 text-xs">#{holdId?.slice(0,8)}</span> • {v.name} • <span className={`font-mono font-bold px-2 py-0.5 text-xs border flex items-center gap-1 ${countdown==="Expired"?"bg-red-50 border-red-200 text-red-700":"bg-amber-50 border-amber-200 text-amber-800"}`}><span className={`w-1.5 h-1.5 rounded-full ${countdown==="Expired"?"bg-red-500":"bg-amber-500 pulse-dot"}`}></span>expires {countdown || "--:--"}</span></div>
        {err && <div className="mt-3 bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 shake" role="alert" aria-live="polite">{err}</div>}
        <form onSubmit={submit} className="mt-6 bg-white border border-[var(--line)] rounded-2xl p-5 md:p-6 space-y-4 shadow-card">
          <div className="grid md:grid-cols-2 gap-4">
            <label className="text-xs font-semibold tracking-wide text-[var(--stone)]">FULL NAME*<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full mt-1.5 bg-white border border-[var(--line)] rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ink)]/10 focus:border-[var(--ink)]/20" placeholder="Rahul Sharma" required/></label>
            <label className="text-xs font-semibold tracking-wide text-[var(--stone)]">PHONE*<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full mt-1.5 bg-white border border-[var(--line)] rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ink)]/10" placeholder="98XXXXXXXX" required/></label>
            <label className="text-xs font-semibold tracking-wide text-[var(--stone)]">EMAIL*<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full mt-1.5 bg-white border border-[var(--line)] rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ink)]/10" placeholder="you@example.com" required/></label>
            <label className="text-xs font-semibold tracking-wide text-[var(--stone)]">ALTERNATE PHONE<input value={form.altPhone} onChange={e=>setForm({...form,altPhone:e.target.value})} className="w-full mt-1.5 bg-white border border-[var(--line)] rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ink)]/10" placeholder="Optional"/></label>
          </div>
          <label className="text-xs font-semibold tracking-wide text-[var(--stone)] block">PICKUP ADDRESS*<textarea value={form.address} onChange={e=>setForm({...form,address:e.target.value})} rows={2} className="w-full mt-1.5 bg-white border border-[var(--line)] rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ink)]/10" placeholder="House, street, landmark" required/></label>
          <label className="text-xs font-semibold tracking-wide text-[var(--stone)] block">SPECIAL REQUESTS<textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} rows={2} className="w-full mt-1.5 bg-white border border-[var(--line)] rounded-xl px-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ink)]/10" placeholder="Child seat, etc."/></label>
          <label className="text-sm flex items-start gap-2 bg-[var(--paper)] border border-[var(--line)] rounded-xl px-3 py-3"><input type="checkbox" required className="mt-1 accent-[var(--ink)]"/> <span className="text-[var(--muted)] text-xs leading-5">I agree to cancellation: free until 24h before, 50% after.</span></label>
          <button disabled={submitting || countdown==="Expired"} className="w-full bg-[var(--ink)] text-white py-3.5 font-bold disabled:bg-stone-200 disabled:text-stone-400 hover:bg-black btn-press cursor-pointer flex items-center justify-center gap-2">{submitting?<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spin"></span>Checking…</>:"Review & Pay →"}</button>
        </form>
      </div>
      <div className="bg-white border border-[var(--line)] rounded-2xl p-5 h-fit sticky top-24 shadow-card">
        <div className="font-bold text-sm" style={{fontFamily:"var(--font-display)"}}>Booking summary</div>
        <div className="text-sm mt-3 space-y-1">
          <div className="flex justify-between"><span className="text-[var(--stone)]">Trip</span><span>{query.pickup} → {query.drop}</span></div>
          <div className="flex justify-between"><span className="text-[var(--stone)]">Date</span><span>{query.date} {query.time}</span></div>
          <div className="flex justify-between"><span className="text-[var(--stone)]">Vehicle</span><span>{v.name}</span></div>
          <div className="flex justify-between"><span className="text-[var(--stone)]">Passengers</span><span>{query.passengers}</span></div>
        </div>
        <div className="border-t border-[var(--line)] mt-4 pt-4 text-sm space-y-1.5">
          <div className="flex justify-between"><span className="text-[var(--stone)]">{price.kms} km × ₹{v.pricing.perKm}</span><span className="font-medium">₹{price.sub}</span></div>
          <div className="flex justify-between"><span className="text-[var(--stone)]">Driver {price.days} × ₹{v.pricing.driverPerDay}</span><span className="font-medium">₹{price.drv}</span></div>
          <div className="flex justify-between"><span className="text-[var(--stone)]">Taxes {v.pricing.taxPct}%</span><span className="font-medium">₹{price.tax}</span></div>
          <div className="flex justify-between font-bold border-t border-[var(--line)] pt-3 text-[var(--ink)]"><span>Total</span><span>₹{price.total.toLocaleString("en-IN")}</span></div>
          <div className="text-xs text-[var(--stone)] mt-2">Toll/parking extra at actuals. Mock payment — no real charge.</div>
        </div>
      </div>
    </div>
  );
}
export default function DetailsPage(){ return <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-8">Loading…</div>}><DetailsInner/></Suspense>; }


