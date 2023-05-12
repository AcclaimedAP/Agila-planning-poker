import { io } from 'socket.io-client';
import { ITask } from "../models/ITask";
import { app } from "../main";
import { IUser } from "../models/IUser";
import { IVotedOnTask } from "../models/IVotedOnTask";
import { IVote } from "../models/IVote";
import { clearVotesSocketEmit } from '../socket';

const socket = io(`localhost:3000`);
const renderedTasksContainer = document.querySelector('.login-and-rendered-tasks');

export let currentUser: IUser | undefined;

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

    if(currentUser?.isAdmin){
        const doneBtn = document.createElement('button');
        doneBtn.innerText = 'Done'

        doneBtn.addEventListener('click', () => {
            doneVote(taskTitle.innerText, taskDescription.innerText, decidedStoryPointsInput.value);
            clearVotesSocketEmit();
        });

        const decidedStoryPointsInput = document.createElement('input');
        decidedStoryPointsInput.placeholder = 'Decided Story Points';
        decidedStoryPointsInput.type = 'number';
        decidedStoryPointsInput.id = 'decidedStoryPointsInput';

        taskToVoteOn.append(decidedStoryPointsInput, doneBtn);
    }

    if (!existingVoteSection) {
        renderedTasksContainer?.append(voteSection);
    }

    return voteSection;
}

export function getCurrentUser(users: IUser[]) {
    const user = sessionStorage.getItem('username');
    const connectedUsers = users;
    currentUser = connectedUsers.find(connectedUser => connectedUser.username === user);
}

function doneVote(title: string, description: string, points: any) {
    const completedVote: IVotedOnTask = {
        taskTitle: title,
        taskDescription: description,
        storyPoints: parseInt(points)
    }
    socket.emit('completed-vote', completedVote);
}

export function getAverageVote(votes: IVote[]) {
    var sum = 0;
    for (var vote of votes) {
        sum += vote.voteValue;
    }
    const average = returnNearestFibonacci(sum / votes.length);
    
    return average;
}

function returnNearestFibonacci(num: number) {
    const numRound = Math.round(num);
    
    const diff = num - numRound;
    console.log(numRound);;
    
    if (diff >= 0) {
        if (num < 3) {
            return 1;
        } else if (num < 5) {
            return 3;
        } else if (num < 7) {
            return 5;
        } else {
            return 8;
        }
    } else {
        if (num < 2) {
            return 1;
        } else if (num < 4) {
            return 3;
        } else if (num < 7) {
            return 5;
        } else {
            return 8;
        }
    }
}
