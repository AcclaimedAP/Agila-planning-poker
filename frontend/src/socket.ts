import { io } from 'socket.io-client';
import { createVoteCards } from './voteCards';
import { IVote } from './models/IUsers';
import { renderTaskList } from './modules/upcomingTasksPanel';
import { ITask } from './models/ITask';
import { getAverageVote } from './modules/taskToVoteOn';
const socket = io(`localhost:3000`);

export function userConnectSocketOn() {
    socket.on('user-connect', (data: string[]) => {
        sessionStorage.setItem('users', JSON.stringify(data));
        
        
    });
}

export function userVoteSocketEmit(voteValue: number) {
    const name = sessionStorage.getItem('username') ?? "";
    const voteObj: IVote = {name, voteValue}
    
    socket.emit('user-vote', voteObj);
}

export function userVoteSocketOn() {
    
    socket.on('user-vote', (data: IVote[]) => {
        sessionStorage.setItem('votes', JSON.stringify(data));
        const users = JSON.parse(sessionStorage.getItem("users") ?? "");
        if (!(data.length >= users.length)) {
            console.log("Waiting for votes");
            
            return;
        }
        
        sessionStorage.removeItem('votes');
        console.log("Getting that shit " + getAverageVote(data));
        
    })
}
export function addTaskSocketOn() {
    socket.on("add-task", (tasks: ITask[]) => {
        renderTaskList(tasks)
    });
}