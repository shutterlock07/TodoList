const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const priorityInput = document.getElementById("priority")
const categoryInput = document.getElementById("category")
const tagsInput = document.getElementById("tags")

let tasks = [];

// formatting date 
function formatDate(dateString) {
    console.log(dateString)
    if (dateString == "") {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}


// Function to add a task to the todo list
function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value.trim();
    const priority = priorityInput.value.trim();
    const cat = categoryInput.value.trim();
    const tags = tagsInput.value.trim().split(",");

    if (taskText !== "") {
        const task = {
            text: taskText,
            done: false,
            dueDate: formatDate(dueDate),
            priority: priority,
            category: cat,
            tags: tags,
        };
        tasks.push(task);
        updateTaskList();
        taskInput.value = "";
        dueDateInput.value = formatDate();
        priorityInput.value = "Medium";
        categoryInput.value = "";
        tagsInput.value = "";
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
    if (newTaskText != "") {
        tasks[index].text = newTaskText.trim();
        updateTaskList();
    }
}

// Function to toggle done/undone for the task
function statusToggle(index) {
    tasks[index].done = !tasks[index].done;
    updateTaskList();
}


// Function to filter tasks based on a specific due date range
function filterTasksByDateRange() {
    const startDateString = document.getElementById("startDate").value;
    const endDateString = document.getElementById("endDate").value;

    if (startDateString && endDateString) {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        const filteredTasks = tasks.filter((task) => {
            const taskDate = new Date(task.dueDate);
            return taskDate >= startDate && taskDate <= endDate;
        });

        updateTaskList(filteredTasks);
    } else {
        updateTaskList();
    }
}

// Function to filter tasks based on the priority
function filterTasksByPriority() {
    const priorityString = document.getElementById("priorityFilter").value;
    if (priorityString != "None") {

        const filteredTasks = tasks.filter((task) => {
            return task.priority == priorityString;
        });
        updateTaskList(filteredTasks);
    } else {
        updateTaskList();
    }
}

// Function to filter tasks based on the priority
function filterTasksByCategory() {
    const categoryString = document.getElementById("categoryFilter").value;
    if (categoryString) {

        const filteredTasks = tasks.filter((task) => {
            return task.category == categoryString;
        });
        updateTaskList(filteredTasks);
    } else {
        updateTaskList();
    }
}

// Function to update the task list in the UI
function updateTaskList(filteredTasks = tasks) {
    taskList.innerHTML = "";
    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item";

        const taskTextElement = document.createElement("p");
        taskTextElement.textContent = task.text;
        taskTextElement.classList.add("task-text");


        const dueDateElement = document.createElement("span");
        dueDateElement.textContent = task.dueDate;
        dueDateElement.classList.add("due-date");
        li.appendChild(dueDateElement);

        const priorityElement = document.createElement("span");
        priorityElement.textContent = task.priority;
        priorityElement.classList.add("priority");
        li.appendChild(priorityElement);

        const categoryElement = document.createElement("p");
        categoryElement.textContent = task.category;
        categoryElement.classList.add("category");
        li.appendChild(categoryElement);

        const tagsElement = document.createElement("span");
        tagsElement.textContent = task.tags; // Join tags with commas
        tagsElement.classList.add("tags");
        li.appendChild(tagsElement);

        if (task.done) {
            taskTextElement.classList.add("done");
            dueDateElement.classList.add("done");
            priorityElement.classList.add("done");
            categoryElement.classList.add("done");
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

document.getElementById("filterBtn").addEventListener("click", filterTasksByDateRange);
document.getElementById("filterprioBtn").addEventListener("click", filterTasksByPriority);
document.getElementById("filtercatBtn").addEventListener("click", filterTasksByCategory);
// API CALL

// Fetch tasks from the Local Storage on page load
function fetchTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        updateTaskList();
    }
}

// Save tasks to Local Storage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listener to save tasks to Local Storage on page unload
window.addEventListener("beforeunload", () => {
    saveTasksToLocalStorage();
});

// Fetch tasks from the Local Storage on page load
fetchTasksFromLocalStorage();

// Initial rendering of the task list
// updateTaskList();

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
