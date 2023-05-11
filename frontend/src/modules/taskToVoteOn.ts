import { ITask } from "../models/ITask";
import { app } from "../main";
import { IVote } from "../models/IUsers";

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