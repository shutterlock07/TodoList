const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

let tasks = [];

// Function to add a task to the todo list
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        tasks.push(taskText);
        updateTaskList();
        taskInput.value = "";
    }
}

// Function to remove a task from the todo list
function removeTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

// Function to edit a task in the todo list
function editTask(index) {
    const newTaskText = prompt("Edit task:", tasks[index]);
    if (newTaskText !== null) {
        tasks[index] = newTaskText.trim();
        updateTaskList();
    }
}

// Function to update the task list in the UI
function updateTaskList() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;

        const actionsContainer = document.createElement("div");
        actionsContainer.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", () => editTask(index));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => removeTask(index));

        actionsContainer.appendChild(editBtn);
        actionsContainer.appendChild(deleteBtn);
        li.appendChild(actionsContainer);
        taskList.appendChild(li);
    });
}


// API CALL



// Initial rendering of the task list
// updateTaskList();

function fetchTasks() {
    // Simulate API call with a delay of 1 second
    setTimeout(() => {
        // Replace this with your actual API endpoint or data retrieval logic
        tasks = [];
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not OK');
                }
                return response.json();
            })
            .then((data) => {
                // Process the received data 

                [...data].forEach(ele => {
                    tasks.push([ele.title]);

                    // localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
                });
                console.log();
                updateTaskList(tasks);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch request 
                console.log('Error:', error.message);
            })
        updateTaskList();
    }, 1000);
}


// Fetch tasks from the API on page load
fetchTasks();
