import { io } from "socket.io-client";

const app: HTMLElement | null = document.getElementById('app');

const socket = io('http://localhost:3000')

export function renderAddTaskBtn(): HTMLButtonElement {

    const addTaskBtn: HTMLButtonElement = document.createElement('button');
    addTaskBtn.innerText = 'Add Task';
    addTaskBtn.classList.add('admin__section--addTaskBtn');
    addTaskBtn.addEventListener('click', renderAddTaskForm);

    return addTaskBtn;
}

export function renderAddTaskForm() {
      
    const addTaskContainer: HTMLDivElement = document.createElement('div');

    const titleLabel: HTMLLabelElement = document.createElement('label');
    titleLabel.innerHTML = 'Title: ';
    const descriptionLabel: HTMLLabelElement = document.createElement('label');
    descriptionLabel.innerHTML = 'Description: ';
    const titleInput: HTMLInputElement = document.createElement('input');
    titleInput.id = 'titleInputElement';
    const descriptionInput: HTMLTextAreaElement = document.createElement('textarea');
    descriptionInput.id = 'descriptionInputElement';
    const cancelAddTaskBtn = document.createElement('button');
    cancelAddTaskBtn.innerText = 'Cancel';
    cancelAddTaskBtn.id = 'cancelAddTaskBtn';
    const confirmAddTaskBtn = document.createElement('button');
    confirmAddTaskBtn.innerText = 'Add';
    confirmAddTaskBtn.id = 'confirmAddTaskBtn';

    cancelAddTaskBtn.addEventListener('click', () => {
        closeAddTaskForm(addTaskContainer)
    });

    confirmAddTaskBtn.addEventListener('click', () => {
        addTask(titleInput.value, descriptionInput.value)
    })

    addTaskContainer.append(titleLabel, titleInput, descriptionLabel, descriptionInput, cancelAddTaskBtn, confirmAddTaskBtn);

    app?.appendChild(addTaskContainer);

}

function closeAddTaskForm(addTaskContainer: HTMLDivElement) {

    app?.removeChild(addTaskContainer)
}

function addTask(title: String, description: String) {

    const task = {
        'taskTitle': title,
        'taskDescription': description
    }
    console.log('task', task);
    
    socket.emit('add-task', task)
}