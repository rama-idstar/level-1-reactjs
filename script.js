let tasks = [];

document.getElementById("addTaskButton").addEventListener("click", addTask);
document.getElementById("deleteAllTasksButton").addEventListener("click", deleteAllTasks);
document.getElementById("markAllCompleteButton").addEventListener("click", markAllTasksComplete);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (!taskText) {
    alert("Masukkan tugas terlebih dahulu.");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = createTaskListItem(task, index);
    taskList.appendChild(listItem);
  });

  updateRemainingTasksCount();
}

function createTaskListItem(task, index) {
  const listItem = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.onchange = () => toggleTaskStatus(index);

  const taskText = document.createElement("span");
  taskText.textContent = task.text;
  if (task.completed) {
    taskText.classList.add("completed");
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Hapus";
  deleteButton.onclick = () => deleteTask(index);

  listItem.appendChild(checkbox);
  listItem.appendChild(taskText);
  listItem.appendChild(deleteButton);

  return listItem;
}

function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function deleteAllTasks() {
  tasks = [];
  renderTasks();
}

function markAllTasksComplete() {
  tasks.forEach(task => task.completed = true);
  renderTasks();
}

function updateRemainingTasksCount() {
  const remainingTasks = tasks.filter(task => !task.completed).length;
  document.getElementById("remainingTasksCount").textContent = remainingTasks;

  if (remainingTasks === 0 && tasks.length > 0) {
    alert("Selamat! Anda telah menyelesaikan semua tugas.");
  }
}
