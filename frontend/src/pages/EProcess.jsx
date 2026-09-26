import { useState } from "react";
import { workflowStages, projects, auditLog } from "../data/mockData";
import StatusStamp from "../components/StatusStamp";
import { ScrollText } from "lucide-react";

const STAGE_TO_STATUS = {
  filing: "proposed",
  verification: "proposed",
  notification: "notified",
  award: "awarded",
  possession: "possessed",
};

export default function EProcess() {
  const [activeStage, setActiveStage] = useState(workflowStages[0].key);
  const [selectedProject, setSelectedProject] = useState(projects[1].id);

  const stage = workflowStages.find((s) => s.key === activeStage);
  const project = projects.find((p) => p.id === selectedProject);
  const currentIndex = workflowStages.findIndex(
    (s) => STAGE_TO_STATUS[s.key] === project.status
  );

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-display text-[2rem] text-ink">The Acquisition Workflow, as a State Machine</h1>
        <p className="mx-auto mt-2 max-w-2xl text-[#6c757d]">
          Each project and parcel moves forward through five defined stages.
          Every transition fires a notification and an audit-log entry —
          nothing moves backward without a recorded override.
        </p>
        <div className="bg-gradient-accent mx-auto mt-4 h-1 w-20 rounded-full" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-ink-soft">Track project:</span>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="rounded-full border border-line bg-white px-4 py-1.5 text-sm text-ink shadow-sm"
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>{p.id} — {p.name}</option>
          ))}
        </select>
      </div>

      {/* Stage rail */}
      <div className="relative mt-12">
        <div className="absolute left-0 right-0 top-6 hidden h-[3px] bg-line sm:block" />
        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-5">
          {workflowStages.map((s, i) => {
            const reached = i <= currentIndex;
            return (
              <button key={s.key} onClick={() => setActiveStage(s.key)} className="text-left">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-display text-lg shadow-md transition-all ${
                    activeStage === s.key
                      ? "border-clay bg-clay text-white scale-110"
                      : reached
                      ? "border-[#27ae60] bg-[#27ae60] text-white"
                      : "border-line bg-white text-ink-soft"
                  }`}
                >
                  {s.number}
                </span>
                <p className="mt-2 text-sm font-semibold text-ink">{s.title}</p>
                <p className="text-xs text-ink-soft">{s.owner}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage detail + project status */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="card-surface p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-clay">Stage {stage.number} of 5</p>
          <h3 className="mt-1 font-display text-2xl text-ink">{stage.title}</h3>
          <p className="mt-3 leading-relaxed text-[#6c757d]">{stage.description}</p>
          <dl className="mt-5 grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-ink-soft">Responsible authority</dt>
            <dd className="text-ink">{stage.owner}</dd>
            <dt className="text-ink-soft">SLA</dt>
            <dd className="text-ink">{stage.slaDays} days from previous stage</dd>
          </dl>
        </div>

        <div className="card-surface p-6">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">Current status</p>
          <h3 className="mt-1 font-display text-lg text-ink">{project.name}</h3>
          <div className="mt-3">
            <StatusStamp status={project.status} />
          </div>
          <p className="mt-4 text-sm text-[#6c757d]">
            {project.parcelsPossessed} of {project.parcelsTotal} parcels possessed ·{" "}
            ₹{(project.compensationDisbursed / 10000000).toFixed(1)} Cr disbursed of{" "}
            ₹{(project.compensationAssessed / 10000000).toFixed(1)} Cr assessed
          </p>
        </div>
      </div>

      {/* Audit trail */}
      <div className="card-surface mt-10 p-6">
        <div className="flex items-center gap-2">
          <span className="icon-tile h-9 w-9 rounded-lg"><ScrollText className="h-4 w-4" /></span>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">Audit log — every transition, recorded</p>
        </div>
        <ul className="mt-4 space-y-3">
          {auditLog.map((entry) => (
            <li key={entry.id} className="flex flex-col gap-0.5 rounded-xl border border-line bg-parchment/60 p-3 sm:flex-row sm:items-baseline sm:justify-between">
              <span className="text-sm text-ink">{entry.action}</span>
              <span className="font-mono text-xs text-ink-soft">{entry.actor} · {entry.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
