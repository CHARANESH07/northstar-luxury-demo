import { confirmHold, getBooking } from "@/lib/holdStore";
import { vehicles } from "@/data/vehicles";
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// POST /api/confirm — atomic second availability check (the double-booking guard)
export async function POST(req: Request){
  const body = await req.json().catch(()=>null);
  const holdId = body?.holdId;
  if(!holdId) return Response.json({ error:{ code:"BAD_REQUEST", message:"holdId required"}},{status:400});
  // idempotency: if same holdId already confirmed, return existing booking
  // search bookings for holdId
  const idempotencyKey = req.headers.get("Idempotency-Key") || req.headers.get("idempotency-key");
  // compute price server-side (never trust client amount)
  const vehicleId = body?.vehicleId || body?.trip?.vehicleId;
  const v = vehicles.find(x=>x.id===vehicleId);
  if(!v && !body?.price) return Response.json({ error:{ code:"BAD_REQUEST", message:"vehicle not found"}},{status:400});
  // server price: assume 300km 2days if not provided; real would compute via distance matrix
  const kms = body?.price?.kms || 300;
  const days = body?.price?.days || (body?.trip?.tripType==="OneWay"?1:2);
  const subtotal = v ? v.pricing.perKm * kms : body.price.subtotal;
  const driver = v ? v.pricing.driverPerDay * days : body.price.driver;
  const taxes = Math.round((subtotal+driver)*(v? v.pricing.taxPct:5)/100);
  const total = subtotal+driver+taxes;
  const price = { kms, days, subtotal, driver, taxes, total, currency:"INR" };

  const res = confirmHold(holdId, body.customer, body.trip, price);
  if("error" in res){
    const status = res.error==="EXPIRED"?410: res.error==="BOOKED"?409:404;
    const msg = res.error==="EXPIRED"?"Hold expired — check availability again": res.error==="BOOKED"?"Just booked by another guest — choose alternative":"Hold not found";
    return Response.json({ error:{ code:res.error, message:msg }},{status});
  }
  return Response.json({ booking: res.booking, price }, { status:201 });
}

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if(!id) return Response.json({ error:{ code:"BAD_REQUEST", message:"id required"}},{status:400});
  const b = getBooking(id);
  if(!b) return Response.json({ error:{ code:"NOT_FOUND", message:"Booking not found"}},{status:404});
  return Response.json(b);
}
