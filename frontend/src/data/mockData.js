// Seed data for the SIH 2026 prototype (PS ID 26016).
// In production this would come from the Project/LandParcel/Award services
// via the API Gateway — here it stands in for that layer so every screen
// has something real to render against.

export const STATUS_COLORS = {
  proposed: "#1a5276",
  notified: "#f39c12",
  awarded: "#b8860b",
  possessed: "#27ae60",
};

export const STATUS_LABELS = {
  proposed: "Proposed",
  notified: "Notified (3A)",
  awarded: "Award declared",
  possessed: "Possession taken",
};

export const projects = [
  {
    id: "PRJ-2026-0113",
    name: "NH-44 Bypass Widening, Phase II",
    state: "Uttarakhand",
    district: "Dehradun",
    agency: "National Highways Authority",
    category: "Highway",
    status: "possessed",
    startDate: "2025-11-02",
    targetDate: "2026-08-15",
    parcelsTotal: 84,
    parcelsPossessed: 61,
    compensationAssessed: 42_30_00_000,
    compensationDisbursed: 33_10_00_000,
    familiesAffected: 146,
    familiesRehabilitated: 98,
  },
  {
    id: "PRJ-2026-0087",
    name: "Renukoot Industrial Corridor",
    state: "Uttar Pradesh",
    district: "Sonbhadra",
    agency: "UP State Industrial Dev. Authority",
    category: "Industrial",
    status: "awarded",
    startDate: "2025-09-18",
    targetDate: "2026-12-01",
    parcelsTotal: 212,
    parcelsPossessed: 40,
    compensationAssessed: 118_00_00_000,
    compensationDisbursed: 52_00_00_000,
    familiesAffected: 390,
    familiesRehabilitated: 120,
  },
  {
    id: "PRJ-2026-0154",
    name: "Krishna Barrage Canal Extension",
    state: "Telangana",
    district: "Nalgonda",
    agency: "Irrigation & CAD Dept.",
    category: "Irrigation",
    status: "notified",
    startDate: "2026-01-05",
    targetDate: "2027-03-30",
    parcelsTotal: 156,
    parcelsPossessed: 0,
    compensationAssessed: 71_50_00_000,
    compensationDisbursed: 4_00_00_000,
    familiesAffected: 210,
    familiesRehabilitated: 6,
  },
  {
    id: "PRJ-2026-0201",
    name: "Dholera Solar Park, Block C",
    state: "Gujarat",
    district: "Ahmedabad",
    agency: "Gujarat Power Corp.",
    category: "Energy",
    status: "notified",
    startDate: "2026-02-14",
    targetDate: "2027-01-20",
    parcelsTotal: 97,
    parcelsPossessed: 0,
    compensationAssessed: 54_00_00_000,
    compensationDisbursed: 0,
    familiesAffected: 88,
    familiesRehabilitated: 0,
  },
  {
    id: "PRJ-2026-0042",
    name: "Cuttack Ring Road Extension",
    state: "Odisha",
    district: "Cuttack",
    agency: "Odisha PWD",
    category: "Highway",
    status: "proposed",
    startDate: "2026-03-01",
    targetDate: "2027-06-15",
    parcelsTotal: 63,
    parcelsPossessed: 0,
    compensationAssessed: 0,
    compensationDisbursed: 0,
    familiesAffected: 51,
    familiesRehabilitated: 0,
  },
  {
    id: "PRJ-2026-0176",
    name: "Guwahati Metro Depot Land",
    state: "Assam",
    district: "Kamrup",
    agency: "Assam Urban Infra. Corp.",
    category: "Transit",
    status: "awarded",
    startDate: "2025-12-10",
    targetDate: "2026-11-05",
    parcelsTotal: 34,
    parcelsPossessed: 9,
    compensationAssessed: 29_00_00_000,
    compensationDisbursed: 11_00_00_000,
    familiesAffected: 47,
    familiesRehabilitated: 15,
  },
];

// LandParcel.geom stand-ins — lat/lng points (would be PostGIS polygons)
export const parcels = [
  { id: "P-11029", projectId: "PRJ-2026-0113", khasra: "112/4", district: "Dehradun", state: "Uttarakhand", lat: 30.3165, lng: 78.0322, area: 1.8, status: "possessed", owner: "Suresh Rawat" },
  { id: "P-11030", projectId: "PRJ-2026-0113", khasra: "112/5", district: "Dehradun", state: "Uttarakhand", lat: 30.3298, lng: 78.0455, area: 0.9, status: "possessed", owner: "Meena Bisht" },
  { id: "P-11035", projectId: "PRJ-2026-0113", khasra: "118/2", district: "Dehradun", state: "Uttarakhand", lat: 30.3402, lng: 78.0601, area: 2.4, status: "awarded", owner: "Anil Thapliyal" },
  { id: "P-08820", projectId: "PRJ-2026-0087", khasra: "44/1", district: "Sonbhadra", state: "Uttar Pradesh", lat: 24.6820, lng: 83.0570, area: 3.1, status: "awarded", owner: "Ram Bahadur" },
  { id: "P-08821", projectId: "PRJ-2026-0087", khasra: "44/2", district: "Sonbhadra", state: "Uttar Pradesh", lat: 24.6905, lng: 83.0651, area: 1.5, status: "notified", owner: "Geeta Devi" },
  { id: "P-08825", projectId: "PRJ-2026-0087", khasra: "51/1", district: "Sonbhadra", state: "Uttar Pradesh", lat: 24.7011, lng: 83.0788, area: 2.0, status: "proposed", owner: "Vinod Kumar" },
  { id: "P-15401", projectId: "PRJ-2026-0154", khasra: "9/3", district: "Nalgonda", state: "Telangana", lat: 17.0575, lng: 79.2685, area: 1.2, status: "notified", owner: "K. Ramulu" },
  { id: "P-15402", projectId: "PRJ-2026-0154", khasra: "9/4", district: "Nalgonda", state: "Telangana", lat: 17.0641, lng: 79.2792, area: 1.6, status: "proposed", owner: "S. Lakshmi" },
  { id: "P-20105", projectId: "PRJ-2026-0201", khasra: "6/1", district: "Ahmedabad", state: "Gujarat", lat: 22.2531, lng: 72.1889, area: 4.0, status: "notified", owner: "Bharat Patel" },
  { id: "P-20106", projectId: "PRJ-2026-0201", khasra: "6/2", district: "Ahmedabad", state: "Gujarat", lat: 22.2609, lng: 72.1975, area: 2.7, status: "proposed", owner: "Rekha Patel" },
  { id: "P-00421", projectId: "PRJ-2026-0042", khasra: "3/2", district: "Cuttack", state: "Odisha", lat: 20.4707, lng: 85.8830, area: 1.1, status: "proposed", owner: "Debendra Sahoo" },
  { id: "P-17601", projectId: "PRJ-2026-0176", khasra: "22/1", district: "Kamrup", state: "Assam", lat: 26.1284, lng: 91.6971, area: 0.7, status: "awarded", owner: "Bimal Das" },
  { id: "P-17602", projectId: "PRJ-2026-0176", khasra: "22/2", district: "Kamrup", state: "Assam", lat: 26.1352, lng: 91.7089, area: 0.5, status: "possessed", owner: "Nita Baruah" },
];

export const documents = [
  { id: "DOC-8831", projectId: "PRJ-2026-0113", type: "Section 3A Notification", version: 2, uploadedBy: "District Collector, Dehradun", uploadedAt: "2025-11-20", status: "final" },
  { id: "DOC-8832", projectId: "PRJ-2026-0113", type: "Award Order", version: 1, uploadedBy: "Land Acquisition Officer", uploadedAt: "2026-02-04", status: "final" },
  { id: "DOC-8840", projectId: "PRJ-2026-0087", type: "Section 3A Notification", version: 1, uploadedBy: "District Collector, Sonbhadra", uploadedAt: "2025-10-02", status: "final" },
  { id: "DOC-8841", projectId: "PRJ-2026-0087", type: "Cadastral Survey Report", version: 3, uploadedBy: "Field Verification Unit", uploadedAt: "2026-01-18", status: "under review" },
  { id: "DOC-8855", projectId: "PRJ-2026-0154", type: "Draft Notification", version: 1, uploadedBy: "Irrigation & CAD Dept.", uploadedAt: "2026-01-05", status: "under review" },
  { id: "DOC-8860", projectId: "PRJ-2026-0201", type: "Environmental Clearance", version: 1, uploadedBy: "Gujarat Power Corp.", uploadedAt: "2026-02-14", status: "final" },
  { id: "DOC-8871", projectId: "PRJ-2026-0176", type: "Award Order", version: 2, uploadedBy: "Land Acquisition Officer", uploadedAt: "2026-01-30", status: "final" },
  { id: "DOC-8880", projectId: "PRJ-2026-0042", type: "Project Proposal", version: 1, uploadedBy: "Odisha PWD", uploadedAt: "2026-03-01", status: "under review" },
];

export const workflowStages = [
  {
    key: "filing",
    number: 1,
    title: "Digital filing",
    description: "Implementing agency submits the project proposal with a draft land requirement and a rough boundary drawn on the map.",
    owner: "Project Implementing Agency",
    slaDays: 7,
  },
  {
    key: "verification",
    number: 2,
    title: "Verification",
    description: "District authority verifies parcel details against cadastral records; field officers confirm boundaries on the ground.",
    owner: "District Authority",
    slaDays: 21,
  },
  {
    key: "notification",
    number: 3,
    title: "Notification",
    description: "State government approves and the system auto-generates the Section 3A-equivalent notification with sequential numbering.",
    owner: "State Government",
    slaDays: 30,
  },
  {
    key: "award",
    number: 4,
    title: "Award & compensation",
    description: "Compensation is calculated, the award is declared, and disbursement is tracked through to bank transfer.",
    owner: "Land Acquisition Officer",
    slaDays: 45,
  },
  {
    key: "possession",
    number: 5,
    title: "Possession & R&R",
    description: "Possession is recorded on the map and affected families' rehabilitation milestones are logged and tracked.",
    owner: "District Authority + R&R Cell",
    slaDays: 60,
  },
];

export const funnelData = [
  { stage: "Proposed", count: 612 },
  { stage: "Notified", count: 487 },
  { stage: "Awarded", count: 301 },
  { stage: "Possessed", count: 214 },
];

export const stateProgress = [
  { state: "Uttarakhand", acquired: 61, target: 84 },
  { state: "Uttar Pradesh", acquired: 40, target: 212 },
  { state: "Telangana", acquired: 0, target: 156 },
  { state: "Gujarat", acquired: 0, target: 97 },
  { state: "Odisha", acquired: 0, target: 63 },
  { state: "Assam", acquired: 9, target: 34 },
];

export const compensationByProject = projects.map((p) => ({
  name: p.id,
  assessed: Math.round(p.compensationAssessed / 100000), // in lakh
  disbursed: Math.round(p.compensationDisbursed / 100000),
}));

export const familiesData = [
  { name: "Rehabilitated", value: projects.reduce((s, p) => s + p.familiesRehabilitated, 0) },
  { name: "Pending", value: projects.reduce((s, p) => s + (p.familiesAffected - p.familiesRehabilitated), 0) },
];

// Heuristic "predictive delay" — average historical slippage per stage x
// remaining stages. Stands in for the scikit-learn microservice mentioned
// in the architecture doc.
export const delayFlags = [
  { projectId: "PRJ-2026-0087", stage: "Award & compensation", predictedDelayDays: 18, confidence: "Medium", reason: "Verification stage overran SLA by 12 days; two prior projects in Sonbhadra slipped at the same stage." },
  { projectId: "PRJ-2026-0154", stage: "Notification", predictedDelayDays: 9, confidence: "Low", reason: "On track, but district has an average 9-day filing backlog this quarter." },
  { projectId: "PRJ-2026-0042", stage: "Verification", predictedDelayDays: 26, confidence: "High", reason: "Field verification team in Cuttack currently assigned to 2 other active projects." },
];

export const roles = [
  { id: "central", label: "Central Ministry (DoLR)" },
  { id: "state", label: "State Government" },
  { id: "district", label: "District Authority" },
  { id: "agency", label: "Implementing Agency" },
  { id: "field", label: "Field Officer" },
];

export const auditLog = [
  { id: 1, actor: "D. Sharma (District Collector, Dehradun)", action: "Marked parcel P-11030 as possessed", timestamp: "2026-09-10 14:22" },
  { id: 2, actor: "System", action: "Auto-generated Section 3A notification DOC-8855", timestamp: "2026-09-09 09:03" },
  { id: 3, actor: "R. Iyer (LAO, Sonbhadra)", action: "Updated compensation amount for parcel P-08820", timestamp: "2026-09-08 17:45" },
  { id: 4, actor: "System", action: "SLA breach alert fired for PRJ-2026-0042 — Verification stage", timestamp: "2026-09-07 06:00" },
  { id: 5, actor: "A. Verma (Field Officer, Kamrup)", action: "Uploaded geo-tagged possession photo for P-17601", timestamp: "2026-09-05 11:12" },
];
