// ponytail + vercel server-no-shared-module-state: in-memory globalThis is demo-only. Ceiling: resets on deploy/instance, breaks on multi-instance. Upgrade: Vercel KV/Redis with same interface + server-cache-react for dedup.
// vercel server-serialization: store only serializable Hold/Booking, no functions passed to client.
const HOLD_TTL_MS = 10 * 60 * 1000;

type Hold = { id:string; vehicleId:string; slotKey:string; expiresAt:number; sessionId:string; createdAt:number; status:"HELD"|"EXPIRED"|"CONVERTED" };
type Booking = { id:string; holdId:string; vehicleId:string; slotKey:string; status:string; createdAt:number };

const g = globalThis as any;
if (!g.__holdStore) g.__holdStore = { holds: new Map<string,Hold>(), slotToHold: new Map<string,string>(), bookings: new Map<string,Booking>(), slotToBooking: new Map<string,string>() };
const store: { holds: Map<string,Hold>; slotToHold: Map<string,string>; bookings: Map<string,Booking>; slotToBooking: Map<string,string> } = g.__holdStore;

function now(){ return Date.now(); }
function id(prefix:string){ return `${prefix}_${Math.random().toString(36).slice(2,8)}_${Date.now().toString(36)}`; }

export function sweep(){
  for(const [k,h] of store.holds){
    if(h.status==="HELD" && h.expiresAt < now()){
      h.status="EXPIRED";
      store.slotToHold.delete(h.slotKey);
    }
  }
}

export function slotKey(vehicleId:string, date:string){ return `${vehicleId}|${date}`; } // ponytail: 1 vehicle per date. Upgrade: per-slot (morning/evening) if ops needs intra-day splits

export function createHold(vehicleId:string, date:string, sessionId:string){
  sweep();
  const key = slotKey(vehicleId,date);
  if(store.slotToBooking.has(key)) return { error:"BOOKED" as const };
  const existing = store.slotToHold.get(key);
  if(existing){
    const h = store.holds.get(existing);
    if(h && h.status==="HELD" && h.expiresAt > now()) return { error:"HELD" as const };
  }
  const h: Hold = { id:id("hold"), vehicleId, slotKey:key, expiresAt: now()+HOLD_TTL_MS, sessionId, createdAt: now(), status:"HELD" };
  store.holds.set(h.id,h);
  store.slotToHold.set(key,h.id);
  return { hold:h };
}

export function getHold(id:string){
  sweep();
  return store.holds.get(id) || null;
}

export function confirmHold(holdId:string, customer:any, trip:any, price:any){
  sweep();
  const h = store.holds.get(holdId);
  if(!h) return { error:"NOT_FOUND" as const };
  if(h.status!=="HELD" || h.expiresAt < now()) return { error:"EXPIRED" as const };
  if(store.slotToBooking.has(h.slotKey)) return { error:"BOOKED" as const };
  // second availability check — atomic guard
  h.status="CONVERTED";
  store.slotToHold.delete(h.slotKey);
  const booking: Booking = { id:`BK-${new Date().toISOString().slice(0,10).replace(/-/g,"")}-${Math.random().toString(36).slice(2,6).toUpperCase()}`, holdId, vehicleId:h.vehicleId, slotKey:h.slotKey, status:"CONFIRMED", createdAt: now() };
  // store extra for demo display
  (booking as any).customer=customer; (booking as any).trip=trip; (booking as any).price=price;
  store.bookings.set(booking.id, booking);
  store.slotToBooking.set(h.slotKey, booking.id);
  return { booking };
}

export function getBooking(id:string){ return store.bookings.get(id) || null; }

export function availabilityFor(date:string){
  sweep();
  // returns set of booked/held vehicleIds for date
  const held = new Set<string>();
  const booked = new Set<string>();
  for(const h of store.holds.values()) if(h.status==="HELD" && h.slotKey.endsWith(`|${date}`)) held.add(h.vehicleId);
  for(const [slot,bId] of store.slotToBooking) if(slot.endsWith(`|${date}`)) booked.add(slot.split("|")[0]);
  return { held, booked };
}
