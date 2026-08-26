import React from "react";
import { Navbar } from "./components/layout/Navbar";
import Signup from "./pages/Signup";
import { Footer } from "./components/layout/Footer";
import { UserList } from "./pages/UserList";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Routing } from "./Route";
export default function App() {
  let msg = "Hello How are";
  return (
    <div className="space-y-10">
      <Routing/>
    </div>
  );
}
