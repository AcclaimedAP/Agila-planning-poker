import './style/style.css';

import { io } from "socket.io-client";
import { renderTaskToVoteOn } from "./modules/taskToVoteOn";
import { createLoginForm } from "./modules/loginForm";
import { renderAddTaskBtn } from "./modules/addTask";
import { ITask } from "./models/ITask";
import { createVoteCards } from "./voteCards";
import { IUser } from "./models/IUser";
import { renderCompletedVotesContainer } from "./modules/completedVotes";
import { getCurrentUser } from './modules/taskToVoteOn';

export const socket = io('http://localhost:3000');
export const app: HTMLElement | null = document.getElementById('app');
export let connectedUsers: IUser[] = []

sessionStorage.clear();

socket.on('connect', () => {
  console.log('connected', socket.id);

  socket.on('user-connect', (users) => {
    connectedUsers = users;
    getCurrentUser(users);
    console.log("connectedUsers", connectedUsers);
  });

  socket.on("task-to-vote-on", (task: ITask) => {
    app?.appendChild(renderTaskToVoteOn(task));
    const users = JSON.parse(sessionStorage.getItem('users') ?? "");
    app?.appendChild(createVoteCards(users))
  });

  socket.on("completed-vote", (completedVotes) => {
    app?.appendChild(renderCompletedVotesContainer(completedVotes));
  });
  
    const data = JSON.parse(sessionStorage.getItem("users") ?? "");
    app?.appendChild(createVoteCards(data, false, false));
});

app?.appendChild(renderAddTaskBtn());
app?.appendChild(createLoginForm());
