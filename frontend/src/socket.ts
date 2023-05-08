import { io } from 'socket.io-client';
import { createVoteCards } from './voteCards';
const socket = io(`localhost:3000`);

export function userConnectSocket() {
    socket.on('user-connect', (data: string[]) => {
        sessionStorage.setItem('users', JSON.stringify(data));
        console.log(data);
        
        const app = document.getElementById('app') as HTMLDivElement;
        app.appendChild(createVoteCards(data, false, false));
    });
}