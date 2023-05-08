import { io } from "socket.io-client";
import { createLoginForm } from "./loginForm";
import { renderAddTaskBtn } from "./modules/admin";
import { ITask } from "./models/ITask";
import { createVoteCards } from "./voteCards";

const socket = io('http://localhost:3000');
const app: HTMLElement | null = document.getElementById('app');

socket.on('connect', () => {
  console.log('connected', socket.id);
});

const users = ["Alex", "Jakob", "David", "Nathalie"];

app?.appendChild(createLoginForm());
app?.appendChild(createVoteCards(users));
socket.on("add-task", (tasks: ITask[]) => {
  console.log(tasks)
});