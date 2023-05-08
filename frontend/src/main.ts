import { io } from "socket.io-client";
import { createLoginForm } from "./loginForm";
import { renderAddTaskBtn } from "./modules/admin";
import { ITask } from "./models/ITask";

const socket = io('http://localhost:3000');
const app: HTMLElement | null = document.getElementById('app');

socket.on('connect', () => {
  console.log('connected', socket.id);
});

app?.appendChild(createLoginForm());

socket.on("add-task", (tasks: ITask[]) => {
  console.log(tasks)
});