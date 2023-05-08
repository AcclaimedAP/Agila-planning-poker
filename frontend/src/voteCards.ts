
function createCard(user: string, buttons = false) {
    const container = document.createElement('div') as HTMLDivElement;
    container.innerHTML = `
    <h2>${user}<h2>
    `;
    if (buttons) {
        const numbers = [1, 3, 5, 8];
        for (var number of numbers) {
            const button = document.createElement('button') as HTMLButtonElement;
            button.innerHTML = number.toString();
            button.addEventListener('click', (e) => {
                e.preventDefault();
                // Emit choice
            })
            container.appendChild(button);
        }
    }

    return container;
}



export function createVoteCards(users: string[], empty = true, showAll = false) {
    const container = document.createElement('div') as HTMLDivElement;
    var name: string | null = "";
    if (!empty) {
        name = sessionStorage.getItem('user');
    } 
    
    for (var user of users) {
        var isUser = true;
        if(!showAll) {
            isUser = (name == user);
        }
        if (empty) {
            isUser = false;
        }
        console.log(isUser);
        
        container.appendChild(createCard(user, isUser));
    }

    return container;
}