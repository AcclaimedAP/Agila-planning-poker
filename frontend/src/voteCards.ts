import { IUser, IVote, IUsers } from "./models/IUsers";
import { userVoteSocketEmit } from "./socket";
import { connectedUsers } from "./main";

function createCard(user: string, buttons = false) {
    const container = document.createElement('div') as HTMLDivElement;
    container.innerHTML = `
    <h2>${user}</h2>
    `;
    if (!buttons) {
        return container;
    };
    const numbers = [1, 3, 5, 8];
  
    for (let number of numbers) {
        const button = document.createElement('button') as HTMLButtonElement;
        button.innerHTML = number.toString();
        button.addEventListener('click', (e) => {
            e.preventDefault();
            vote(number);
        });
        button.classList.add('voteButton');
        container.appendChild(button);
    }
    return container;
}
function createCardShowingVote(userVote: IVote) {
    const container = document.createElement('div') as HTMLDivElement;
    container.innerHTML = `
    <h2>${userVote.name}</h2><br>
    <h3>${userVote.voteValue.toString()}</h3>
    `;
    return container;
}

export function createVoteCardsShowingVote() {
    const oldContainer = document.querySelector('.allVoteCardsContainer') as HTMLDivElement;
  
    if (oldContainer) {
        oldContainer.remove();
    }
    const userVotes: IVote[] = JSON.parse(sessionStorage.getItem("votes") ?? "");
    const container = document.createElement('div') as HTMLDivElement;
    container.classList.add('allVoteCardsContainer');
  
    for (var user of userVotes) {
        container.appendChild(createCardShowingVote(user));
    }
    return container;
}

export function createVoteCards(connectedUsers: IUsers[], empty = false, showAll = false) {
    const oldContainer = document.querySelector('.allVoteCardsContainer') as HTMLDivElement;
    if (oldContainer) {
        oldContainer.remove();
    }
    const container = document.createElement('div') as HTMLDivElement;
    container.classList.add('allVoteCardsContainer');
    var name: string | null = "";
  
    if (!empty) {
        name = sessionStorage.getItem('username');
    } 
    
    for (var user of connectedUsers) {
        var isUser = true;
      
        if(!showAll) {
            isUser = (name == user.username);
        }
        if (empty) {
            isUser = false;
        }
        
        container.appendChild(createCard(user.username, isUser));
    }
    return container;
}

function vote(storyPoints: number) {
    disableButtons();
    userVoteSocketEmit(storyPoints);
    
}

function disableButtons() {
    const buttons = document.querySelectorAll('.voteButton') as NodeListOf<HTMLButtonElement>;
    for (var button of buttons) {
        button.setAttribute('disabled', 'true');
    }
}