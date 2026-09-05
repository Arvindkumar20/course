import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <div
        className=" py-5 shadow-2xl"
        style={{
          background: theme === "light" ? "white" : "black",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <header className="container mx-auto flex items-center justify-between ">
          <div>Logo</div>
          <ul className="flex items-center justify-center gap-2">
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/dashboard"}>Dashboard</Link>
            </li>
            <li><Link to={"/products"}>Products</Link></li>
            <li>home</li>
          </ul>
          {!user.token || !user.name || !user.role ? (
            <button>Login</button>
          ) : (
            <ul className="bg-white p-5">
              {user.name && <li>Name : {user.name}</li>}
              {user.email && <li>Email : {user.email}</li>}
              {user.role && <li>Role : {user.role}</li>}
              {user.token && <li>Token : {user.token}</li>}
            </ul>
          )}
          <button onClick={handleTheme}>{theme}</button>
        </header>
      </div>
    </>
  );
};
