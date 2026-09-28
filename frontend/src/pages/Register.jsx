import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

export default function Register() {
  const { fetchUser } = useAuth();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [state, setState] = useState("");
  const [userType, setUserType] = useState("guest");
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
        <span className="icon-tile"><UserPlus className="h-5 w-5" /></span>
        <h1 className="mt-4 font-display text-2xl text-ink">Register an implementing agency</h1>
        <p className="mt-2 text-sm text-[#6c757d]">
          Agencies file project proposals through this account. Approval is
          granted by the state nodal officer — this form only demonstrates the
          intake step.
        </p>

        {submitted ? (
          <div className="mt-6 rounded-xl border border-line bg-parchment/60 p-5">
            <p className="font-semibold text-[#27ae60]">Registration submitted.</p>
            <p className="mt-1 text-sm text-[#6c757d]">
              Your request has been queued for approval.
            </p>
            <Link to="/login" className="mt-4 inline-block text-sm font-medium text-clay hover:underline">
              Back to sign in
            </Link>
          </div>
        ) : (
          <form
            className="mt-6 space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setError("");
              try {
                const finalRoleId = userType === "officer" && roleId ? parseInt(roleId) : null;
                await api.post("/api/auth/register", { name, email, password, roleId: finalRoleId, state });
                await fetchUser();
                setSubmitted(true);
                setTimeout(() => {
                  navigate("/dashboard");
                }, 2000);
              } catch (err) {
                setError(err.response?.data?.message || "Registration failed");
              } finally {
                setLoading(false);
              }
            }}
          >
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="userType" value="guest" checked={userType === "guest"} onChange={() => setUserType("guest")} className="accent-clay" />
                <span className="text-sm font-medium text-ink">Guest / Normal User</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="userType" value="officer" checked={userType === "officer"} onChange={() => setUserType("officer")} className="accent-clay" />
                <span className="text-sm font-medium text-ink">Officer / Agency</span>
              </label>
            </div>
            
            <div>
              <label className="text-sm font-medium text-ink">{userType === 'officer' ? 'Agency / Officer Name' : 'Full Name'}</label>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={userType === 'officer' ? "e.g. Odisha PWD" : "e.g. John Doe"} className="mt-1 w-full rounded-xl border border-line bg-parchment px-4 py-2.5 text-sm outline-none focus:border-clay" />
            </div>
            
            {userType === "officer" && (
              <div>
                <label className="text-sm font-medium text-ink">State</label>
                <input value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. Odisha" className="mt-1 w-full rounded-xl border border-line bg-parchment px-4 py-2.5 text-sm outline-none focus:border-clay" />
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-ink">{userType === 'officer' ? 'Official Email' : 'Email Address'}</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={userType === 'officer' ? "e.g. nodal.officer@example.com" : "e.g. user@example.com"} className="mt-1 w-full rounded-xl border border-line bg-parchment px-4 py-2.5 text-sm outline-none focus:border-clay" />
            </div>
            
            <div>
              <label className="text-sm font-medium text-ink">Password</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" className="mt-1 w-full rounded-xl border border-line bg-parchment px-4 py-2.5 text-sm outline-none focus:border-clay" />
            </div>
            
            {userType === "officer" && roles.length > 0 && (
              <div>
                <label className="text-sm font-medium text-ink">Department / Role</label>
                <select required value={roleId} onChange={(e) => setRoleId(e.target.value)} className="mt-1 w-full rounded-xl border border-line bg-parchment px-4 py-2.5 text-sm outline-none focus:border-clay">
                  <option value="">-- Select Department --</option>
                  {roles.map(r => (
                    <option key={r.id} value={r.id}>{r.role_name}</option>
                  ))}
                </select>
              </div>
            )}
            
            <button type="submit" disabled={loading} className="btn-pill btn-pill-primary w-full justify-center">
              {loading ? "Submitting..." : (userType === 'officer' ? "Register as Officer" : "Register")}
            </button>
          </form>
        )}

        <p className="mt-6 text-sm text-ink-soft">
          Already registered?{" "}
          <Link to="/login" className="font-medium text-clay hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
