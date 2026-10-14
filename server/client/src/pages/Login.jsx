import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const loginUser = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        loginData,
      );

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
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
      setErrorMsg(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    loginUser();
    console.log(loginData);
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
    </>
  );
};
