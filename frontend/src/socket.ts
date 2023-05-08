import { io } from 'socket.io-client';
import { createVoteCards } from './voteCards';
const socket = io(`localhost:3000`);

export function userConnectSocketOn() {
    socket.on('user-connect', (data: string[]) => {
        sessionStorage.setItem('users', JSON.stringify(data));
        console.log(data);
        
        const app = document.getElementById('app') as HTMLDivElement;
        app.appendChild(createVoteCards(data, false, false));
    });
}

export function userVoteSocketEmit(voteValue: number) {
    const user = sessionStorage.getItem('user') ?? "";
    
    const voteObj = {user, voteValue}
    console.log(voteObj);
    
    socket.emit('user-vote', voteObj);
}

export function userVoteSocketOn() {
    
    socket.on('user-vote', (data) => {
        
        console.log(data);
        
    })
}