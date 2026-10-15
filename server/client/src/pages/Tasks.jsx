import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteTaskAPI,
  loadAllTaskAPI,
  updateTaskAPI,
} from "../services/api/task.api-service";

export default function Tasks() {
  // const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [isEditable, setIsEditable] = useState(false);
  const [taskId, setTaskId] = useState("");
  const navigate = useNavigate();
  // console.log(location);

  const loadTasks = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/api/task", {
      //   headers: {
      //     Authorization: `Bearer ${location.state.user.token}`,
      //   },
      // });

      const res = await loadAllTaskAPI();
      console.log(res.data);
      if (res.data.status == 200) {
        setTasks(res.data.tasks);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      // const res = await axios.delete(`http://localhost:5000/api/task/${id}`, {
      //   headers: {
      //     Authorization: `Bearer ${location.state.user.token}`,
      //   },
      // });
      const res = await deleteTaskAPI(id);
      if (res.data.status == 200) {
        alert("task deleted successfully");
        loadTasks();
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleUpdate = async (task) => {
    setIsEditable(true);
    setTaskId(task._id);
    setTask({
      title: task.title,
      description: task.description,
    });
  };
  const handleNavigate = () => {
    navigate("/task/create");
  };

  const saveData = async (data) => {
    try {
      // const res = await axios.put(
      //   `http://localhost:5000/api/task/${taskId}`,
      //   data,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${location.state.user.token}`,
      //     },
      //   },
      // );

      const res = await updateTaskAPI(data, taskId);
      if (res.data.status != 200) {
        alert("your task not updated");
        return null;
      }
      alert("your task updated successfully");
      setTask({
        title: "",
        description: "",
      });
      loadTasks();
      setIsEditable(false);
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
      {tasks?.length > 0 ? (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task._id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
                <button onClick={() => handleUpdate(task)}>Edit</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="grid">
          <p>No tasks Found</p>
          {/* <button onClick={handleNavigate}>Add Task +</button> */}
        </div>
      )}

      {isEditable && (
        <div className="">
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
            <button type="submit" onClick={() => setIsEditable(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <button onClick={handleNavigate}>Add Task +</button>
    </div>
  );
}
