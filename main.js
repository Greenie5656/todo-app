//Array to store tasks
let tasks = [];

//Object to represent a task
function Task(description){
    this.description = description;
    this.completed = false;
}

//Function to add a task
function addTask(){
    const taskInput = document.getElementById('task-input');
    const taskDescription = taskInput.value;

    if (taskDescription === ""){
        alert("Task cannot be empty");
        return;
    }

    const newTask = new Task(taskDescription);
    tasks.push(newTask);
    taskInput.value = '';

    renderTasks();


}

// Function to remove a task
function removeTask(index){
    tasks.splice(index, 1);
    renderTasks();
}

// Function to render tasks
function renderTasks(){
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.description;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeTask(index);

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

    });
}

//Add event listener to the Add Task button
document.getElementById('add-task').addEventListener('click', addTask);



