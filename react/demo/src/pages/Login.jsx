import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="h-screen container mx-auto flex items-center justify-center ">
      <div className="py-10 px-7 shadow-2xl space-y-5 bg-white text-black">
        <h2 className="text-center font-bold text-4xl my-5">Welcome Back</h2>
        <form className="space-y-3">
          <div className="grid">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="outline-none border rounded py-2 px-3"
            />
          </div>

          <div className="grid">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Your Email"
              className="outline-none border rounded py-2 px-3"
            />
          </div>
          <div className="pt-4">
            <button className="outline-none border rounded py-2 px-3 w-full">
              Login
            </button>
          </div>
        </form>
        <p className="text-center">
          I havn't account <Link to="/sign-up" className="text-blue-500">Sign up</Link>{" "}
        </p>
      </div>
    </div>
  );
}
