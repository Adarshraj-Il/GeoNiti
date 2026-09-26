import { useMemo, useState } from "react";
import { projects, documents, STATUS_LABELS } from "../data/mockData";
import StatusStamp from "../components/StatusStamp";
import { FileText, Filter } from "lucide-react";

export default function DigitalRecords() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(projects[0].id);

  const filtered = useMemo(
    () => projects.filter((p) => statusFilter === "all" || p.status === statusFilter),
    [statusFilter]
  );

  const projectDocs = documents.filter((d) => d.projectId === selectedProject);
  const activeProject = projects.find((p) => p.id === selectedProject);

  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-display text-[2rem] text-ink">Land Acquisition Case Files</h1>
        <p className="mx-auto mt-2 max-w-2xl text-[#6c757d]">
          Every notification, award and survey report against a project, with
          version history and an audit trail — replacing the physical case file.
        </p>
        <div className="bg-gradient-accent mx-auto mt-4 h-1 w-20 rounded-full" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <Filter className="h-4 w-4 text-ink-soft" />
        {["all", "proposed", "notified", "awarded", "possessed"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-all ${
              statusFilter === s
                ? "bg-clay text-white shadow-md"
                : "border border-line bg-white text-ink-soft hover:border-clay/60"
            }`}
          >
            {s === "all" ? "All statuses" : STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Project ledger */}
        <div className="card-surface overflow-hidden">
          <div className="grid grid-cols-[100px_1fr_130px] gap-2 border-b border-line bg-parchment px-5 py-3 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
            <span>File No.</span>
            <span>Project</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-line">
            {filtered.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedProject(p.id)}
                className={`grid w-full grid-cols-[100px_1fr_130px] items-center gap-2 px-5 py-4 text-left transition-colors ${
                  selectedProject === p.id ? "bg-parchment" : "hover:bg-parchment/60"
                }`}
              >
                <span className="font-mono text-xs text-ink-soft">{p.id}</span>
                <span>
                  <span className="block font-medium text-ink">{p.name}</span>
                  <span className="block text-sm text-[#6c757d]">{p.district}, {p.state}</span>
                </span>
                <StatusStamp status={p.status} size="sm" />
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-ink-soft">No case files match this status.</p>
            )}
          </div>
        </div>

        {/* Document panel for selected project */}
        <div className="card-surface p-6">
          {activeProject ? (
            <>
              <p className="font-mono text-xs text-ink-soft">{activeProject.id}</p>
              <h3 className="mt-1 font-display text-xl text-ink">{activeProject.name}</h3>
              <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
                <dt className="text-ink-soft">Implementing agency</dt>
                <dd className="text-ink">{activeProject.agency}</dd>
                <dt className="text-ink-soft">Parcels</dt>
                <dd className="text-ink">{activeProject.parcelsPossessed} / {activeProject.parcelsTotal} possessed</dd>
                <dt className="text-ink-soft">Target date</dt>
                <dd className="text-ink">{activeProject.targetDate}</dd>
              </dl>

              <p className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">Documents on file</p>
              <ul className="mt-3 space-y-3">
                {projectDocs.map((d) => (
                  <li key={d.id} className="flex items-start gap-3 rounded-xl border border-line bg-parchment/60 p-3">
                    <span className="icon-tile h-9 w-9 shrink-0 rounded-lg">
                      <FileText className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ink">{d.type} <span className="font-normal text-ink-soft">· v{d.version}</span></p>
                      <p className="text-xs text-ink-soft">{d.uploadedBy} · {d.uploadedAt}</p>
                    </div>
                    <span className={`ml-auto shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${d.status === "final" ? "bg-[#27ae60]/10 text-[#27ae60]" : "bg-[#daa520]/15 text-[#b8860b]"}`}>
                      {d.status}
                    </span>
                  </li>
                ))}
                {projectDocs.length === 0 && (
                  <p className="text-sm text-ink-soft">No documents uploaded yet for this file.</p>
                )}
              </ul>
            </>
          ) : (
            <p className="text-sm text-ink-soft">Select a case file to view its documents.</p>
          )}
        </div>
      </div>
    </div>
  );
}
