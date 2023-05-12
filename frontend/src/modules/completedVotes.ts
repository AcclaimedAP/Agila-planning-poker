import { IVotedOnTask } from "../models/IVotedOnTask"
import { app } from "../main"

export function renderCompletedVotesContainer(completedVotes: IVotedOnTask[]) {
    const completedVotesContainer = document.createElement("div");
    completedVotesContainer.classList.add("completed-votes-container");
    
    const completedVotesUl = document.createElement("ul");
    completedVotesUl.classList.add("completedVotesUl");
  
    completedVotes.forEach((completedVote) => {
      const li = document.createElement("li");
      li.innerHTML = `${completedVote.taskTitle}: ${completedVote.storyPoints} SP`
      completedVotesUl.appendChild(li)

      li.addEventListener("click", () => {
        const expandedCompletedVote = document.createElement("div");
        expandedCompletedVote.classList.add('expandedCompletedVote');

        const taskTitle = completedVote.taskTitle;
        const taskDescription = completedVote.taskDescription;
        const storyPoints = completedVote.storyPoints;
        
        expandedCompletedVote.innerHTML = `
          <h2>${taskTitle}</h2>
          <p>${taskDescription}</p>
          <p>${storyPoints} SP</p><br>
          <button id="closeBtn">Close</button>
        `;

        
        app?.append(expandedCompletedVote);
        
        const closeBtn = document.getElementById('closeBtn');

        closeBtn?.addEventListener('click', () => {
          closeExpandedView(expandedCompletedVote)
      });
    });
  })
  completedVotesContainer.appendChild(completedVotesUl)

  return completedVotesContainer;
}

function closeExpandedView(expandedCompletedVote: HTMLDivElement) {

  app?.removeChild(expandedCompletedVote)
}