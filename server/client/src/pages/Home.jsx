import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  //   useEffect(() => {

  const loadUserData = async () => {
    let userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData || userData == null) {
      navigate("/login");
    }

    try {
      //   const res = await fetch("http://localhost:5000/api/auth/users");
      //   const result = await res.json();
      const result = await axios.get("http://localhost:5000/api/auth/users", {
        headers: {
          Authorization: `Bearer ${userData?.token}`,
        },
      });
      console.log(result);
      setUsers(result?.data?.users);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <>
      {users?.map((user) => {
        return (
          <div key={user._id}>
            <h1>{user._id}</h1>
            <h1>{user.name}</h1>
            <h1>{user.email}</h1>
          </div>
        );
      })}

      <button onClick={() => navigate("/tasks")}>Task List</button>
      <button onClick={() => navigate("/task/create")}>Add Task</button>
    </>
  );
}
