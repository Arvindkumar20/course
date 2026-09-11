import React from "react";

export default function Navbar({ theme, handleTheme }) {
  // const {theme}=props;
  // console.log(props);

  return (
    <>
      <header
        className="flex items-center justify-between  px-4 py-2"
        style={{
          background: theme ? "white" : "black",
          color: theme ? "black" : "white",
        }}
      >
        <div>
          logo
          <img src="" alt="" />
        </div>
        <ul className="flex items-center justify-center gap-5">
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
        </ul>
        <div className="flex items-center justify-center gap-5">
          <button>Login</button>
          <button onClick={handleTheme}>{theme ? "Dark" : "Light"}</button>
        </div>
      </header>
    </>
  );
}
