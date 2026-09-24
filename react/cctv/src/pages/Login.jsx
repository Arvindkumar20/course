import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  //   const [name, setName] = useState("");
  //   const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState({
    name: "",
    password: "",
  });
  const [credencials, setCredencials] = useState({});
  const [isLoding, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [succseMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    // user["name"]

    const key = e.target.name;
    setLoginData((pre) => {
      return { ...pre, [key]: e.target.value };
    });
  };
  // http://chinamdvr.com:8088/StandardApiAction_login.action?account=cmsv6&password=cmsv6

  const handleLogin = async (data) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/StandardApiAction_login.action?account=${data.name}&password=${data.password}`,
      );
      return res;
    } catch (error) {
      console.log(error);
      setErrorMsg(error.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let result = await handleLogin(loginData);
    console.log(result);
    if (
      result.data.message == "Username or password incorrect!" ||
      result.data.result == 1
    ) {
      setErrorMsg(result.data.message);
    } else {
      setCredencials(result.data);
      setSuccessMsg("logginde succefully");
    }
    setIsLoading(false);
    setTimeout(() => {
      setErrorMsg("");
      setSuccessMsg("");
    }, 3000);
  };

  return (
    <div className="container mx-auto flex items-center justify-center my-20">
      <div className="grid space-y-5 p-10 shadow-2xl rounded-xl w-full md:w-1/2 xl:w-1/3">
        <h2 className="font-bold text-center text-2xl"> Welcome Back</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid space-y-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="name"
              id="name"
              name="name"
              className="py-2 px-3 outline-none border rounded"
              required
              onChange={handleChange}
            />
          </div>
          <div className="grid space-y-2">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password"
              className="py-2 px-3 outline-none border rounded"
              id="password"
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          {errorMsg != "" && <p className="text-red-500">{errorMsg}</p>}
          {succseMsg != "" && <p className="text-green-500">{succseMsg}</p>}
          <div className="mt-10">
            <button
              className={`py-2 bg-blue-500 text-white ${isLoding ? "cursor-not-allowed" : "cursor-pointer"} rounded border w-full`}
              type="submit"
            >
              {isLoding ? "submiting..." : " Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
