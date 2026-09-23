import React, { useEffect, useState } from "react";
import { taskData } from "../data/taskData.js";

export default function TaskForm({ createTask, editableTask }) {
  const [task, setTask] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [preority, setPreority] = useState("default");
  const [isSubmiting, setSubmiting] = useState(false);
  const [status, setStatus] = useState("incomplete"); 

  useEffect(() => {
    setTask(editableTask?.task);
    setTitle(editableTask?.title);
    setDescription(editableTask?.description);
    setPreority(editableTask?.setPreority);
    setStatus(editableTask?.status);
  }, [editableTask]);

  const handleTaskChange = (e) => setTask(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePreorityChange = (e) => setPreority(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);

  const handleSubmit = (e) => {
    // setSubmiting(true); not use in here
    e.preventDefault();
    setSubmiting(true);

    try {
      if (task.trim() == "" || title.trim() == "" || description.trim() == "") {
        alert("all fields are required");
        return;
      }

      createTask({
        task: task.trim(),
        title: title.trim(),
        description: description.trim(),
        preority: preority,
        status:status
      });

      console.log(taskData);
      console.log(task, title, description);

      setTimeout(() => {
        setTask("");
        setTitle("");
        setDescription("");
        setSubmiting(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("object");
      // setSubmiting(false);
      //
    }
  };
  return (
    <div className="container  md:mx-auto flex items-center justify-center my-20 ">
      <div className="bg-white shadow-xl py-8 px-10 border rounded space-y-5 w-full  lg:w-1/2">
        <h2 className="text-xl font-bold text-cente">
          Manage Your task with Tasker
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid space-y-1 ">
            <label htmlFor="task">Task</label>
            <input
              type="text"
              name="task"
              placeholder="Enter Your task"
              className="outline-none border px-3 py-2 rounded"
              onChange={handleTaskChange}
              value={task}
              required
            />
          </div>
          <div className="grid space-y-1 ">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter Your task title"
              className="outline-none border px-3 py-2 rounded"
              onChange={handleTitleChange}
              value={title}
              required
            />
          </div>
          <div className="grid space-y-1 ">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter Your task description"
              className="outline-none border px-3 py-2 rounded"
              onChange={handleDescriptionChange}
              value={description}
              required
            />
          </div>

          <div className="grid space-y-1 ">
            <label htmlFor="description">Choose preority</label>
            <select
              name="preority"
              id="preority"
              onChange={handlePreorityChange}
              className="outline-none border px-3 py-2 rounded"
            >
              <option value="default">Choose your preority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          {editableTask && (
            <div>
              {/* <label htmlFor="title">Task Status</label> */}
              <div className="flex gap-5  ">
                <label htmlFor="title">Completed</label>
                <input
                  type="radio"
                  name="status"
                  placeholder="Enter Your task title"
                  className="outline-none border px-3 py-2 rounded"
                  onChange={handleStatusChange}
                  value={"completed"}
                  required
                />
              </div>
              <div className="flex gap-5  ">
                <label htmlFor="title">In Completed</label>
                <input
                  type="radio"
                  name="status"
                  placeholder="Enter Your task title"
                  className="outline-none border px-3 py-2 rounded"
                  onChange={handleStatusChange}
                  value={"in-complete"}
                  required
                />
              </div>
              <div className="flex gap-5  ">
                <label htmlFor="title">In Progress</label>
                <input
                  type="radio"
                  name="status"
                  placeholder="Enter Your task title"
                  className="outline-none border px-3 py-2 rounded"
                  onChange={handleStatusChange}
                  value={"in-progress"}
                  required
                />
              </div>
            </div>
          )}
          <div className="w-full flex items-center justify-center">
            <button
              disabled={isSubmiting}
              className={`w-full border py-2 rounded ${isSubmiting ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isSubmiting ? "Submting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
