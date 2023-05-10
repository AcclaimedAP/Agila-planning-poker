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
    return returnNearestFibonacci(sum / votes.length);
}
function returnNearestFibonacci(num: number) {
    const numRound = Math.round(num);
    const diff = num - numRound;
    if (diff >= 0) {
        switch (num) {
            case 1:
                return 1;
                break;
            case 2:
                return 1;
                break;
            case 3:
                return 3;
                break;
            case 4:
                return 3;
                break;
            case 5:
                return 5;
                break;
            case 6:
                return 5;
                break;
            case 7:
                return 8;
                break;
            case 8:
                return 8;
                break;
            default:
                return 0;
                break;
        }
    } else {
        switch (num) {
            case 1:
                return 1;
                break;
            case 2:
                return 3;
                break;
            case 3:
                return 3;
                break;
            case 4:
                return 5;
                break;
            case 5:
                return 5;
                break;
            case 6:
                return 5;
                break;
            case 7:
                return 8;
                break;
            case 8:
                return 8;
                break;
            default:
                return 0;
                break;
        }
    }
    
}