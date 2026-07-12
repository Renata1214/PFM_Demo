import { redirect } from "next/navigation";
import { getDemoUserId } from "@/lib/demo/session";
import { FinanceRepository } from "@/lib/repository/FinanceRepository";
import { CommitmentRow } from "@/components/CommitmentRow";
import { ScanButton } from "@/components/ScanButton";

export default async function CommitmentsPage() {
  const userId = await getDemoUserId();
  if (!userId) redirect("/login");

  const { commitments } = await new FinanceRepository().getUserBundle(userId);
  const pending = commitments.filter((c) => c.status === "detected");
  const confirmed = commitments
    .filter((c) => c.status === "confirmed")
    .sort((a, b) => a.cadenceDayOfMonth - b.cadenceDayOfMonth);

  return (
    <main className="flex flex-col gap-5 p-4">
      <div>
        <h1 className="text-lg font-semibold text-text">Commitments</h1>
        <p className="mt-1 text-xs text-text-muted">
          Detected from your transaction history — same merchant, similar amount,
          same time of month. Nothing here was typed in.
        </p>
      </div>

      <ScanButton />

      {pending.length > 0 && (
        <section className="flex flex-col gap-3">
          <p className="px-1 text-xs font-medium uppercase tracking-wide text-text-faint">
            Needs your confirmation
          </p>
          {pending.map((c) => (
            <CommitmentRow key={c.id} commitment={c} />
          ))}
        </section>
      )}

      <section className="flex flex-col gap-2">
        <p className="px-1 text-xs font-medium uppercase tracking-wide text-text-faint">
          Confirmed ({confirmed.length})
        </p>
        {confirmed.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between rounded-xl border border-border-subtle bg-surface-2 px-4 py-3"
          >
            <div>
              <p className="text-sm text-text">{c.name}</p>
              <p className="text-xs text-text-faint">Day {c.cadenceDayOfMonth} of each month</p>
            </div>
            <p className="text-sm font-medium text-text">AED {c.amount.toLocaleString()}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
