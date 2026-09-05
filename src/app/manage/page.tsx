"use client";
import { useState } from "react";
export default function Manage(){
  const [id,setId]=useState("");
  const [data,setData]=useState<any>(null);
  const [err,setErr]=useState("");
  async function lookup(){
    setErr(""); setData(null);
    if(!id.trim()) return setErr("Enter Booking ID (e.g., BK-20260905-XXXX)");
    const raw = typeof window!=="undefined" ? sessionStorage.getItem(`confirm_${id.trim()}`) : null;
    if(raw){ setData(JSON.parse(raw)); return; }
    const r = await fetch(`/api/confirm?id=${encodeURIComponent(id.trim())}`);
    const j = await r.json();
    if(j.error) setErr(j.error.message);
    else setData({ booking:j });
  }
  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-8">
      <div className="text-xs tracking-wide font-semibold text-[var(--stone)]">MANAGE • BOOKING LOOKUP</div>
      <h1 className="text-3xl font-bold mt-1" style={{fontFamily:"var(--font-display)"}}>Find your booking</h1>
      <p className="text-sm text-[var(--muted)] mt-2">Mock lookup — checks sessionStorage first, then server in-memory (resets on deploy).</p>
      <div className="mt-6 bg-white border border-[var(--rule)] p-5">
        <label className="text-xs font-semibold text-[var(--stone)]">BOOKING ID
          <div className="mt-1 flex gap-2">
            <input value={id} onChange={e=>setId(e.target.value)} placeholder="BK-20260905-AB12" className="flex-1 border border-[var(--rule)] px-3 py-3 text-sm focus:outline-none focus:border-[var(--ink)]"/>
            <button onClick={lookup} className="bg-[var(--ink)] text-white px-5 font-bold">Lookup</button>
          </div>
        </label>
        {err && <div className="mt-3 bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">{err}</div>}
        {data && (
          <div className="mt-4 border border-[var(--rule)] bg-[var(--paper)] p-4 text-sm">
            <div className="font-mono font-bold">{data.booking?.id || data.id}</div>
            <div className="text-[var(--stone)] text-xs mt-1">{data.trip?.pickup} → {data.trip?.drop} • {data.trip?.date}</div>
            <div className="mt-2 font-bold">₹{data.price?.total?.toLocaleString?.("en-IN") ?? data.price?.total} total</div>
            <div className="text-xs text-[var(--stone)]">Status: {(data.booking?.status||data.status||"CONFIRMED")}</div>
          </div>
        )}
      </div>
      <div className="mt-4 text-xs text-[var(--stone)]">Need help? <a href="/contact" className="underline">Contact</a> • <a href="/faq" className="underline">FAQ</a></div>
    </div>
  );
}
