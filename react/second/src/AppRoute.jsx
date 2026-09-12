import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import UserList from "./pages/UserList";
import UserPage from "./components/UserPage";

export const AppRoute = ({ theme, handleTheme }) => {
  return (
    <Router>
      <Navbar theme={theme} handleTheme={handleTheme} />
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/user/:id/:name/:email" element={<UserPage />} />
      </Routes>
    </Router>
  );
};
