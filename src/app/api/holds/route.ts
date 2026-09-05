import { createHold, getHold } from "@/lib/holdStore";
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request){
  const body = await req.json().catch(()=>null);
  if(!body?.vehicleId || !body?.date) return Response.json({ error:{ code:"BAD_REQUEST", message:"vehicleId and date required"}},{status:400});
  const sessionId = req.headers.get("x-session-id") || body.sessionId || "anon";
  const res = createHold(body.vehicleId, body.date, sessionId);
  if("error" in res){
    const code = res.error==="BOOKED"? "SLOT_TAKEN" : "ALREADY_HELD";
    return Response.json({ error:{ code, message: res.error==="BOOKED" ? "Just booked by another guest" : "Already held — try another vehicle or wait"}},{status:409});
  }
  return Response.json({ holdId: res.hold.id, expiresAt: res.hold.expiresAt, slotKey: res.hold.slotKey }, { status:201 });
}

export async function GET(req: Request){
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if(!id) return Response.json({ error:{ code:"BAD_REQUEST", message:"id required"}},{status:400});
  const h = getHold(id);
  if(!h) return Response.json({ error:{ code:"NOT_FOUND", message:"Hold not found"}},{status:404});
  return Response.json(h);
}
