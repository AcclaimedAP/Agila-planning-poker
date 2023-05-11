import { io } from "socket.io-client";

const socket = io('http://localhost:3000')
const app: HTMLElement | null = document.getElementById('app');

export function renderAddTaskBtn(): HTMLButtonElement {

    const addTaskBtn: HTMLButtonElement = document.createElement('button');
    addTaskBtn.innerText = 'Add Task';
    addTaskBtn.classList.add('admin__section--addTaskBtn');
    addTaskBtn.addEventListener('click', renderAddTaskForm);

    return addTaskBtn;
}

export function renderAddTaskForm() {
      
    const addTaskContainer: HTMLDivElement = document.createElement('div');
    addTaskContainer.classList.add('addTaskContainer');

    const titleLabel: HTMLLabelElement = document.createElement('label');
    titleLabel.innerHTML = 'Title: ';
    const titleInput: HTMLInputElement = document.createElement('input');
    titleInput.id = 'titleInputElement';

    const descriptionLabel: HTMLLabelElement = document.createElement('label');
    descriptionLabel.innerHTML = 'Description: ';
    const descriptionInput: HTMLTextAreaElement = document.createElement('textarea');
    descriptionInput.id = 'descriptionInputElement';

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('btnContainer');

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
        closeAddTaskForm(addTaskContainer);
    })

    btnContainer.append(cancelAddTaskBtn, confirmAddTaskBtn)
    addTaskContainer.append(titleLabel, titleInput, descriptionLabel, descriptionInput, btnContainer);

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