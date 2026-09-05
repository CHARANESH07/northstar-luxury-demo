export type Hold = { id:string; vehicleId:string; slotKey:string; expiresAt:number; sessionId:string; createdAt:number; status:"HELD"|"EXPIRED"|"CONVERTED" };
export type Booking = { id:string; holdId:string; status:string; trip:any; vehicleId:string; slotKey:string; customer:any; price:any; paymentId?:string; createdAt:number };
export type Payment = { id:string; bookingId?:string; holdId:string; amount:number; status:"INITIATED"|"PROCESSING"|"SUCCESS"|"FAILED"|"VERIFIED"; method?:string };
