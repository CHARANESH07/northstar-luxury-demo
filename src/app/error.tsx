"use client";
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }){
  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-16 text-center">
      <h1 className="text-2xl font-bold" style={{fontFamily:"var(--font-display)"}}>Something went wrong</h1>
      <p className="text-sm text-[var(--stone)] mt-2">{error.message || "Unexpected error. Try again."}</p>
      <button onClick={reset} className="mt-6 bg-[var(--ink)] text-white px-6 py-3 font-bold btn-press cursor-pointer rounded-lg">Try again</button>
      <div className="mt-4 text-xs text-[var(--stone)]">If this persists, call {`+91 98101 15661`}</div>
    </div>
  );
}
