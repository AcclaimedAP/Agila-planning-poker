import { io } from 'socket.io-client';
import { ITask } from "../models/ITask";
import { app } from "../main";
import { IUser } from "../models/IUsers";
import { IVotedOnTask } from "../models/IVotedOnTask";
const socket = io(`localhost:3000`);

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

    if(currentUser?.isAdmin){
        const doneBtn = document.createElement('button');
        doneBtn.innerText = 'Done'

        doneBtn.addEventListener('click', () => {
          doneVote(taskTitle.innerText, taskDescription.innerText, decidedStoryPointsInput.value);
        });

        const decidedStoryPointsInput = document.createElement('input');
        decidedStoryPointsInput.placeholder = 'Decided Story Points';
        decidedStoryPointsInput.type = 'number';
        decidedStoryPointsInput.id = 'decidedStoryPointsInput';


        taskToVoteOn.append(decidedStoryPointsInput, doneBtn);
  }

    if (!existingVoteSection) {
        app?.append(voteSection);
    }

    return voteSection;
}

export function getCurrentUser(users: IUser[]) {

    const user = sessionStorage.getItem('username');
    const connectedUsers = users;
    currentUser = connectedUsers.find(connectedUser => connectedUser.username === user);
}

let currentUser: IUser | undefined

/* export function renderAdminElements() :HTMLButtonElement | undefined{
    if(currentUser?.isAdmin){
          const doneBtn = document.createElement('button');
          doneBtn.innerText = 'Done'

          doneBtn.addEventListener('click', () => {
            doneVote();
          });

          return doneBtn;
    }
    return undefined;
} */

function doneVote(title: string, description: string, points: any) {

    const completedVote: IVotedOnTask = {
        taskTitle: title,
        taskDescription: description,
        storyPoints: parseInt(points)
    }
    socket.emit('completed-vote', completedVote);
}

// const found = array1.find(element => element > 10);
