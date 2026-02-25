/***********************
  1️⃣ DOM SELECTION
************************/
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");


/***********************
  2️⃣ APPLICATION STATE
************************/
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


/***********************
  3️⃣ EVENT LISTENERS
************************/
addBtn.addEventListener("click", handleAddTask);


/***********************
  4️⃣ CORE FUNCTIONS
************************/

// Add Task
function handleAddTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    updateApp();
    taskInput.value = "";
}


// Render Tasks
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        const completeBtn = createButton(
            "Complete",
            "complete-btn",
            function () {
                toggleTask(task.id);
            }
        );

        const deleteBtn = createButton(
            "Delete",
            "delete-btn",
            function () {
                deleteTask(task.id);
            }
        );

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}


// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    updateApp();
}


// Toggle Complete
function toggleTask(id) {
    tasks = tasks.map(function (task) {
        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }
        return task;
    });

    updateApp();
}


// Save to LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Update Entire App (Single Source of Truth)
function updateApp() {
    saveTasks();
    renderTasks();
}


// Helper Function for Button Creation
function createButton(text, className, callback) {
    const button = document.createElement("button");
    button.textContent = text;
    button.classList.add(className);
    button.addEventListener("click", callback);
    return button;
}


/***********************
  5️⃣ INITIALIZE APP
************************/
renderTasks();