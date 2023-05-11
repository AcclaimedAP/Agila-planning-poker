import { ITask } from "../models/ITask";
import { app } from "../main";
import { io } from "socket.io-client";
import { createVoteCards } from "./voteCards";
import { currentUser } from "./taskToVoteOn";

const socket = io('http://localhost:3000');

export function renderTaskList(tasks: ITask[]) {
    const existingTaskList = document.getElementById("task-list");

    const taskList = existingTaskList ? existingTaskList : document.createElement("ul");
    taskList.innerHTML = "";
    taskList.id = "task-list";

    tasks.forEach((task, i) => {
        const taskItem = document.createElement("li");
        taskItem.innerText = task.taskTitle;
        taskItem.id = `task-${i}`;
        taskList.appendChild(taskItem);
        if (currentUser?.isAdmin) {
            const voteBtn = document.createElement("button");
            voteBtn.innerText = "Choose";
            voteBtn.id = `vote-${i}`;
            taskList.appendChild(voteBtn);
    
            voteBtn.addEventListener("click", (e: Event) => {
                if (e.target instanceof HTMLElement) {
                    const voteBtnId = parseInt(e.target.id.split("-")[1]);
                    const task = tasks[voteBtnId];
                    socket.emit("task-to-vote-on", task);
                    const app = document.getElementById('app') as HTMLDivElement;
                    const data = JSON.parse(sessionStorage.getItem("users") ?? "");
                    app.appendChild(createVoteCards(data, false, false));
                }
            });
        }
    });

    if (!existingTaskList) {
        app?.appendChild(taskList);
    }
}
