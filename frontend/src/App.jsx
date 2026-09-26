import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DigitalRecords from "./pages/DigitalRecords";
import GISMap from "./pages/GISMap";
import Dashboard from "./pages/Dashboard";
import EProcess from "./pages/EProcess";
import Support from "./pages/Support";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/records" element={<DigitalRecords />} />
        <Route path="/map" element={<GISMap />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/process" element={<EProcess />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}
