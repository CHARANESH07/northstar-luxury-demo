export const metadata={ title:"FAQ" };
const faqs = [
  ["What is per-km vs driver allowance?", "Per-km covers vehicle + fuel for 250 km/day. Driver allowance is per day for the chauffeur. Extra km beyond 250 is charged at the same per-km rate. 5% taxes extra. Toll/parking at actuals."],
  ["Is the booking confirmed instantly?", "You hold the vehicle for 10 minutes (server hold). After details and mock payment, we do a second availability check before confirming — this prevents double-booking. Hold is server-side, not just frontend."],
  ["What if payment fails?", "No amount is charged (mock). Your hold stays until expiry. Retry with another method or force success/fail buttons for demo."],
  ["Can I book for same day?", "Yes if pickup is 3+ hours from now — we need dispatch time."],
  ["What if no vehicles show as available?", "Try a larger vehicle or next date. Capacity (e.g., Sedan fits 4) and held/booked/blocked states are shown, not hidden."],
  ["How do I manage a booking?", "Use Manage Booking with your Booking ID to view details. Cancellation: free until 24h before, 50% after (mock policy)."],
];
export default function FAQ(){
  return (
    <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-8">
      <div className="text-xs tracking-wide font-semibold text-[var(--stone)]">SUPPORT • FAQ</div>
      <h1 className="text-3xl font-bold mt-1" style={{fontFamily:"var(--font-display)"}}>Answers before you ask</h1>
      <p className="text-sm text-[var(--muted)] mt-2">Trust is built on clarity. No hidden charges, no “call for price”.</p>
      <div className="mt-6 border border-[var(--rule)] bg-white divide-y">
        {faqs.map(([q,a])=>(
          <details key={q} className="group px-5 py-4 open:bg-[var(--paper)]">
            <summary className="font-semibold text-sm cursor-pointer list-none flex items-center justify-between gap-4">
              {q}
              <span className="w-6 h-6 border border-[var(--rule)] grid place-items-center text-xs group-open:rotate-45 transition">+</span>
            </summary>
            <p className="text-sm text-[var(--muted)] mt-2 leading-6 pr-8">{a}</p>
          </details>
        ))}
      </div>
      <div className="mt-6 text-sm">Still stuck? <a href="/contact" className="underline decoration-[var(--brass)] decoration-4 font-semibold">Contact dispatch</a> or <a href="/manage" className="underline">manage booking</a>.</div>
    </div>
  );
}
