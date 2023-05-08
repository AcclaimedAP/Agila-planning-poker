import { ITask } from "../models/ITask";
import { app } from "../main";

export function renderTaskList(tasks: ITask[]) {
    const taskList = document.createElement("ul");
    taskList.innerHTML = "";
    taskList.id = "task-list";
    tasks.forEach((task) => {
        const taskItem = document.createElement("li");
        taskItem.innerText = task.taskTitle;
        taskList.appendChild(taskItem);

        const voteBtn = document.createElement("button");
        voteBtn.innerText = "Choose";
        taskList.appendChild(voteBtn);
        });
    app?.appendChild(taskList);
}
