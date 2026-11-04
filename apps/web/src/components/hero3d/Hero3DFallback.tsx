/**
 * Fallback Skeleton saat WebGL/Three.js sedang dimuat secara asinkron (Code-Splitting)
 */
export function Hero3DFallback() {
  return (
    <div className="flex h-full min-h-[460px] w-full items-center justify-center p-6 select-none" aria-hidden="true">
      <div className="relative flex h-[390px] w-[215px] items-center justify-center rounded-[36px] border-4 border-[#9DB2BF]/40 bg-[#DDE6ED]/40 p-4 shadow-xl backdrop-blur-xs animate-pulse">
        {/* Dynamic Island Skeleton */}
        <div className="h-3.5 w-16 rounded-full bg-[#9DB2BF]/60 mb-auto" />
        {/* Konten Kartu Layar */}
        <div className="absolute inset-x-4 top-16 space-y-3">
          <div className="h-20 rounded-2xl bg-white/70 border border-[#9DB2BF]/40" />
          <div className="h-20 rounded-2xl bg-white/70 border border-[#9DB2BF]/40" />
        </div>
        {/* Home Bar */}
        <div className="mt-auto h-1 w-16 rounded-full bg-[#526D82]/40" />
      </div>
    </div>
  );
}

