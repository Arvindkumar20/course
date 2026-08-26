import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Signup from "./pages/Signup";
import { UserList } from "./pages/UserList";
import { User } from "./pages/User";

export const Routing = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
      <Footer message={"khh"} />
    </Router>
  );
};
