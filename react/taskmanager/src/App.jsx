import { useState } from "react";
import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";
import { taskData } from "./data/taskData";
import TaskEditForm from "./pages/TaskEditForm";

export default function App() {
  const [tasks, setTasks] = useState(taskData);
  // const [taskId, setTaskId] = useState(taskData);
  const [isEditable, setEdibale] = useState(null);

  const handleSubmit = (data) => {
    setTasks((pre) => [...pre, { ...data, id: pre.length + 1 }]);
  };
  const handleDelete = (id) => {
    const newTasks = tasks.filter((task) => task.id != id);
    setTasks(newTasks);
  };

  const handleEdit = (id) => {
    const task = tasks.filter((task) => task.id == id)[0];
    setEdibale(task);
  };
  // const onEdit = (data) => {};

  return (
    <div>
      {/* <TaskForm tasks={tasks} setTasks={setTasks} /> */}
      {isEditable == null && (
        <TaskForm createTask={handleSubmit} editableTask={isEditable} />
      )}
      {/* {isEditable != null && (
        <TaskEditForm onEdit={onEdit} editableTask={isEditable} />
      )} */}
      <TaskList
        tasks={tasks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}
