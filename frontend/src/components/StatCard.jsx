export default function StatCard({ icon: Icon, value, label, variant = "glass" }) {
  if (variant === "glass") {
    return (
      <div className="glass-card px-6 py-5 text-center">
        {Icon && <Icon className="mx-auto h-7 w-7 text-gold" strokeWidth={1.75} />}
        <p className="mt-2 font-display text-3xl text-white">{value}</p>
        <p className="mt-1 text-[0.75rem] uppercase tracking-wide text-white/80">{label}</p>
      </div>
    );
  }
  return (
    <div className="card-surface px-5 py-5">
      <div className="icon-tile">{Icon && <Icon className="h-5 w-5" strokeWidth={1.75} />}</div>
      <p className="mt-3 font-display text-2xl text-ink">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">{label}</p>
    </div>
  );
}
