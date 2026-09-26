import { Link } from "react-router-dom";
import {
  MapPinned, FileStack, CheckCircle2, Users, Star, FolderOpen, ChartPie,
  FileText, Map, HandCoins, UserCog, ArrowRight, Megaphone, ShieldCheck,
  Zap, Bot, Smartphone, UserPlus, Download,
} from "lucide-react";
import StatCard from "../components/StatCard";
import { workflowStages } from "../data/mockData";

const QUICK_ACCESS = [
  {
    icon: FileText,
    title: "Digital Land Records",
    desc: "Access all land acquisition documents, notifications, and compensation records with version control and audit trails.",
    to: "/records",
    linkLabel: "Explore Records",
  },
  {
    icon: Map,
    title: "GIS Integrated Maps",
    desc: "Interactive cadastral maps with real-time project boundaries, ownership details, and acquisition status overlays.",
    to: "/map",
    linkLabel: "Open Map View",
  },
  {
    icon: HandCoins,
    title: "e-Compensation & Awards",
    desc: "Automated calculation of compensation, digital award generation, and direct benefit transfer tracking system.",
    to: "/dashboard",
    linkLabel: "Track Compensation",
  },
  {
    icon: UserCog,
    title: "Stakeholder Dashboard",
    desc: "Role-based dashboards for district collectors, project officers, landowners, and the general public.",
    to: "/dashboard",
    linkLabel: "Access Dashboard",
  },
];

const FEATURES = [
  { icon: ShieldCheck, title: "Secure & Transparent", desc: "Tamper-evident document integrity and complete audit trails for all transactions." },
  { icon: Zap, title: "Real-time Processing", desc: "Instant updates and notifications at every stage of the acquisition process." },
  { icon: Bot, title: "AI-Powered Analytics", desc: "Predictive insights and decision support for land acquisition planning." },
  { icon: Smartphone, title: "Mobile Accessibility", desc: "Access services on-the-go with a mobile-responsive design and SMS updates." },
];

export default function Home() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-primary relative overflow-hidden px-6 py-16 text-white">
        <div className="float-blob pointer-events-none absolute -right-24 -top-40 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(184,134,11,0.25)_0%,transparent_70%)]" />
        <div className="float-blob-reverse pointer-events-none absolute -bottom-32 -left-20 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_70%)]" />

        <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur">
              <Star className="h-4 w-4 text-gold" /> Transforming Land Acquisition
            </span>
            <h1 className="text-gradient-gold font-display text-[2.5rem] leading-[1.15] sm:text-[2.9rem]">
              Real-Time National Land Acquisition &amp; Management System
            </h1>
            <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-white/90">
              End-to-end digital platform for transparent, paperless, and efficient
              land acquisition monitoring with decision support for all stakeholders.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/records" className="btn-pill btn-pill-primary">
                <FolderOpen className="h-4 w-4" /> Explore Digital Files
              </Link>
              <Link to="/dashboard" className="btn-pill btn-pill-outline">
                <ChartPie className="h-4 w-4" /> View Dashboard
              </Link>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-5">
            <StatCard icon={MapPinned} value="1,24,560" label="Acres Monitored" />
            <StatCard icon={FileStack} value="4,892" label="Active Cases" />
            <StatCard icon={CheckCircle2} value="98.7%" label="Digital Compliance" />
            <StatCard icon={Users} value="2.3L+" label="Beneficiaries" />
          </div>
        </div>
      </section>

      {/* Announcement bar */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-[#f39c12] to-[#e67e22] px-6 py-3.5 text-white">
        <span className="pulse-badge grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#e67e22]">
          <Megaphone className="h-4 w-4" />
        </span>
        <p className="flex-1 text-sm font-medium sm:text-base">
          <strong>Latest Update:</strong> New digital compensation module launched for faster processing
          <span className="mx-2 hidden sm:inline">|</span>
          <span className="block sm:inline"><strong>District Land Acquisition Portal</strong> now live in 28 states</span>
        </p>
        <Link to="/support" className="hidden shrink-0 items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold hover:bg-white/30 sm:flex">
          Read More <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Quick Access */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 text-center">
            <h2 className="font-display text-[2rem] text-ink">Key Services &amp; Modules</h2>
            <p className="mt-2 text-[1.05rem] text-[#6c757d]">Access digital tools and services for land acquisition</p>
            <div className="bg-gradient-accent mx-auto mt-4 h-1 w-20 rounded-full" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK_ACCESS.map((c) => (
              <div key={c.title} className="card-surface p-7">
                <div className="icon-tile mb-5">
                  <c.icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mb-2 font-display text-lg text-ink">{c.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-[#6c757d]">{c.desc}</p>
                <Link to={c.to} className="inline-flex items-center gap-2 text-sm font-semibold text-clay hover:gap-3 transition-all">
                  {c.linkLabel} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] px-6 py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <h2 className="font-display text-[2rem] text-ink">End-to-End Digital Workflow</h2>
            <p className="mt-2 text-[1.05rem] text-[#6c757d]">Streamlined process from filing to possession</p>
            <div className="bg-gradient-accent mx-auto mt-4 h-1 w-20 rounded-full" />
          </div>

          <div className="relative flex flex-wrap justify-between gap-6">
            <div className="absolute left-0 right-0 top-[30px] hidden h-[3px] bg-gradient-to-r from-clay via-gold to-clay sm:block" />
            {workflowStages.map((s) => (
              <div key={s.key} className="group relative z-10 min-w-[160px] flex-1 text-center">
                <div className="mx-auto mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-full border-[3px] border-clay bg-white font-display text-xl text-clay shadow-md transition-all group-hover:bg-clay group-hover:text-white group-hover:scale-110">
                  {s.number}
                </div>
                <h4 className="mb-1 font-semibold text-ink">{s.title}</h4>
                <p className="text-sm text-[#6c757d]">{s.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/process" className="inline-flex items-center gap-2 text-sm font-semibold text-clay hover:underline">
              Walk through the full process <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <h2 className="font-display text-[2rem] text-ink">Why Choose Our Platform</h2>
            <p className="mt-2 text-[1.05rem] text-[#6c757d]">Built for transparency, efficiency, and citizen empowerment</p>
            <div className="bg-gradient-accent mx-auto mt-4 h-1 w-20 rounded-full" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex gap-5 rounded-2xl bg-[#f8f9fa] p-6 transition-all hover:translate-x-2 hover:bg-white hover:shadow-lg">
                <div className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl bg-ink">
                  <f.icon className="h-6 w-6 text-white" strokeWidth={1.75} />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-ink">{f.title}</h4>
                  <p className="text-sm text-[#6c757d]">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-primary relative overflow-hidden px-6 py-16 text-center">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(184,134,11,0.12)_0%,transparent_60%)]" />
        <div className="relative z-10">
          <h2 className="font-display text-[2.2rem] text-white">Ready to Transform Land Acquisition?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Join thousands of stakeholders already benefiting from digital transparency
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register" className="btn-pill btn-pill-primary">
              <UserPlus className="h-4 w-4" /> Register Now
            </Link>
            <Link to="/support" className="btn-pill btn-pill-outline">
              <Download className="h-4 w-4" /> Download Guidelines
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
