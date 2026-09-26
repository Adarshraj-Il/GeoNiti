import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { AlertTriangle } from "lucide-react";
import {
  funnelData, stateProgress, compensationByProject, familiesData, delayFlags, projects,
} from "../data/mockData";

const CLAY = "#b8860b";
const MOSS = "#27ae60";
const GOLD = "#daa520";
const INK = "#0b3b5c";
const LINE = "#e0e6ed";

function Panel({ title, sub, children }) {
  return (
    <div className="card-surface p-6">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">{sub}</p>
      <h3 className="mt-1 font-display text-lg text-ink">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-display text-[2rem] text-ink">Acquisition Pipeline, at a Glance</h1>
        <p className="mx-auto mt-2 max-w-2xl text-[#6c757d]">
          Aggregated from {projects.length} active projects across 6 states. Figures are seed data for demonstration.
        </p>
        <div className="bg-gradient-accent mx-auto mt-4 h-1 w-20 rounded-full" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Panel title="Proposed → Possessed" sub="National funnel">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={funnelData} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid stroke={LINE} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: INK }} axisLine={{ stroke: LINE }} />
              <YAxis dataKey="stage" type="category" tick={{ fontSize: 12, fill: INK }} width={90} axisLine={{ stroke: LINE }} />
              <Tooltip contentStyle={{ fontFamily: "Poppins", fontSize: 12, border: `1px solid ${LINE}`, borderRadius: 10 }} />
              <Bar dataKey="count" fill={CLAY} radius={[0, 8, 8, 0]} barSize={26} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Acquired vs. targeted, by state" sub="State-wise progress">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={stateProgress} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid stroke={LINE} horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: INK }} axisLine={{ stroke: LINE }} />
              <YAxis dataKey="state" type="category" tick={{ fontSize: 12, fill: INK }} width={100} axisLine={{ stroke: LINE }} />
              <Tooltip contentStyle={{ fontFamily: "Poppins", fontSize: 12, border: `1px solid ${LINE}`, borderRadius: 10 }} />
              <Bar dataKey="target" fill={LINE} radius={[0, 8, 8, 0]} barSize={12} name="Target parcels" />
              <Bar dataKey="acquired" fill={MOSS} radius={[0, 8, 8, 0]} barSize={12} name="Acquired parcels" />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Assessed vs. disbursed (₹ lakh)" sub="Compensation, by project">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={compensationByProject}>
              <CartesianGrid stroke={LINE} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: INK }} axisLine={{ stroke: LINE }} interval={0} angle={-20} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 12, fill: INK }} axisLine={{ stroke: LINE }} />
              <Tooltip contentStyle={{ fontFamily: "Poppins", fontSize: 12, border: `1px solid ${LINE}`, borderRadius: 10 }} />
              <Bar dataKey="assessed" stackId="c" fill={LINE} name="Assessed" radius={[8, 8, 0, 0]} />
              <Bar dataKey="disbursed" stackId="c" fill={GOLD} name="Disbursed" />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Affected families" sub="Rehabilitation status">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={familiesData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
                <Cell fill={MOSS} />
                <Cell fill={LINE} />
              </Pie>
              <Tooltip contentStyle={{ fontFamily: "Poppins", fontSize: 12, border: `1px solid ${LINE}`, borderRadius: 10 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      {/* Predictive delay flags */}
      <div className="card-surface mt-8 p-6">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">Predictive analytics (heuristic)</p>
        <h3 className="mt-1 font-display text-lg text-ink">Projects likely to slip their SLA</h3>
        <p className="mt-1 text-sm text-[#6c757d]">
          Average historical delay per stage × remaining stages — a stand-in for the
          scikit-learn delay-prediction microservice.
        </p>
        <div className="mt-4 space-y-3">
          {delayFlags.map((f, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-line bg-[#fff8ec] p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f39c12]/15 text-[#f39c12]">
                <AlertTriangle className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">
                  {f.projectId} · {f.stage} — likely delay of {f.predictedDelayDays} days
                  <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold uppercase text-ink-soft">{f.confidence} confidence</span>
                </p>
                <p className="mt-0.5 text-sm text-[#6c757d]">{f.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
