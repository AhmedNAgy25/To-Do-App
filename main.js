// Local Storage = LS

let addTask_btn = document.querySelector("button");
let tasksList = document.getElementById("tasksList");
let errorMsg = document.querySelector(".error");

// load Tasks from LS
addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    renderTask(value);
  }
});

// store Tasks in LS
function addTaskToLoscal(taskToAdd) {
  let uniqueKey = `${taskToAdd}&${Date.now()}`;
  window.localStorage.setItem(uniqueKey, taskToAdd);
}

// remove from LS
function removeTaskFromLocal(toRemove) {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (localStorage.getItem(key) === toRemove) {
      localStorage.removeItem(key);
      break;
    }
  }
}

// delet note
function deleteTask(delete_btn, tasksList, note, taskToAdd) {
  delete_btn.onclick = function () {
    tasksList.removeChild(note);
    removeTaskFromLocal(taskToAdd);
  };
}

// render tasks in page
function renderTask(taskToAdd) {
  let note = document.createElement("div");
  let label = document.createElement("div");
  let delete_btn = document.createElement("button");

  label.append(taskToAdd);
  note.append(label);
  note.classList.add("note");

  delete_btn.innerHTML = "delete";
  deleteTask(delete_btn, tasksList, note, taskToAdd);

  note.append(delete_btn);
  tasksList.append(note);
}

// handel errorMsg issue
function errorMsgHandel(errorMsg, inputTask) {
  errorMsg.style.cssText = "color:red;margin:5px;text-align:center";
  errorMsg.innerHTML = "Can't be empty";
  inputTask.style.cssText = "border: red 1px solid;";
}

// restart input fields
function resetInputs(inputTask, errorMsg) {
  inputTask.style.cssText = "border: none";
  inputTask.value = "";
  errorMsg.innerHTML = "";
}

// main function
addTask_btn.onclick = function () {
  let inputTask = document.querySelector("#input");
  if (inputTask.value) {
    addTaskToLoscal(inputTask.value);
    renderTask(inputTask.value);
    resetInputs(inputTask, errorMsg);
  } else {
    errorMsgHandel(errorMsg, inputTask);
  }
};
