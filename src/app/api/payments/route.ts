export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
// ponytail: mock provider only. Ceiling: random 30% fail for demo. Real Razorpay/Cashfree swaps via PaymentProvider interface server-side.
export async function POST(req: Request){
  const body = await req.json().catch(()=>null);
  const holdId = body?.holdId;
  const amount = body?.amount;
  if(!holdId) return Response.json({ error:{ code:"BAD_REQUEST", message:"holdId required"}},{status:400});
  const paymentId = `pay_mock_${Math.random().toString(36).slice(2,8)}`;
  // simulate processing delay handled client-side; here we return INITIATED
  return Response.json({ paymentId, status:"INITIATED", amount, holdId });
}

export async function PUT(req: Request){
  const body = await req.json().catch(()=>null);
  const paymentId = body?.paymentId;
  // simulate verification: 70% success
  await new Promise(r=>setTimeout(r, 1200));
  const success = Math.random() < 0.7;
  // allow forced outcome for demo via query/body
  const forced = body?.force; // "success" | "fail"
  const final = forced==="success" ? true : forced==="fail" ? false : success;
  if(final) return Response.json({ paymentId, status:"SUCCESS", gatewayRef:`mock_ref_${Date.now()}` });
  return Response.json({ paymentId, status:"FAILED", error:"Payment declined by bank (mock)" }, { status:402 });
}
