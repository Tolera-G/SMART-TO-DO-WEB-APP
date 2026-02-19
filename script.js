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

// 4️⃣ Create renderTasks() Function
function renderTasks() {
    // A. Clear existing list first
    // This prevents the list from duplicating every time a new task is added
    taskList.innerHTML = "";

    // B. Loop through the "Single Source of Truth" (tasks array)
    tasks.forEach(task => {
        // C. Create <li> element dynamically
        const li = document.createElement("li");
        
        // D. Set the text content
        li.textContent = task.text;

        // E. Apply styling if the task is completed (for future toggle step)
        if (task.completed) {
            li.classList.add("completed");
        }

        // F. Append (Add) the <li> to the <ul> container
        taskList.appendChild(li);
    });
}
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