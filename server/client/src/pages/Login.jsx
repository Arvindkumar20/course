import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api/auth.api-service";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const loginUser = async () => {
    try {
      const res = await loginAPI(loginData);
      if (res.data.status == 200) {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            name: res.data.user.name,
            email: res.data.user.email,
            token: res.data.user.token,
          }),
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      setErrorMsg(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    loginUser();
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        {errorMsg && (
          <p
            className="text-red-500"
            style={{
              color: "red",
            }}
          >
            {errorMsg}
          </p>
        )}
        <input
          type="email"
          onChange={(e) =>
            setLoginData((pre) => {
              return { ...pre, email: e.target.value };
            })
          }
        />
        <input
          type="password"
          onChange={(e) =>
            setLoginData((pre) => {
              return { ...pre, password: e.target.value };
            })
          }
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
      <p>
        I don't have an account <Link to={"/register"}>Sign Up</Link>
      </p>
    </>
  );
};
