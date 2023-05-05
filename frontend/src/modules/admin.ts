const app = document.getElementById('app');

export function adminInit() {

    if(app) app.innerHTML = '';

    const adminSection: HTMLElement = document.createElement('section');
    adminSection.classList.add('admin__section');

    app?.append(adminSection);

    const adminSectionEl = document.querySelector('.admin__section')

    const addTaskBtn: HTMLButtonElement = document.createElement('button');
    addTaskBtn.innerText = 'Add Task';
    addTaskBtn.classList.add('admin__section--addTaskBtn');

    adminSectionEl?.append(addTaskBtn);

    addTaskBtn.addEventListener('click', renderAddTaskForm);
}

