import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import Home from "../pages/Home";
import Tasks from "../pages/Tasks";
import CreateTask from "../pages/CreateTask";
import SignUp from "../pages/SignUp";

export const AppRoute = () => {
  return (
    <>
      <Router>
        {/* //navbar  */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/task/create" element={<CreateTask />} />
        </Routes>
        {/* footer  */}
      </Router>
    </>
  );
};
