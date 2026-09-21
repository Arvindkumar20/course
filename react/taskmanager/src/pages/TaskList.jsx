import React, { useState } from "react";
import { taskData } from "../data/taskData";


export default function TaskList({tasks}) {

  return (
    <ul>
      {taskData.map((task) => {
        <li key={task.id}>
          <h3>{task.task}</h3>
          <h3>{task.title}</h3>
          <h3>{task.description}</h3>
        </li>;
      })}
    </ul>
  );
}
