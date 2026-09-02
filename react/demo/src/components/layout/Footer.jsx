import { Link } from "react-router-dom";

export const Footer = ({ message, theme }) => {
  return (
    <>
      <div
        className="py-5"
        style={{
          background: theme === "light" ? "white" : "black",
          color: theme === "light" ? "black" : "white",
        }}
      >
        <footer className="container mx-auto  flex items-center justify-between">
          <div>logo</div>
          <div>menu items</div>
          <div>contact detail</div>
          <p>{message}</p>
          <Link to={"/sign-up"}>Sign up</Link>
        </footer>
      </div>
    </>
  );
};
