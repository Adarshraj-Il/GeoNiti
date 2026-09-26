import { useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { parcels, projects, STATUS_COLORS, STATUS_LABELS } from "../data/mockData";
import StatusStamp from "../components/StatusStamp";

export default function GISMap() {
  const [activeParcel, setActiveParcel] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const visible = useMemo(
    () => parcels.filter((p) => statusFilter === "all" || p.status === statusFilter),
    [statusFilter]
  );

  const projectFor = (id) => projects.find((p) => p.id === id);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-display text-[2rem] text-ink">GIS Integrated Map</h1>
        <p className="mx-auto mt-2 max-w-2xl text-[#6c757d]">
          Geo-tagged parcels rendered from <code className="rounded bg-parchment px-1.5 py-0.5 font-mono text-sm text-ink">LandParcel.geom</code> —
          a PostGIS point/polygon column in production. Colour marks acquisition status.
        </p>
        <div className="bg-gradient-accent mx-auto mt-4 h-1 w-20 rounded-full" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {Object.entries(STATUS_LABELS).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setStatusFilter(statusFilter === key ? "all" : key)}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              statusFilter === key ? "bg-ink text-white shadow-md" : "border border-line bg-white text-ink-soft"
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: STATUS_COLORS[key] }} />
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="h-[560px] overflow-hidden rounded-2xl border border-line shadow-md">
          <MapContainer center={[22.5, 79]} zoom={5} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {visible.map((p) => (
              <CircleMarker
                key={p.id}
                center={[p.lat, p.lng]}
                radius={activeParcel === p.id ? 11 : 8}
                pathOptions={{
                  color: "#ffffff",
                  weight: 2,
                  fillColor: STATUS_COLORS[p.status],
                  fillOpacity: 0.9,
                }}
                eventHandlers={{ click: () => setActiveParcel(p.id) }}
              >
                <Popup>
                  <div className="font-body text-sm">
                    <p className="font-semibold">{p.id} — Khasra {p.khasra}</p>
                    <p>{p.district}, {p.state}</p>
                    <p>{p.area} ha · {p.owner}</p>
                    <p className="mt-1">{STATUS_LABELS[p.status]}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <div className="card-surface max-h-[560px] overflow-y-auto">
          <div className="rounded-t-2xl border-b border-line bg-parchment px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            {visible.length} parcels
          </div>
          <div className="divide-y divide-line">
            {visible.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveParcel(p.id)}
                className={`block w-full px-4 py-3 text-left transition-colors ${
                  activeParcel === p.id ? "bg-parchment" : "hover:bg-parchment/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ink-soft">{p.id}</span>
                  <StatusStamp status={p.status} size="sm" />
                </div>
                <p className="mt-1 text-sm font-medium text-ink">Khasra {p.khasra} · {p.area} ha</p>
                <p className="text-xs text-ink-soft">{projectFor(p.projectId)?.name}</p>
                <p className="font-mono text-[11px] text-ink-soft/70">
                  {p.lat.toFixed(4)}, {p.lng.toFixed(4)}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
