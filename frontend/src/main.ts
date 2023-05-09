import { io } from "socket.io-client";

import { renderTaskToVoteOn } from "./modules/taskToVoteOn";
import { renderTaskList } from "./modules/upcomingTasksPanel";
import { createLoginForm } from "./modules/loginForm";
import { renderAddTaskBtn } from "./modules/addTask";
import { ITask } from "./models/ITask";
import { createVoteCards, createVoteCardsShowingVote } from "./voteCards";
import { userVoteSocketOn } from "./socket";
import { IVote } from "./models/IUsers";


export const socket = io('http://localhost:3000');
export const app: HTMLElement | null = document.getElementById('app');

socket.on('connect', () => {
  console.log('connected', socket.id);
  socket.on('user-connect', (arg) => {
    console.log(arg);
    });

  const username = sessionStorage.getItem("username");
  if (username) {
    socket.emit("user-connect", username);
  }

  socket.on("task-to-vote-on", (task: ITask) => {
    app?.appendChild(renderTaskToVoteOn(task));
});
});

// app?.appendChild(createLoginForm());

app?.appendChild(renderAddTaskBtn());

const users = ["Alex", "Jakob", "David", "Nathalie"];

app?.appendChild(createLoginForm());
const testbutton = document.createElement('button') as HTMLButtonElement;
testbutton.innerHTML = "Test";

testbutton.addEventListener('click', (e) => {
  e.preventDefault();
  const votes: IVote[] = JSON.parse(sessionStorage.getItem('votes')!);
  app?.appendChild(createVoteCardsShowingVote(votes));
})
userVoteSocketOn();
app?.appendChild(testbutton);
socket.on("add-task", (tasks: ITask[]) => {
  renderTaskList(tasks)
});

