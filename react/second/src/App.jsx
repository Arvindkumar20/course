import { useState } from "react";

import { AppRoute } from "./AppRoute";
import UseRef from "./UseRef";
import Cart from "./pages/Cart";

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
      {/* <UseRef/> */}
      <Cart/>
      <AppRoute theme={theme} handleTheme={handleTheme}/>

      <div className="h-screen"></div>
    </div>
  );
};
