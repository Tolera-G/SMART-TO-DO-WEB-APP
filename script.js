// 1️⃣ Select DOM Elements
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

// 2️⃣ Load tasks from localStorage (or start empty)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 3️⃣ Render tasks when page loads
renderTasks();

// 4️⃣ Add Task Event
addBtn.addEventListener("click", function () {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
});

// 5️⃣ Render Function
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.textContent = task.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function () {
            deleteTask(task.id);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// 6️⃣ Delete Task Function
function deleteTask(id) {
    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();
    renderTasks();
}

// 7️⃣ Save to localStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}