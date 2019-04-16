// Define UI Variables

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector(".clear-tasks");

// Load all event Listeners
loadEventListeners();

//load all event listeners
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //Clear tasks
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks
    filter.addEventListener('keyup', filterTasks);
}

//add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task!!');
    } else {
        //create li element
        const li = document.createElement("li");
        li.className = 'collection-item';
        //create text node and append to the li
        li.appendChild(document.createTextNode(taskInput.value));
        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append the link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);

        // Store in Local Storage
        storeTaskInLocalStorage(taskInput.value);

        //clear the input
        taskInput.value = '';

    }

    e.preventDefault();
}

// Store Task Locally
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Get tasks from local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = 'collection-item';
        //create text node and append to the li
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        //add class
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // append the link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    });
}

// Remove Task

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Are you sure?")) {
            e.target.parentElement.parentElement.remove();

            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks(e) {
    // taskList.innerHTML = '';

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    clearAllFromLocal();
}
// clear all tasks from local storage
function clearAllFromLocal() {
    localStorage.clear();
}

//filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}