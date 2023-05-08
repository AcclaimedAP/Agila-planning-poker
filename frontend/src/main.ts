import { io } from "socket.io-client";
import { createLoginForm } from "./loginForm";
import { renderAddTaskBtn } from "./modules/addTask";
import { renderTaskToVoteOn } from "./modules/taskToVoteOn";
import { renderTaskList } from "./modules/upcomingTasksPanel";

const socket = io('http://localhost:3000');
export const app: HTMLElement | null = document.getElementById('app');

socket.on('connect', () => {
  console.log('connected', socket.id);

  socket.on("add-task", (tasks) => {
    console.log(tasks);
    renderTaskList(tasks)
  });

  socket.on("task-to-vote-on", (task) => {
    app?.appendChild(renderTaskToVoteOn(task));
  });
});

// app?.appendChild(createLoginForm());

app?.appendChild(renderAddTaskBtn());
