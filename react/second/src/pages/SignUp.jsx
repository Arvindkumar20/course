import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { LuLoader } from "react-icons/lu";

export default function SignUp({ theme }) {
  const [showPassword, hidePassword] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handlePasswordVisibility = () => {
    hidePassword(!showPassword);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    console.log(name, email, password);
    setTimeout(() => {
      setEmail("");
      setName("");
      setPassword("");
      setIsSubmiting(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto flex items-center justify-center h-screen">
      <div
        className="shadow-xl border w-125 p-10 rounded"
        style={{
          background: theme ? "white" : "black",
          color: theme ? "black" : "white",
        }}
      >
        <h2 className="text-center font-bold text-2xl my-5">
          Create Your Account
        </h2>
        <form className="grid space-y-3 w-full" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 mx-auto space-y-2 w-full">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={name}
              required
              minLength={2}
              className="outline-none border rounded py-2 px-2"
              onChange={handleNameChange}
            />
          </div>

          <div className="grid grid-cols-1 mx-auto space-y-2 w-full">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              required
              minLength={8}
              className="outline-none border rounded py-2 px-2"
              onChange={handleEmailChange}
            />
          </div>
          <div className="grid grid-cols-1 mx-auto space-y-2 w-full">
            <label htmlFor="password">Password</label>
            <div className="flex items-center justify-between gap-2 border rounded px-2">
              <input
                type={showPassword ? "password" : "text"}
                placeholder="Enter your password"
                required
                minLength={2}
                name="password"
                value={password}
                className="outline-none  py-2  w-full"
                onChange={handlePasswordChange}
              />
              <button onClick={handlePasswordVisibility}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="py-2 bg-blue-600 text-white rounded mt-4 cursor-pointer flex items-center justify-center"
          >
            {!isSubmiting ? "Sign Up" : <LuLoader className="animate-spin " />}
          </button>
        </form>
      </div>
    </div>
  );
}
