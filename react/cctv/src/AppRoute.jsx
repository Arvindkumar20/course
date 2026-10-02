import React from "react";
import { useAuth } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
// import ProtedtecdRoute from "./ProtedtecdRoute";
import CameraDetails from "./pages/CameraDetails";
import VehicleAlarmHistory from "./pages/VehicleAlarmHistory";
export default function AppRoute() {
  const { jsession } = useAuth();

  return (
    <div>
      <Router>
        <Routes>
          {
            <Route
              path={ "/login"}
              element={ <Login />}
            />
          }

          <Route path="/" element={<Home />} />
          <Route path="/camera-details" element={<CameraDetails />} />
          <Route path="/vehicle-alarm-history" element={<VehicleAlarmHistory />} />
          
        </Routes>
      </Router>
    </div>
  );
}
