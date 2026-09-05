"use client";
import { usePathname } from "next/navigation";
export default function PageTransition({ children }: { children: React.ReactNode }){
  const pathname = usePathname();
  // ui-animation: page slide — continuity, not teleportation. 280ms ease-enter, transform+opacity only.
  // web-animation: entering → ease-out, exit faster than enter (handled by remount)
  return <div key={pathname} className="page-enter">{children}</div>;
}
