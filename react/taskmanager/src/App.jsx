import React, { useState } from "react";
import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";
import { taskData } from "./data/taskData.js";

export default function App() {
  // const [tasks, setTasks] = useState(taskData);

  return (
    <div>
      {/* <TaskForm tasks={tasks} setTasks={setTasks} /> */}
      <TaskForm  />
      <TaskList  />
    </div>
  );
}
