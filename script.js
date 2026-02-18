// 1️⃣ Select DOM Elements
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

// 2️⃣ Define the State (Single Source of Truth)
let tasks = [];

// 3️⃣ Add Event Listener
// This waits for the user to click the "Add Task" button
addBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim(); // Get text and remove extra spaces

    // Validate: Don't allow empty tasks
    if (taskText === "") {
        alert("Please enter a task!");
        return; // Stop the function here
    }

    // Create Task Object
    const newTask = {
        id: Date.now(), // Unique ID based on time
        text: taskText,
        completed: false
    };

    // Push into Array (Update the State)
    tasks.push(newTask);

    // Clear the input field for the next task
    taskInput.value = "";

    // Render (Call the function to update the UI)
    renderTasks();
});

// 4️⃣ Placeholder Render Function
// We will build the logic inside this in the next step
function renderTasks() {
    console.log("Current Tasks Array:", tasks);
    // For now, it just shows the array in the console
}