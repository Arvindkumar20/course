import { useState } from "react";
import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";
import { taskData } from "./data/taskData";
// import TaskEditForm from "./pages/TaskEditForm";

export default function App() {
  const [tasks, setTasks] = useState(taskData);
  const [taskId, setTaskId] = useState(taskData);
  const [isEditable, setEdibale] = useState(null);

  const handleSubmit = (data) => {
    if (isEditable) {
      const task = tasks.filter((task) => task.id == taskId);
      const newTasks = tasks.filter((task) => task.id != taskId);
      task.task = data.task;
      task.title = data.title;
      task.description = data.description;
      task.preority = data.preority;
      task.status = data.status;
      // task.status

      setTasks(() => [...newTasks, task]);
      setEdibale(null)
    } else {
      setTasks((pre) => [...pre, { ...data, id: pre.length + 1,status:"incomplete" }]);
    }
  };

  const handleDelete = (id) => {
    const newTasks = tasks.filter((task) => task.id != id);
    setTasks(newTasks);
  };

  const handleEdit = (id) => {
    const task = tasks.filter((task) => task.id == id)[0];
    setTaskId(id);
    setEdibale(task);
  };
  

  return (
    <div>

      <TaskForm createTask={handleSubmit} editableTask={isEditable} />

   
      <TaskList
        tasks={tasks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}
