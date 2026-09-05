"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Stepper from "@/components/Stepper";
import Link from "next/link";
function ConfirmInner(){
  const sp = useSearchParams();
  const id = sp.get("id");
  const [data,setData]=useState<any>(null);
  const [err,setErr]=useState("");
  useEffect(()=>{
    if(!id){ setErr("Missing booking id"); return; }
    const raw = sessionStorage.getItem(`confirm_${id}`);
    if(raw){ setData(JSON.parse(raw)); return; }
    fetch(`/api/confirm?id=${id}`).then(r=>r.json()).then(j=>{ if(j.error) setErr(j.error.message); else setData({ booking:j }); }).catch(()=>setErr("Network failed"));
  },[id]);
  if(err) return <div className="max-w-3xl mx-auto px-4 py-8"><div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">{err} — <Link href="/booking" className="underline">Start again</Link></div></div>;
  if(!data) return <div className="max-w-3xl mx-auto px-4 py-12">Loading confirmation…</div>;
  const b = data.booking || data;
  const trip = data.trip || b.trip || {};
  const price = data.price || b.price || {};
  const customer = data.customer || b.customer || {};
  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-8">
      <Stepper step={5}/>
      <div className="bg-emerald-50 border border-emerald-200 p-6 md:p-8 text-center shadow-card" style={{borderRadius:"0"}}>
        <div className="w-12 h-12 bg-emerald-500 text-white rounded-full grid place-items-center mx-auto text-xl shadow-sm pop">✓</div>
        <h1 className="text-2xl md:text-3xl font-bold mt-3" style={{fontFamily:"var(--font-display)"}}>Booking confirmed</h1>
        <div className="text-sm text-[var(--muted)] mt-1">Booking ID: <span className="font-mono font-bold text-[var(--ink)] bg-white border border-emerald-200 px-2 py-1 rounded-full text-xs">{b.id}</span></div>
        <div className="text-xs text-[var(--stone)] mt-2">Mock payment verified • Second availability check passed • No real charge</div>
      </div>
      <div className="mt-6 bg-white border border-[var(--line)] rounded-2xl p-5 md:p-6 text-sm space-y-3 shadow-card">
        <div className="grid grid-cols-2 gap-4">
          <div><div className="text-[var(--stone)] text-xs tracking-wide font-semibold">TRIP</div><div className="font-semibold">{trip.pickup} → {trip.drop}</div><div className="text-xs text-[var(--stone)]">{trip.date} {trip.time} • {trip.passengers} pax • {trip.tripType}</div></div>
          <div><div className="text-[var(--stone)] text-xs tracking-wide font-semibold">VEHICLE</div><div className="font-semibold">{trip.vehicleId || b.vehicleId}</div><div className="text-xs text-[var(--stone)]">Slot {b.slotKey || "—"}</div></div>
          <div><div className="text-[var(--stone)] text-xs tracking-wide font-semibold">CUSTOMER</div><div className="font-medium">{customer.name} • {customer.phone}</div><div className="text-xs text-[var(--stone)]">{customer.email}</div></div>
          <div><div className="text-[var(--stone)] text-xs tracking-wide font-semibold">AMOUNT PAID (MOCK)</div><div className="font-bold text-xl" style={{fontFamily:"var(--font-display)"}}>₹{price.total?.toLocaleString("en-IN") ?? price?.total}</div><div className="text-xs text-[var(--stone)]">Base ₹{price.subtotal} + Driver ₹{price.driver} + Taxes ₹{price.taxes}</div></div>
        </div>
        <div className="border-t border-[var(--line)] pt-4 flex gap-2">
          <button onClick={()=>{ const txt=`Booking ${b.id} — ${trip.pickup} → ${trip.drop} on ${trip.date} — ₹${price.total}`; navigator.clipboard.writeText(txt); alert("Copied");}} className="flex-1 bg-white border border-[var(--line)] py-3 rounded-full font-semibold">Copy details</button>
          <a href={`https://wa.me/919810115661?text=${encodeURIComponent(`Booking ${b.id} ${trip.pickup}→${trip.drop} ${trip.date}`)}`} target="_blank" className="flex-1 text-center bg-[#25D366] text-white py-3 rounded-full font-bold">Share on WhatsApp</a>
        </div>
        <div className="text-xs text-[var(--stone)] text-center bg-[var(--paper)] border border-[var(--line)] rounded-xl px-3 py-2">Add to calendar, invoice download, and email are mocked in Zone 1. Real backend will send SMS/email and driver details.</div>
      </div>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="flex-1 text-center bg-white border border-[var(--line)] py-3 rounded-full font-semibold">Back to Home</Link>
        <Link href="/vehicles" className="flex-1 text-center bg-[var(--ink)] text-white py-3 rounded-full font-bold">Book another</Link>
      </div>
    </div>
  );
}
export default function ConfirmPage(){ return <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-8">Loading…</div>}><ConfirmInner/></Suspense>; }


