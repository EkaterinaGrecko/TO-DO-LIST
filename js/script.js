{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({ content: newTaskContent });
        render();
    };
    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const switchTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };
    const bindSwitchDoneEvents = () => {
        const switchDoneButtons = document.querySelectorAll(".js-switchDone");
        switchDoneButtons.forEach((switchDoneButton, index) => {
            switchDoneButton.addEventListener("click", () => {
                switchTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
            class="tasksList__item js-task"
            >
            <button class="tasksList__button tasksList__button--switchDone js-switchDone">
            ${task.done ? "✓" : ""}
            </button>
            <span class="tasksList__content ${task.done ? "tasksList__content--done" : ""}">
            ${task.content}</span>
            <button class="tasksList__button tasksList__button--remove js-remove">
            🗑
            </button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;
        bindRemoveEvents();
        bindSwitchDoneEvents();
    };


    const onformSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-addTask").value.trim();
        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskContent.value = "";
        }
        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onformSubmit);
    };
    init ();
}