{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = newTaskContent => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = index => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ];
        render();
    };

    const clearInput = (inputElement) => {
        inputElement.value = "";
        inputElement.focus();
    };

    const switchTaskDone = index => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ];

        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const switchHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
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

    const renderTasks = () => {
        const taskToHTML = task => `
            <li class="
               tasksList__item${task.done && hideDoneTasks ? " tasksList__item--hidden" : ""}"
            >
            <button class="tasksList__button tasksList__button--switchDone js-switchDone">
                ${task.done ? "✓" : ""}
            </button>
            <span class="tasksList__content ${task.done ? "tasksList__content--done" : ""}" >
              ${task.content}
            </span >
            <button class="tasksList__button tasksList__button--remove js-remove">
               🗑
            </button>
            </li >
        `;

        const tasksElement = document.querySelector(".js-tasks");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if (!tasks.length) {
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
        <button class="buttons js-switchHideDoneTasksButton">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button >
        <button 
          class="buttons js-markAllTasksDoneButton"
          ${tasks.every(({ done }) => done) ? "disabled" : ""}
        >
          Ukończ wszystkie
        </button> 
      `;
    };

    const bindButtonsEvents = () => {
        const markAllTasksDoneButton = document.querySelector(".js-markAllTasksDoneButton");
        if (markAllTasksDoneButton) {
            markAllTasksDoneButton.addEventListener("click", markAllTasksDone);
        }

        const switchHideDoneTasksButton = document.querySelector(".js-switchHideDoneTasksButton");

        if (switchHideDoneTasksButton) {
            switchHideDoneTasksButton.addEventListener("click", switchHideDoneTasks);
        }
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindSwitchDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();


        const inputElement = document.querySelector(".js-addTask");
        const newTaskContent = inputElement.value.trim();
        if (newTaskContent === "") {
            inputElement.focus();
            return;
        }

        addNewTask(newTaskContent);
        clearInput(inputElement);
    };


    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}