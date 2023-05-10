import { IVotedOnTask } from "../models/IVotedOnTask"

export function renderCompletedVotesContainer(completedVotes: IVotedOnTask[]) {
    const completedVotesContainer = document.createElement("div");
    completedVotesContainer.classList.add("completed-votes-container");
    
    const completedVotesUl = document.createElement("ul");
    completedVotesUl.classList.add("completedVotesUl");
  
    completedVotes.forEach((completedVote) => {
      const li = document.createElement("li");
      li.innerHTML = `${completedVote.taskTitle}: ${completedVote.storyPoints} SP`
      completedVotesUl.appendChild(li)
    });

    completedVotesContainer.appendChild(completedVotesUl)

    return completedVotesContainer;
  }