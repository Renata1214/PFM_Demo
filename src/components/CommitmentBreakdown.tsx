import { Commitment, CommitmentType } from "@/domain";

const TYPE_LABEL: Record<CommitmentType, string> = {
  rent: "Rent",
  remittance: "Remittance",
  subscription: "Subscriptions",
  school_fees: "School fees",
  savings_goal: "Savings goal",
  other_recurring: "Utilities & other",
};

// Fixed order, matched 1:1 with the validated categorical palette in globals.css.
const TYPE_ORDER: CommitmentType[] = [
  "rent",
  "remittance",
  "subscription",
  "other_recurring",
  "savings_goal",
];
const TYPE_COLOR_VAR = [
  "var(--color-cat-1)",
  "var(--color-cat-2)",
  "var(--color-cat-3)",
  "var(--color-cat-4)",
  "var(--color-cat-5)",
];

export function CommitmentBreakdown({ commitments }: { commitments: Commitment[] }) {
  const confirmed = commitments.filter((c) => c.status === "confirmed");
  const totals = new Map<CommitmentType, number>();
  for (const c of confirmed) {
    totals.set(c.type, (totals.get(c.type) ?? 0) + c.amount);
  }

  const rows = TYPE_ORDER.map((type, i) => ({
    type,
    label: TYPE_LABEL[type],
    amount: totals.get(type) ?? 0,
    color: TYPE_COLOR_VAR[i],
  })).filter((r) => r.amount > 0);

  const maxAmount = Math.max(...rows.map((r) => r.amount), 1);
  const grandTotal = rows.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-2 p-4">
      <div className="mb-3 flex items-baseline justify-between">
        <p className="text-sm font-medium text-text">Where your commitments go</p>
        <p className="text-xs text-text-faint">AED {grandTotal.toLocaleString()}/mo</p>
      </div>
      <div className="flex flex-col gap-3">
        {rows.map((r) => (
          <div key={r.type}>
            <div className="mb-1 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-text-muted">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: r.color }}
                />
                {r.label}
              </span>
              <span className="text-text-faint">AED {r.amount.toLocaleString()}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-3">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(r.amount / maxAmount) * 100}%`,
                  backgroundColor: r.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
