import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTaskAPI } from "../services/api/task.api-service";

export default function CreateTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("userData"));
    setUser(authData);
  }, []);

  const saveData = async (data) => {
    // const authData = JSON.parse(localStorage.getItem("userData"));
    try {
      // const res = await axios.post("http://localhost:5000/api/task", data, {
      //   headers: {
      //     Authorization: `Bearer ${authData.token}`,
      //   },
      // });
      const res = await createTaskAPI(data);
      if (res.data.status != 201) {
        alert("your task not added");
        return null;
      }
      alert("your task added successfully");
      setTask({
        title: "",
        description: "",
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.title == "") {
      alert("please enter title");
      return null;
    }
    saveData(task);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="title"
          onChange={(e) =>
            setTask((pre) => {
              return { ...pre, title: e.target.value };
            })
          }
          value={task.title}
        />
        <input
          type="text"
          placeholder="description"
          onChange={(e) =>
            setTask((pre) => {
              return { ...pre, description: e.target.value };
            })
          }
          value={task.description}
        />
        <button type="submit" onClick={handleSubmit}>
          Save
        </button>
        <button
          type="button"
          onClick={() =>
            navigate("/tasks", {
              state: {
                user,
              },
            })
          }
        >
          Task List
        </button>
      </form>
    </div>
  );
}
