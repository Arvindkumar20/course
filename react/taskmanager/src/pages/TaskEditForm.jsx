import React, { useState } from "react";
import { taskData } from "../data/taskData.js";

export default function TaskEditForm({ onEdit, editableTask }) {
  const [task, setTask] = useState(editableTask?.task );
  const [title, setTitle] = useState(editableTask?.title );
  const [description, setDescription] = useState(
    editableTask?.description ,
  );
  console.log(task)
  const [isSubmiting, setSubmiting] = useState(false);

  const handleTaskChange = (e) => setTask(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

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
