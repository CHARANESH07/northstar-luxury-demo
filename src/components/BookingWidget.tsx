"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const cities = ["New Delhi","Gurgaon","Jaipur","Agra","Chandigarh","Manali","Goa","Udaipur","Shimla","Noida"];

// rendering-hoist-jsx: static options outside component, no recreation per render
const tripOptions: [string,string][] = [["RoundTrip","Round trip"],["OneWay","One way"],["Local","Local"],["Airport","Airport"]];
const vehicleOptions = ["Any","Car","Tempo Traveller","Sedan","SUV","12 Seater TT","17 Seater TT"];

export default function BookingWidget({ compact=false, initial={} as any }){
  const r = useRouter();
  // rerender-lazy-state-init: expensive Date only on mount, not every render
  const [form,setForm]=useState(()=> ({
    pickup: initial.pickup || "",
    drop: initial.drop || "",
    date: initial.date || new Date(Date.now()+86400000).toISOString().slice(0,10),
    time: initial.time || "07:00",
    passengers: initial.passengers || "4",
    vehicleType: initial.vehicleType || "Any",
    tripType: initial.tripType || "RoundTrip",
  }));
  const [err,setErr]=useState("");
  function submit(e:any){
    e.preventDefault();
    if(!form.pickup || !form.drop) return setErr("Enter pickup and drop");
    if(form.pickup.trim().toLowerCase()===form.drop.trim().toLowerCase()) return setErr("Pickup and drop can't be the same");
    const d = new Date(`${form.date}T${form.time}`);
    if(d.getTime() < Date.now()+2.5*60*60*1000) return setErr("Pickup must be at least 3 hours from now");
    const q = new URLSearchParams({ pickup:form.pickup, drop:form.drop, date:form.date, time:form.time, passengers:form.passengers, vehicleType:form.vehicleType, tripType:form.tripType });
    r.push(`/booking/availability?${q.toString()}`);
  }
  const field="w-full mt-1.5 bg-white border border-[var(--rule)] rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-[var(--ink)] focus:ring-2 focus:ring-[var(--ink)]/10";

  return (
    <form onSubmit={submit} className={`bg-white border border-[var(--rule)] shadow-ticket rounded-xl overflow-hidden ${compact?"p-4 md:p-6":"-mt-6 md:-mt-10 relative z-10 max-w-[1160px] mx-auto p-4 md:p-6"}`}>
      <div className="h-1 bg-[var(--brass)] -mx-4 md:-mx-6 -mt-4 md:-mt-6 mb-4"></div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5">
          {tripOptions.map(([v,l])=>(
            <button key={v} type="button" onClick={()=>setForm(s=> ({...s, tripType:v}))} className={`px-3.5 py-1.5 text-xs font-semibold border btn-press cursor-pointer rounded-full ${form.tripType===v?"bg-[var(--ink)] text-white border-[var(--ink)]":"bg-white text-[var(--stone)] border-[var(--rule)] hover:border-[var(--ink)]"}`}>{l}</button>
          ))}
        </div>
        <span className="text-xs bg-[var(--paper)] border border-[var(--rule)] px-2.5 py-1 font-medium rounded-full">Hold 10 min • No payment now</span>
      </div>

      <div className="grid md:grid-cols-12 gap-3 mt-4">
        <label className="md:col-span-4 text-xs font-semibold text-[var(--stone)]">Pickup
          <input list="cities" value={form.pickup} onChange={e=>setForm(s=> ({...s,pickup:e.target.value}))} placeholder="Connaught Place, Delhi" className={field} required autoComplete="address-line1"/>
        </label>
        <label className="md:col-span-4 text-xs font-semibold text-[var(--stone)]">Drop
          <input list="cities" value={form.drop} onChange={e=>setForm(s=> ({...s,drop:e.target.value}))} placeholder="Jaipur, Rajasthan" className={field} required autoComplete="address-line2"/>
        </label>
        <datalist id="cities">{cities.map(c=><option key={c} value={c}/>)}</datalist>
        <label className="md:col-span-2 text-xs font-semibold text-[var(--stone)]">Date
          <input type="date" value={form.date} onChange={e=>setForm(s=> ({...s,date:e.target.value}))} className={field} required/>
        </label>
        <label className="md:col-span-2 text-xs font-semibold text-[var(--stone)]">Time
          <input type="time" value={form.time} onChange={e=>setForm(s=> ({...s,time:e.target.value}))} className={field} required/>
        </label>
        <label className="md:col-span-2 text-xs font-semibold text-[var(--stone)]">Passengers
          <input type="number" min={1} max={26} value={form.passengers} onChange={e=>setForm(s=> ({...s,passengers:e.target.value}))} className={field}/>
        </label>
        <label className="md:col-span-3 text-xs font-semibold text-[var(--stone)]">Vehicle
          <select value={form.vehicleType} onChange={e=>setForm(s=> ({...s,vehicleType:e.target.value}))} className={field+" bg-white"}>
            {vehicleOptions.map(o=> <option key={o}>{o}</option>)}
          </select>
        </label>
        <div className="md:col-span-7 flex items-end">
          <button type="submit" className="w-full bg-[var(--ink)] text-white py-3.5 text-sm font-bold hover:bg-black btn-press cursor-pointer flex items-center justify-center gap-2 rounded-lg">
            Check availability <span className="bg-[var(--brass)] text-white w-6 h-6 grid place-items-center text-xs rounded-full">→</span>
          </button>
        </div>
      </div>
      {err && <div role="alert" aria-live="polite" className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded-lg shake">{err}</div>}
      <div className="mt-3 text-xs text-[var(--stone)] flex gap-3">
        <span>No surge</span><span className="w-px h-3 bg-[var(--rule)] self-center"></span><span>Driver allowance + 5% taxes • 250 km/day</span>
      </div>
    </form>
  );
}
