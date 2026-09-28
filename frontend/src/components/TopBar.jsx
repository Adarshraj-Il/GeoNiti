import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Landmark, Search, ChevronDown, Globe, Phone, LogOut } from "lucide-react";
import { useRole } from "../context/RoleContext";
import { useAuth } from "../context/AuthContext";

const TABS = [
  { to: "/", label: "Home", end: true },
  { to: "/records", label: "Digital Records" },
  { to: "/map", label: "GIS Maps" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/process", label: "e-Process" },
  { to: "/support", label: "Support" },
];

export default function TopBar() {
  const { role } = useRole();
  const { user, logout } = useAuth();
  const [roleOpen, setRoleOpen] = useState(false);

  return (
    <header>
      {/* Top government bar */}
      <div className="bg-gradient-primary text-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-2 text-[0.85rem]">
          <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-medium">
            <span className="font-dev">भारत सरकार</span>
            <span className="opacity-60">|</span>
            <span>Government of India</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="flex items-center gap-1.5 text-gold hover:text-white transition-colors">
              <Globe className="h-3.5 w-3.5" /> English
            </a>
            <a href="#" className="hidden sm:flex items-center gap-1.5 text-gold hover:text-white transition-colors">
              हिन्दी
            </a>
            <a href="#" className="hidden md:flex items-center gap-1.5 text-gold hover:text-white transition-colors">
              <Phone className="h-3.5 w-3.5" /> Helpline: 1800-111-2222
            </a>
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div className="sticky top-0 z-50 border-b-4 border-clay bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-4 px-6 py-2.5">
          <div className="flex items-center gap-3">
            <Landmark className="h-9 w-9 shrink-0 text-ink drop-shadow-sm" strokeWidth={1.5} />
            <div className="min-w-0 leading-tight">
              <p className="font-display text-[1.15rem] text-ink">Geoniti</p>
              <p className="font-dev text-[0.85rem] font-semibold text-ink-soft">जियोनिटी — राष्ट्रीय भूमि अधिग्रहण प्रणाली</p>
              <span className="mt-0.5 inline-block rounded-full bg-clay px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-white">
                Digital India Initiative
              </span>
            </div>
          </div>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {TABS.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    isActive ? "bg-clay text-white -translate-y-0.5" : "text-ink hover:bg-clay hover:text-white hover:-translate-y-0.5"
                  }`
                }
              >
                {t.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 rounded-full border border-line bg-parchment px-3 py-1.5 xl:flex">
            <Search className="h-3.5 w-3.5 text-ink-soft" />
            <input
              placeholder="Search records…"
              className="w-32 bg-transparent text-sm outline-none placeholder:text-ink-soft/60"
            />
          </div>

          {user && (
            <div className="flex items-center gap-2 rounded-full border border-ink/20 px-3 py-1.5 text-sm text-ink bg-parchment">
              <span className="hidden text-ink-soft sm:inline">Role:</span>
              <span className="font-medium">{role.label}</span>
            </div>
          )}

          {user ? (
            <div className="flex items-center gap-3 ml-2">
              <span className="text-sm font-medium text-ink bg-parchment px-3 py-1.5 rounded-full border border-line">
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-full border-[1.5px] border-red-200 bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-600 transition-all hover:bg-red-100"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink to="/login" className="rounded-full border-[1.5px] border-ink px-4 py-1.5 text-sm font-semibold text-ink transition-all hover:bg-ink hover:text-white">
                Login
              </NavLink>
              <NavLink to="/register" className="rounded-full border-[1.5px] border-clay bg-clay px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-clay-dim hover:border-clay-dim">
                Register
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile nav */}
        <nav className="flex gap-1 overflow-x-auto border-t border-line px-4 py-2 lg:hidden">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ${
                  isActive ? "bg-clay text-white" : "text-ink-soft"
                }`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
