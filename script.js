// 1️⃣ Select DOM elements
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");

// 2️⃣ Create the state (memory)
let tasks = [];

// 3️⃣ Listen for Add button click
addBtn.addEventListener("click", function() {

    // 4️⃣ Read user input
    const taskText = taskInput.value;

    // 5️⃣ Validate input
    if (taskText.trim() === "") {
        alert("Please enter a task");
        return;
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

// function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    span.addEventListener("click", () => {
      toggleTask(task.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

// 5️⃣ STEP 3: Create toggleTask() Function
function toggleTask(id) {
    /**
     * THE IDEA: Immutable Mapping
     * We go through every task in our 'tasks' array.
     * If the ID matches the one clicked, we "flip" the completed status.
     */
    tasks = tasks.map(task => {
        if (task.id === id) {
            // Return a copy of the task with the opposite 'completed' value
            return { ...task, completed: !task.completed };
        }
        // If it's not the one we clicked, return it exactly as it was
        return task;
    });

    // Re-render the UI to reflect the data change
    renderTasks();
}