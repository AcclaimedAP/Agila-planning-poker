import { ITask } from "../models/ITask";

export function renderTaskToVoteOn(task: ITask) {
    const taskToVoteOn = document.createElement("div");
    taskToVoteOn.id = "task-to-vote-on";

    taskToVoteOn.innerHTML = "";

    const taskTitle = document.createElement("h2");
    taskTitle.innerText = task.taskTitle;
    taskToVoteOn.appendChild(taskTitle);

    const taskDescription = document.createElement("p");
    taskDescription.innerText = task.taskDescription;
    taskToVoteOn.appendChild(taskDescription);

    return taskToVoteOn;
}