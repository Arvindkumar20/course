import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import UserList from "./pages/UserList";

export const App = () => {
  const [theme, setTheme] = useState(true); //true=>light false=>dark

  const handleTheme = () => {
    setTheme(!theme);
  };

  return (
    <div
      className=""
      style={{
        background: theme ? "black" : "white",
        color: theme ? "white" : "black",
      }}
    >
      <Navbar theme={theme} handleTheme={handleTheme} />

      <UserList />

      <div className="h-screen"></div>
    </div>
  );
};
