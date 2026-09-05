import { vehicles } from "@/data/vehicles";
import { availabilityFor } from "@/lib/holdStore";
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || "";
  const passengers = parseInt(searchParams.get("passengers") || "1",10);
  const vehicleType = searchParams.get("vehicleType") || "Any";

  if(!date) return Response.json({ error:{ code:"BAD_REQUEST", message:"date required"}},{status:400});
  const { held, booked } = availabilityFor(date);

  // simulate blocked: 1 random vehicle blocked for demo variety if not already booked/held
  const blocked = new Set<string>();
  // deterministic pseudo-random based on date char sum
  const seed = date.split("").reduce((a,c)=>a+c.charCodeAt(0),0);
  if(seed % 3 === 0){
    const cand = vehicles[seed % vehicles.length].id;
    if(!held.has(cand) && !booked.has(cand)) blocked.add(cand);
  }

  let filtered = vehicles;
  if(vehicleType!=="Any"){
    const v = vehicleType.toLowerCase();
    if(v.includes("tempo")) filtered = filtered.filter(x=>x.category==="Tempo Traveller");
    else if(v==="car") filtered = filtered.filter(x=>x.category==="Car");
    else filtered = filtered.filter(x=> x.name.toLowerCase().includes(v) || x.id===v);
  }
  // capacity: filter out vehicles that can't fit passengers, but keep for display as unavailable reason
  const available: any[] = [];
  const unavailable: any[] = [];
  for(const v of filtered){
    if(booked.has(v.id)) unavailable.push({ vehicleId:v.id, reason:"booked", label:"Booked" });
    else if(held.has(v.id)) unavailable.push({ vehicleId:v.id, reason:"held", label:"Held — another guest is booking" });
    else if(blocked.has(v.id)) unavailable.push({ vehicleId:v.id, reason:"blocked", label:"Blocked — maintenance" });
    else if(v.seater < passengers) unavailable.push({ vehicleId:v.id, reason:"capacity", label:`Fits ${v.seater}, need ${passengers}` });
    else available.push(v);
  }
  // also include booked/held as unavailable cards (even if filtered out by capacity already pushed)
  // ensure at least mix: if all available, force one unavailable for demo realism is already via blocked/capacity
  return Response.json({ available, unavailable, date, passengers, vehicleType }, { headers:{ "Cache-Control":"no-store"}});
}
