import { useI18n } from "@/context/language";

type Metric = {
  value: string;
  unit: { ar: string; en: string };
  context?: { ar: string; en: string };
};

export function ProofMetric({
  metric,
  dark = false
}: {
  metric: Metric;
  dark?: boolean;
}) {
  const { loc } = useI18n();
  return (
    <p className={`proof-metric${dark ? " proof-metric--dark" : ""}`} data-reveal="rise">
      <span className="proof-metric__value">{metric.value}</span>
      <span className="proof-metric__unit">{loc(metric.unit)}</span>
      {metric.context ? <span className="proof-metric__ctx">{loc(metric.context)}</span> : null}
    </p>
  );
}
