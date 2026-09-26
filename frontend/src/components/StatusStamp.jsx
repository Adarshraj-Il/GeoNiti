import { STATUS_COLORS, STATUS_LABELS } from "../data/mockData";

export default function StatusStamp({ status, size = "md" }) {
  const color = STATUS_COLORS[status] ?? "#8b8375";
  const label = STATUS_LABELS[status] ?? status;
  const padding = size === "sm" ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs";
  return (
    <span
      className={`status-pill ${padding}`}
      style={{ background: `${color}1A`, color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
