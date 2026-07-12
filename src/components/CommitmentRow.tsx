"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Commitment } from "@/domain";
import { Button } from "@/components/ui/Button";

const TYPE_BADGE: Record<Commitment["type"], string> = {
  rent: "Rent",
  remittance: "Remittance",
  subscription: "Subscription",
  school_fees: "School fees",
  savings_goal: "Savings goal",
  other_recurring: "Recurring",
};

export function CommitmentRow({ commitment }: { commitment: Commitment }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [hidden, setHidden] = useState(false);

  async function respond(action: "confirm" | "reject") {
    setPending(true);
    try {
      await fetch(`/api/commitments/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commitmentId: commitment.id }),
      });
      setHidden(true);
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  if (hidden) return null;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-primary/20 bg-lavender p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text">{commitment.name}</p>
          <p className="mt-0.5 text-xs text-text-faint">
            {TYPE_BADGE[commitment.type]} · Day {commitment.cadenceDayOfMonth} ·{" "}
            {Math.round(commitment.confidence * 100)}% confidence
          </p>
        </div>
        <p className="text-sm font-medium text-text">AED {commitment.amount.toLocaleString()}</p>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" disabled={pending} onClick={() => respond("reject")}>
          Not mine
        </Button>
        <Button variant="primary" disabled={pending} onClick={() => respond("confirm")}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
