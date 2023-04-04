const taskList = document.getElementById("taskList");
const addTaskButton = document.getElementById("addTask");
const newTaskInput = document.getElementById("newTask");

// Load saved tasks from local storage
const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Render saved tasks
renderTasks(savedTasks);

// Add task on button click
addTaskButton.addEventListener("click", addTask);

// Add task on enter key press
newTaskInput.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    addTask();
  }
});

// Add a new task to the list
function addTask() {
  const newTask = newTaskInput.value.trim();

  if (newTask) {
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };

    savedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    renderTasks(savedTasks);

    newTaskInput.value = "";
  }
}

// Edit a task
function editTask(event) {
  const li = event.target.parentElement;
  const taskId = Number(li.dataset.id);
  const savedTask = savedTasks.find((task) => task.id === taskId);

  const newTaskText = prompt("Edit task", savedTask.text);

  if (newTaskText) {
    savedTask.text = newTaskText;
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    renderTasks(savedTasks);
  }
}

// Remove a task
function removeTask(event) {
  const li = event.target.parentElement;
  const taskId = Number(li.dataset.id);
  const savedTaskIndex = savedTasks.findIndex((task) => task.id === taskId);

  savedTasks.splice(savedTaskIndex, 1);
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
  renderTasks(savedTasks);
}

// Toggle task completion status
function toggleTask(event) {
  const li = event.target.parentElement;
  const taskId = Number(li.dataset.id);
  const savedTask = savedTasks.find((task) => task.id === taskId);

  savedTask.completed = !savedTask.completed;
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
  renderTasks(savedTasks);
}

// Render all tasks to the list
function renderTasks(tasks) {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("click", toggleTask);
    const span = document.createElement("span");
    span.innerText = task.text;
    span.style.textDecoration = task.completed ? "line-through" : "none";
    span.addEventListener("click", editTask);
    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click", removeTask);
    li.dataset.id = task.id;
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(button);
    taskList.appendChild(li);
  }
}
