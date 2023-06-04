const taskInput = document.querySelector(".task-input input");
taskBox = document.querySelector(".task-box");

let editId;
let isEdited = false;

// GET LOCALSTORAGE TODO-LIST
let todos = JSON.parse(localStorage.getItem("todo-list"));

// CONSOLE LOGGING TODO
function showTodo() {
  let list = "";

  if (todos) {
    todos.forEach((todo, id) => {
      // console.log(id, todo);

      // ADDING THE CLASS 'CHECKED' IF IT HAS BEEN COMPLETED or TO PREVENT IT FROM GETTING 'UNCHECKED' DUE TO REFRESHING THE PAGE
      let isCompleted = todo.status == "Completed" ? "checked" : "";
      // if completed then set isCompleted value to checked

      list += `<li class="task">
                    <label for="">
                        <div class="content">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                            <p class="${isCompleted}">${todo.name}</p>
                        </div>
                        <div class="setting">
                            <span onclick="editTask(${id}, '${todo.name}')" ><i class="uil uil-edit-alt"></i></span>
                            <span onclick="deleteTask(${id})" ><i class="uil uil-trash-alt"></i></span>
                        </div>

                    </label>
                </li>`;
    });
  }

  taskBox.innerHTML = list;
}

showTodo();

// FUNCTION TO UPDATE STATUS
function updateStatus(selectedTask) {
  // GETTING PARAGRAPH THAT CONTAINS CLASS NAME
  let taskName = selectedTask.parentElement.lastElementChild;

  // TO ADD or REMOVE CHECKED CLASS DYNAMICALLY
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "Completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "Pending";
  }

  // MODIFING STATUS ON LOCAL STORAGE AS WELL
  localStorage.setItem("todo-list", JSON.stringify(todos));

  // console.log(selectedTask);
}

// FUNCTION TO DELETE TASK

function deleteTask(deleteId) {
  console.log(deleteId);

  // REMOVE SELECTED TASK FROM ARRAY OR TODOS
  todos.splice(deleteId, 1);

  // UPDATE THE TODOS ARRAY AGAIN INTO THE LOCALHOST
  localStorage.setItem("todo-list", JSON.stringify(todos));

  // SHOW THE UPDATED TASK BOX AGAIN
  showTodo();
}

// FUNCTION TO EDIT TASK

function editTask(taskId, taskName) {
  // console.log(taskId);

  editId = taskId;
  isEdited = true;
  taskInput.value = taskName;
}

taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();

  if (e.key == "Enter" && userTask) {
    // console.log(userTask)

    // IF isEdited IS FALSE
    if (!isEdited) {
      if (!todos) {
        todos = [];
        // IF TODOS IS EMPTY THEN PASS EMPTY ARRAY TO TODOS
      }

      let taskInfo = { name: userTask, status: "pending" };

      // ADD NEW TASK
      todos.push(taskInfo);
    }

    // IF isEdited TRUE
    else {
      isEdited = false;
      todos[editId].name = userTask;
    }

    // SETTING TASK INPUT VALUE TO EMPTY AGAIN
    taskInput.value = "";

    localStorage.setItem("todo-list", JSON.stringify(todos));

    // MAKE IT APPEAR ON TASKBOX
    showTodo();
  }
});
