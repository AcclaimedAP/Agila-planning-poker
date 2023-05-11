import './style/style.css';

import { io } from "socket.io-client";

import { renderTaskToVoteOn } from "./modules/taskToVoteOn";
import { renderTaskList } from "./modules/upcomingTasksPanel";
import { createLoginForm } from "./modules/loginForm";
import { renderAddTaskBtn } from "./modules/addTask";
import { ITask } from "./models/ITask";
import { createVoteCards, createVoteCardsShowingVote } from "./voteCards";
import { userVoteSocketOn } from "./socket";
import { IVote, IUser } from "./models/IUsers";
import { renderCompletedVotesContainer } from "./modules/completedVotes";
import { getCurrentUser } from './modules/taskToVoteOn';


export const socket = io('http://localhost:3000');
export const app: HTMLElement | null = document.getElementById('app');

export let connectedUsers: IUser[] = []


socket.on('connect', () => {
  console.log('connected', socket.id);

  socket.on('user-connect', (users) => {
    connectedUsers = users;
    getCurrentUser(users);
    console.log("connectedUsers", connectedUsers);
  });

  const username = sessionStorage.getItem("username");
  if (username) {
    socket.emit("user-connect", username);
  }

  socket.on("task-to-vote-on", (task: ITask) => {
    app?.appendChild(renderTaskToVoteOn(task));
  });

  socket.on("completed-vote", (completedVotes) => {
    app?.appendChild(renderCompletedVotesContainer(completedVotes));
  });
  
    const data = JSON.parse(sessionStorage.getItem("users") ?? "");
    app?.appendChild(createVoteCards(data, false, false));
});

// app?.appendChild(createLoginForm());

app?.appendChild(renderAddTaskBtn());


app?.appendChild(createLoginForm());



