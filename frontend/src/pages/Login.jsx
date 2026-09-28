import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { KeyRound } from "lucide-react";
import api from "../api/axios";

export default function Login() {
  const { fetchUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/api/auth/roles")
      .then((res) => setRoles(res.data))
      .catch(() => {});
  }, []);
  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-16">
      <div className="card-surface p-8">
        <span className="icon-tile"><KeyRound className="h-5 w-5" /></span>
        <h1 className="mt-4 font-display text-2xl text-ink">Sign in to your case files</h1>
        <p className="mt-2 text-sm text-[#6c757d]">
          This is a prototype login — it demonstrates the role-based view rather
          than performing real authentication.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            try {
              const res = await api.post("/api/auth/login", { email, password });
              // Store user info if needed, but cookies handle auth
              console.log("Login successful:", res.data);
              await fetchUser();
              navigate("/dashboard");
            } catch (err) {
              setError(err.response?.data?.message || "Login failed");
            } finally {
              setLoading(false);
            }
          }}
        >
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          <div>
            <label className="text-sm font-medium text-ink">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. officer@example.com"
              className="mt-1 w-full rounded-xl border border-line bg-parchment px-4 py-2.5 text-sm outline-none focus:border-clay"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-ink">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="mt-1 w-full rounded-xl border border-line bg-parchment px-4 py-2.5 text-sm outline-none focus:border-clay"
            />
          </div>
          {roles.length > 0 && (
            <div>
              <label className="text-sm font-medium text-ink">Department (Optional)</label>
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="mt-1 w-full rounded-xl border border-line bg-parchment px-4 py-2.5 text-sm outline-none focus:border-clay"
              >
                <option value="">None (Guest)</option>
                {roles.map((r) => (
                  <option key={r.id} value={r.id}>{r.role_name}</option>
                ))}
              </select>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-pill btn-pill-primary w-full justify-center">
            {loading ? "Signing in..." : "Continue to dashboard"}
          </button>
        </form>

        <p className="mt-6 text-sm text-ink-soft">
          New implementing agency?{" "}
          <Link to="/register" className="font-medium text-clay hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}
