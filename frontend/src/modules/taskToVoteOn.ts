import { ITask } from "../models/ITask";
import { app, getConnectedUsers } from "../main";
import { IUsers } from "../models/IUsers";

export function renderTaskToVoteOn(task: ITask) {
    console.log("task");
    
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

export function renderAdminElements(users: IUsers[]) {

    const user = sessionStorage.getItem('username');
    const connectedUsers = users;

    console.log("user", user)
    console.log("connectedUsers", connectedUsers);
    
    console.log(connectedUsers.find(connectedUser => connectedUser.username === user))
}

// const found = array1.find(element => element > 10);
