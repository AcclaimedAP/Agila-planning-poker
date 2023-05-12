import './style/style.css';

import { io } from "socket.io-client";
import { renderTaskToVoteOn } from "./modules/taskToVoteOn";
import { createLoginForm } from "./modules/loginForm";
import { ITask } from "./models/ITask";
import { createVoteCards } from "./modules/voteCards";
import { IUser } from "./models/IUser";
import { renderCompletedVotesContainer } from "./modules/completedVotes";
import { getCurrentUser } from './modules/taskToVoteOn';

export const socket = io('http://localhost:3000');
export const app: HTMLElement | null = document.getElementById('app');
export let connectedUsers: IUser[] = []
const renderedTasksContainer = document.querySelector('.login-and-rendered-tasks');
const voteCardsContainer = document.querySelector('.votecards');
const completedTasksContainer = document.querySelector('.completed-tasks');

sessionStorage.clear();

socket.on('connect', () => {
  console.log('connected', socket.id);
  
  socket.on('user-connect', (users) => {
    connectedUsers = users;
    getCurrentUser(users);
    console.log("connectedUsers", connectedUsers);
  });
  
  socket.on("task-to-vote-on", (task: ITask) => {
    renderedTasksContainer?.appendChild(renderTaskToVoteOn(task));
    const users = JSON.parse(sessionStorage.getItem('users') ?? "");
    voteCardsContainer?.appendChild(createVoteCards(users))
  });
  
  socket.on("completed-vote", (completedVotes) => {
    completedTasksContainer?.appendChild(renderCompletedVotesContainer(completedVotes));
  });
  
  const data = JSON.parse(sessionStorage.getItem("users") ?? "");
  voteCardsContainer?.appendChild(createVoteCards(data, false, false));
});

const topMain: HTMLElement | null = document.querySelector('.login-and-rendered-tasks');
console.log('topmain', topMain);
topMain?.appendChild(createLoginForm());
