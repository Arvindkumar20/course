import React from "react";
import { useAuth } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtedtecdRoute from "./ProtedtecdRoute";
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
        </Routes>
      </Router>
    </div>
  );
}
