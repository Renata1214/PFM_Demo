import { RunwaySnapshot } from "@/domain";
import clsx from "clsx";

function runwayColor(months: number): string {
  if (!Number.isFinite(months)) return "text-accent";
  if (months < 3) return "text-danger";
  if (months < 4) return "text-warning";
  return "text-accent";
}

export function RunwayHero({ runway }: { runway: RunwaySnapshot }) {
  return (
    <div className="rounded-3xl border border-border-subtle bg-gradient-to-br from-surface-2 to-surface p-5">
      <p className="text-xs uppercase tracking-wide text-text-faint">Safe to spend today</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-4xl font-semibold text-text">
          AED {runway.safeToSpendToday.toLocaleString()}
        </span>
        <span className="text-sm text-text-muted">/day</span>
      </div>
      <p className="mt-1 text-xs text-text-faint">
        {runway.daysRemainingInMonth} days left this month, after rent, remittance,
        subscriptions and your savings plan
      </p>

      <div className="mt-5 flex items-center justify-between rounded-2xl bg-surface-3/60 px-4 py-3">
        <div>
          <p className="text-xs text-text-faint">Months of runway</p>
          <p className={clsx("text-2xl font-semibold", runwayColor(runway.runwayMonths))}>
            {Number.isFinite(runway.runwayMonths) ? runway.runwayMonths : "∞"}{" "}
            <span className="text-sm font-normal text-text-muted">months</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-text-faint">Liquid assets</p>
          <p className="text-sm font-medium text-text">
            AED {runway.liquidAssets.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
