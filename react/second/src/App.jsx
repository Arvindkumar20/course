import { useState } from "react";

import { AppRoute } from "./AppRoute";
import UseRef from "./UseRef";

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
      <UseRef/>
      <AppRoute theme={theme} handleTheme={handleTheme}/>

      <div className="h-screen"></div>
    </div>
  );
};
