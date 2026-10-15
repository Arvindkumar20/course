import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const resisterUser = async (data) => {
    if (data.name == "" || data.email == "" || data.password == "") {
      alert("please fill all fileds ");
      return null;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/sign-up",
        data,
      );

      if (res.data.status == 201) {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            name: res.data.user.name,
            email: res.data.user.email,
            token: res.data.user.token,
          }),
        );
        alert("your account created successfully");
        setSignupData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resisterUser(signupData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Enter your name"
          onChange={(e) =>
            setSignupData((pre) => {
              return { ...pre, name: e.target.value };
            })
          }
          value={signupData.name}
        />
        <input
          type="email"
          required
          placeholder="Enter your email"
          onChange={(e) =>
            setSignupData((pre) => {
              return { ...pre, email: e.target.value };
            })
          }
          value={signupData.email}
        />
        <input
          type="password"
          required
          placeholder="Enter password"
          onChange={(e) =>
            setSignupData((pre) => {
              return { ...pre, password: e.target.value };
            })
          }
          value={signupData.password}
        />
        <button type="submit">Submit</button>
      </form>
      <p>
        I have already an account <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
}
