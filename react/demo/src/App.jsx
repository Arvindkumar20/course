import React from "react";
import { Navbar } from "./components/layout/Navbar";
import Signup from "./pages/Signup";
import { Footer } from "./components/layout/Footer";
import { UserList } from "./pages/UserList";

export default function App() {
  let msg="Hello How are";
  return (
    <div className="space-y-10">
      <Navbar />
      <div className="bg-red-500">
        <Signup className="bg-green-500" />
      </div>
      <UserList/>
      <Footer message={msg}/>
    </div>
  );
}
