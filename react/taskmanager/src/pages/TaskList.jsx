import React, { useEffect, useState } from "react";

export default function TaskList({ tasks,handleDelete,handleEdit }) {
  const [view, setView] = useState("list");
  console.log(tasks);
  const handleClick = () => setView((pre) => (pre == "list" ? "grid" : "list"));
  return (
    <div className="text-black container mx-auto space-y-3">
      <div className="flex items-center justify-between">
        <h3>Task</h3>
        <button
          className="bg-blue-500 text-white py-2 px-5 rounded-2xl cursor-pointer"
          onClick={handleClick}
        >
          {view == "list" ? "Grid" : "List"}
        </button>
      </div>
      <ul
        className={
          view == "list"
            ? "text-black container mx-auto space-y-3 "
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        }
      >
        {tasks.length > 0 ? (
          tasks?.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between border py-5 px-5 rounded-2xl"
            >
              <div>
                <h3 className="font-bold"> Task : {task.task}</h3>
                <h3>Title : {task.title}</h3>
                <h3> Description : {task.description}</h3>
              </div>
              <div className="grid gap-2">
                <button
                  className="bg-red-500 text-white py-2 px-5 rounded-2xl cursor-pointer"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </button>
                <button className="bg-blue-500 text-white py-2 px-5 rounded-2xl cursor-pointer" onClick={()=>handleEdit(task.id)}>
                  Edit
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No Tasks</p>
        )}
      </ul>
    </div>
  );
}
