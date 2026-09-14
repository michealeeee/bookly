import { Logo } from "../brand/Logo";

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-navy">
      <div className="flex flex-col items-center gap-6">
        <Logo inverted />
        <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-teal" />
        </div>
        <p className="text-sm text-white/60">Preparing your workspace…</p>
      </div>
    </div>
  );
}
