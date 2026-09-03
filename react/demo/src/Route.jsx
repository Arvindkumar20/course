import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import Signup from "./pages/Signup";
import { UserList } from "./pages/UserList";
import { User } from "./pages/User";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import { UseEffect } from "./pages/UseEffect";
import { Hooks } from "./pages/Hooks";
import Memoization from "./pages/Memoization";

export const Routing = () => {
  // export const Routing = ({ theme, setTheme }) => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Navbar />
      {/* <UseEffect user={user}/> */}
      {/* <Hooks/> */}
      <Memoization/>

      {/* <Navbar theme={theme} setTheme={setTheme} /> */}
      <Routes>
        {/* <Route path="/" element={<UserList theme={theme} />} />
        <Route path="/sign-up" element={<Signup theme={theme} />} />
        <Route path="/user/:id" element={<User theme={theme} />} /> */}
        <Route path="/" element={<UserList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<p>Dashboard</p>} />
        <Route
          path="/sign-up"
          element={user.token ? <UserList /> : <Signup />}
        />
        <Route path="/user/:id" element={<User />} />
      </Routes>
      <Footer message={"khh"} />
    </Router>
  );
};
