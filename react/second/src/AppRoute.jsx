import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import UserPage from "./components/UserPage";
export default function AppRoute() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </Router>
  );
}
