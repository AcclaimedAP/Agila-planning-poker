import { ITask } from "../models/ITask";
import { app } from "../main";

export function renderTaskToVoteOn(task: ITask) {
    const existingVoteSection = document.getElementById("vote-section");

    const voteSection = existingVoteSection ? existingVoteSection : document.createElement("section");
    voteSection.innerHTML = "";
    voteSection.id = "vote-section";

    const taskToVoteOn = document.createElement("div");
    taskToVoteOn.id = "task-to-vote-on";
    voteSection.appendChild(taskToVoteOn);

    const taskTitle = document.createElement("h2");
    taskTitle.innerText = task.taskTitle;
    taskToVoteOn.appendChild(taskTitle);

    const taskDescription = document.createElement("p");
    taskDescription.innerText = task.taskDescription;
    taskToVoteOn.appendChild(taskDescription);

    if (!existingVoteSection) {
        app?.appendChild(voteSection);
    }

    return voteSection;
}

