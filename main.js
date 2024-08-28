let addTask = document.querySelector("button");

addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);
    console.log(value);
    render(value);
  }
});

function addingToLoscal(tOAdd) {
  let uniqueKey = `${tOAdd}&${Date.now()}`;
  window.localStorage.setItem(uniqueKey, tOAdd);
}

function removeFromLocal(toRemove) {
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (localStorage.getItem(key) === toRemove) {
      localStorage.removeItem(key);
      break;
    }
  }
}

function render(tOAdd) {
  let tasksList = document.getElementById("tasksList");

  let note = document.createElement("div");
  let label = document.createElement("div");
  let del = document.createElement("button");

  label.append(tOAdd);
  note.append(label);
    note.classList.add("note")

  del.innerHTML = "delete";
  del.onclick = function () {
    tasksList.removeChild(note);
    removeFromLocal(tOAdd);
  };
  note.append(del);
  tasksList.append(note);
}

addTask.onclick = function () {
  let error = document.querySelector(".error");
  let inputTask = document.querySelector("#input");
  if (inputTask.value !== "") {
    addingToLoscal(inputTask.value);

    render(inputTask.value);

    console.log(inputTask.value);
    inputTask.style.cssText="border: none"
    error.innerHTML = "";
    inputTask.value = "";
  } else {
    error.style.cssText = "color:red;margin:5px;text-align:center";
    error.innerHTML = "Can't be empty";
    inputTask.style.cssText="border: red 1px solid;"
  }
};
