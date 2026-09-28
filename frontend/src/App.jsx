import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DigitalRecords from "./pages/DigitalRecords";
import GISMap from "./pages/GISMap";
import Dashboard from "./pages/Dashboard";
import EProcess from "./pages/EProcess";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/records" element={<ProtectedRoute><DigitalRecords /></ProtectedRoute>} />
        <Route path="/map" element={<ProtectedRoute><GISMap /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/process" element={<ProtectedRoute><EProcess /></ProtectedRoute>} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
