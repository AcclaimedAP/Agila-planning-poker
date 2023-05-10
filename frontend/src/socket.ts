import { io } from 'socket.io-client';
import { createVoteCards } from './voteCards';
import { IVote } from './models/IUsers';
import { renderTaskList } from './modules/upcomingTasksPanel';
import { ITask } from './models/ITask';
const socket = io(`localhost:3000`);

export function userConnectSocketOn() {
    socket.on('user-connect', (data: string[]) => {
        sessionStorage.setItem('users', JSON.stringify(data));
        
        const app = document.getElementById('app') as HTMLDivElement;
        app.appendChild(createVoteCards(data, false, false));
    });
}

export function userVoteSocketEmit(voteValue: number) {
    const name = sessionStorage.getItem('username') ?? "";
    const voteObj: IVote = {name, voteValue}
    
    socket.emit('user-vote', voteObj);
}

export function userVoteSocketOn() {
    
    socket.on('user-vote', (data: IVote) => {
        sessionStorage.setItem('votes', JSON.stringify(data));
        console.log(data);
        
    })
}
export function addTaskSocketOn() {
    socket.on("add-task", (tasks: ITask[]) => {
        renderTaskList(tasks)
    });
}