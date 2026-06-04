"use client";

import { useEffect } from "react";
import { RefreshCcw } from "lucide-react";

export default function ErrorPage({
  error, reset,
}: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--bg-base)]">
      <div className="tile p-10 max-w-sm w-full mx-4 text-center space-y-6">
        <p className="text-3xl">⚠</p>
        <div className="space-y-2">
          <h2 className="font-playfair font-bold text-xl text-white">Something went wrong</h2>
          <p className="text-sm text-[var(--text-muted)]">{error.message || "An unexpected error occurred."}</p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
                     bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
        >
          <RefreshCcw className="w-4 h-4" /> Try again
        </button>
      </div>
    </div>
  );
}
