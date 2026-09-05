export default function Loading(){
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-12">
      <div className="h-6 w-32 bg-[var(--paper)] border border-[var(--rule)] shimmer rounded"></div>
      <div className="mt-6 grid md:grid-cols-3 gap-5">
        {[1,2,3].map(i=> <div key={i} className="h-64 bg-[var(--paper)] border border-[var(--rule)] rounded-xl shimmer"></div>)}
      </div>
    </div>
  );
}
