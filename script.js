// 1️⃣ Select DOM elements
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");


// 2️⃣ Create the state (memory)
let tasks = [];


// 3️⃣ Render function (updates UI based on tasks array)
function renderTasks() {
    taskList.innerHTML = "";  // Clear existing list

    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.textContent = task.text;
        taskList.appendChild(li);
    });
}


// 4️⃣ Listen for Add button click
addBtn.addEventListener("click", function() {

    // Read user input
    const taskText = taskInput.value;

    // Validate input
    if (taskText.trim() === "") {
        alert("Please enter a task");
        return;
    }

    // Create task object
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Save to array (update state)
    tasks.push(newTask);

    // Update the UI
    renderTasks();

    // Optional: Clear input field after adding
    taskInput.value = "";
});