import { useState } from "react";

import { Routing } from "./Route";
import { ThemeContext } from "./context/ThemeContext";
import { AuthContext } from "./context/AuthContext";
import { LoginProvider } from "./context/LoginContext";
export default function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    token: "",
  });
  return (
    <div
      className="space-y-10"
      style={{
        background: theme === "light" ? "black" : "white",
        color: theme === "light" ? "white" : "black",
      }}
    >
      <ThemeContext.Provider
        value={{
          theme,
          setTheme,
        }}
      >
        <AuthContext.Provider
          value={{
            user,
            setUser,
          }}
        >
          <LoginProvider>
            <Routing />
          </LoginProvider>
        </AuthContext.Provider>

        {/* <Routing setTheme={setTheme} theme={theme} /> */}
      </ThemeContext.Provider>
    </div>
  );
}
