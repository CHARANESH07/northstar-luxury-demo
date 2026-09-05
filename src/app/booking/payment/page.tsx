"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Stepper from "@/components/Stepper";
import { vehicles } from "@/data/vehicles";

function PaymentInner(){
  const sp = useSearchParams();
  const router = useRouter();
  const q = Object.fromEntries(sp.entries());
  const holdId = q.holdId;
  const vehicleId = q.vehicleId;
  const v = vehicles.find(x=>x.id===vehicleId);
  const [payload,setPayload]=useState<any>(null);
  const [method,setMethod]=useState("UPI");
  const [status,setStatus]=useState<"IDLE"|"PROCESSING"|"SUCCESS"|"FAILED">("IDLE");
  const [err,setErr]=useState("");
  useEffect(()=>{
    if(!holdId) return;
    const raw = sessionStorage.getItem(`booking_${holdId}`);
    if(raw) setPayload(JSON.parse(raw));
    else setErr("Missing booking draft — go back to details");
  },[holdId]);
  async function pay(force?:string){
    if(!payload) return;
    setStatus("PROCESSING"); setErr("");
    const init = await fetch("/api/payments",{ method:"POST", headers:{ "Content-Type":"application/json"}, body: JSON.stringify({ holdId, amount: payload.price.total, method })}).then(r=>r.json());
    const verify = await fetch("/api/payments",{ method:"PUT", headers:{ "Content-Type":"application/json"}, body: JSON.stringify({ paymentId: init.paymentId, force })}).then(r=>r.json().then(j=>({ ok:r.ok, j })));
    if(!verify.ok || verify.j.status==="FAILED"){
      setStatus("FAILED"); setErr(verify.j.error || "Payment failed — no amount charged. Retry.");
      return;
    }
    const confirm = await fetch("/api/confirm",{
      method:"POST",
      headers:{ "Content-Type":"application/json", "Idempotency-Key": holdId },
      body: JSON.stringify({ holdId, vehicleId, customer: payload.customer, trip: payload.trip, price: payload.price })
    }).then(r=>r.json().then(j=>({ ok:r.ok, j, status:r.status })));
    if(!confirm.ok){
      if(confirm.status===409) setErr("Just booked by another guest — your payment will be refunded. Choose alternative.");
      else if(confirm.status===410) setErr("Hold expired — check availability again. Payment will be refunded.");
      else setErr(confirm.j.error?.message || "Booking failed — payment will be refunded");
      setStatus("FAILED");
      return;
    }
    setStatus("SUCCESS");
    sessionStorage.setItem(`confirm_${confirm.j.booking.id}`, JSON.stringify({ ...payload, booking: confirm.j.booking, price: confirm.j.price, paymentId: init.paymentId }));
    setTimeout(()=> router.push(`/booking/confirm?id=${confirm.j.booking.id}`), 800);
  }
  if(!v) return <div className="max-w-3xl mx-auto px-4 py-8">Vehicle not found</div>;
  return (
    <div className="max-w-[1120px] mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-[1.35fr_0.85fr] gap-6">
      <div className="lg:col-span-1">
        <Stepper step={4}/>
        <h1 className="text-2xl md:text-3xl font-bold" style={{fontFamily:"var(--font-display)"}}>Mock payment</h1>
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 px-3.5 py-3 mt-3" style={{borderRadius:"0"}}>Demo only — no real money, no Razorpay capture. Secrets stay server-side. 70% success / 30% fail for realism.</p>
        {err && <div className="mt-3 bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 shake" role="alert" aria-live="polite">{err}</div>}
        <div className="mt-6 bg-white border border-[var(--line)] rounded-2xl p-5 md:p-6 shadow-card">
          <div className="flex gap-2 mb-4 p-1 bg-[var(--paper)] border border-[var(--line)] rounded-full w-fit">
            {["UPI","Card","Netbanking"].map(m=>(
              <button key={m} onClick={()=>setMethod(m)} className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition ${method===m?"bg-[var(--ink)] text-white shadow":"text-[var(--muted)] hover:text-[var(--ink)]"}`}>{m}</button>
            ))}
          </div>
          {method==="UPI" && <div className="border border-[var(--line)] rounded-xl p-4 text-sm bg-[var(--paper)]">UPI ID: <span className="font-mono font-bold">demo@upi</span> (mock) — no validation in Zone 1</div>}
          {method==="Card" && <div className="border border-[var(--line)] rounded-xl p-4 text-sm bg-[var(--paper)]">Card <span className="font-mono">4111 1111 1111 1111</span>, 12/30, 123 (mock) — Luhn not enforced</div>}
          {method==="Netbanking" && <div className="border border-[var(--line)] rounded-xl p-4 text-sm bg-[var(--paper)]">Choose any bank — mock</div>}
          <div className="mt-6 flex flex-col gap-2">
            <button disabled={status==="PROCESSING" || status==="SUCCESS" || !payload} onClick={()=>pay()} className="w-full bg-[var(--ink)] text-white py-3.5 font-bold hover:bg-black disabled:bg-stone-200 disabled:text-stone-400 btn-press cursor-pointer flex items-center justify-center gap-2">
              {status==="PROCESSING" ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full spin"></span>Processing — do not refresh…</> : status==="SUCCESS" ? <><span className="w-5 h-5 bg-emerald-500 text-white rounded-full grid place-items-center text-xs pop">✓</span>Payment success — confirming…</> : `Pay ₹${payload?.price?.total?.toLocaleString("en-IN") ?? "—"}`}
            </button>
            <div className="flex gap-2 text-xs">
              <button onClick={()=>pay("success")} className="flex-1 border border-[var(--rule)] bg-white py-2.5 font-semibold hover:bg-[var(--paper)] btn-press cursor-pointer">Force success (demo)</button>
              <button onClick={()=>pay("fail")} className="flex-1 border border-[var(--rule)] bg-white py-2.5 font-semibold hover:bg-[var(--paper)] btn-press cursor-pointer">Force fail (demo)</button>
            </div>
            {status==="FAILED" && <button onClick={()=>pay()} className="w-full bg-white border border-[var(--rule)] py-3 text-sm font-semibold btn-press cursor-pointer shake">Retry payment (hold still valid if not expired)</button>}
          </div>
          <p className="text-xs text-[var(--stone)] mt-3">On success we do second availability check before confirming — the double-booking guard. Idempotency-Key = holdId.</p>
        </div>
      </div>
      <div className="bg-white border border-[var(--line)] rounded-2xl p-5 h-fit sticky top-24 shadow-card">
        <div className="font-bold text-sm" style={{fontFamily:"var(--font-display)"}}>Payable amount</div>
        <div className="text-2xl font-bold mt-2" style={{fontFamily:"var(--font-display)"}}>₹{payload?.price?.total?.toLocaleString("en-IN") ?? "—"}</div>
        <div className="text-xs text-[var(--stone)]">{v.name} • {payload?.trip?.pickup} → {payload?.trip?.drop}</div>
        <div className="mt-4 text-xs text-[var(--stone)] space-y-1.5 border-t border-[var(--line)] pt-4">
          <div className="flex justify-between"><span>Base</span><span className="font-medium">₹{payload?.price?.subtotal}</span></div>
          <div className="flex justify-between"><span>Driver</span><span className="font-medium">₹{payload?.price?.driver}</span></div>
          <div className="flex justify-between"><span>Taxes</span><span className="font-medium">₹{payload?.price?.taxes}</span></div>
        </div>
      </div>
    </div>
  );
}
export default function PaymentPage(){ return <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-8">Loading payment…</div>}><PaymentInner/></Suspense>; }


