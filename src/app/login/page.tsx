"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function enterDemo() {
    setLoading(true);
    await fetch("/api/auth/demo-login", { method: "POST" });
    router.push("/dashboard");
  }

  return (
    <main className="flex flex-1 flex-col justify-between p-6">
      <div className="mt-16 flex flex-col items-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15">
          <span className="text-2xl font-bold text-primary">W</span>
        </div>
        <h1 className="text-2xl font-semibold text-text">Wio Autopilot</h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">
          A personal finance system that runs your plan by default, and only
          interrupts you when there&apos;s a real decision to make.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="rounded-2xl border border-border-subtle bg-surface-2 p-4 text-xs text-text-muted">
          <p className="mb-1 font-medium text-text">Demo mode</p>
          <p>
            You&apos;ll enter as <span className="text-text">Arjun Menon</span>{" "}
            — a UAE expat sending money home to Kerala every month, six years
            into an uncertain stay. Six months of seeded transaction history,
            detected commitments, and a live salary-day simulation are ready
            to explore.
          </p>
        </div>
        <Button fullWidth onClick={enterDemo} disabled={loading}>
          {loading ? "Entering..." : "Enter demo as Arjun Menon"}
        </Button>
      </div>
    </main>
  );
}
