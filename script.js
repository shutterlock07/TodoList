const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

let tasks = [];

// Function to add a task to the todo list
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const task = {
            text: taskText,
            done: false,
        };
        tasks.push(task);
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
    const newTaskText = prompt("Edit task:", tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText.trim();
        updateTaskList();
    }
}

// Function to toggle done/undone for the task
function statusToggle(index) {
    tasks[index].done = !tasks[index].done;
    updateTaskList();
}

// Function to update the task list in the UI
function updateTaskList() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        const taskTextElement = document.createElement("span");
        taskTextElement.textContent = task.text;
        taskTextElement.classList.add("task-text");
        if (task.done) {
            taskTextElement.classList.add("done");
        }

        const actionsContainer = document.createElement("div");
        actionsContainer.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", () => editTask(index));

        const statusBtn = document.createElement("button");
        statusBtn.textContent = task.done ? "Undone" : "Done";
        statusBtn.className = "status-btn";
        statusBtn.addEventListener("click", () => statusToggle(index));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.addEventListener("click", () => removeTask(index));


        actionsContainer.appendChild(editBtn);
        actionsContainer.appendChild(statusBtn);
        actionsContainer.appendChild(deleteBtn);

        li.appendChild(taskTextElement);
        li.appendChild(actionsContainer);

        taskList.appendChild(li);
    });
}


// API CALL



// Initial rendering of the task list
updateTaskList();

// function fetchTasks() {
//     // Simulate API call with a delay of 1 second
//     setTimeout(() => {
//         // Replace this with your actual API endpoint or data retrieval logic
//         tasks = [];
//         // https://jsonplaceholder.typicode.com/todos
//         fetch('')
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not OK');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 // Process the received data

//                 [...data].forEach(ele => {
//                     tasks.push([ele.title]);

//                     // localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
//                 });
//                 console.log();
//                 updateTaskList(tasks);
//             })
//             .catch(error => {
//                 // Handle any errors that occurred during the fetch request
//                 console.log('Error:', error.message);
//             })
//         updateTaskList();
//     }, 1000);
// }


// // Fetch tasks from the API on page load
// fetchTasks();
