import BookingWidget from "@/components/BookingWidget";
import Stepper from "@/components/Stepper";
export const metadata={ title:"Book" };
export default async function BookingPage({ searchParams }: { searchParams: Promise<any>}){
  const sp = await searchParams;
  return (
    <div className="max-w-[1160px] mx-auto px-4 sm:px-6 py-8">
      <Stepper step={1}/>
      <div className="max-w-3xl">
        <div className="text-xs tracking-widest font-semibold text-[var(--ink)]">BOOKING • 4 STEPS • HOLD 10 MIN</div>
        <h1 className="text-3xl font-bold mt-1" style={{fontFamily:"var(--font-display)"}}>Book your ride</h1>
        <p className="text-sm text-[var(--stone)] mt-2">Trip → Availability → Details → Payment → Confirm. Real-time held/booked from server, not “Available” everywhere.</p>
      </div>
      <div className="mt-6">
        <BookingWidget compact initial={sp}/>
      </div>
      <div className="mt-6 bg-[var(--paper)] border border-[var(--line)] rounded-2xl p-5 text-sm grid md:grid-cols-4 gap-4">
        <div><div className="w-7 h-7 rounded-full bg-white border border-[var(--line)] grid place-items-center text-xs font-bold">1</div><div className="font-semibold mt-2">Check availability</div><div className="text-xs text-[var(--stone)]">Real booked/held/blocked</div></div>
        <div><div className="w-7 h-7 rounded-full bg-white border border-[var(--line)] grid place-items-center text-xs font-bold">2</div><div className="font-semibold mt-2">Select & hold</div><div className="text-xs text-[var(--stone)]">10 min to complete</div></div>
        <div><div className="w-7 h-7 rounded-full bg-white border border-[var(--line)] grid place-items-center text-xs font-bold">3</div><div className="font-semibold mt-2">Mock pay</div><div className="text-xs text-[var(--stone)]">70% success • force toggle</div></div>
        <div><div className="w-7 h-7 rounded-full bg-[var(--ink)] text-white grid place-items-center text-xs font-bold">4</div><div className="font-semibold mt-2">Second check</div><div className="text-xs text-[var(--stone)]">Prevents double-booking</div></div>
      </div>
    </div>
  );
}


