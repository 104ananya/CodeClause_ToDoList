const taskInput = document.querySelector(".task-input input");
taskBox = document.querySelector(".task-box");

// GET LOCALSTORAGE TODO-LIST
let todos = JSON.parse(localStorage.getItem("todo-list"));

// CONSOLE LOGGING TODO
function showTodo() {
  let list = "";

  if (todos) {
    todos.forEach((todo, id) => {
      // console.log(id, todo);

      list += `<li class="task">
                    <label for="${id}">
                        <div class="content">
                            <input onclick="updateStatus(this)" type="checkbox" id="${id}">
                            <p>${todo.name}</p>
                        </div>
                        <div class="setting">
                            <i class="uil uil-edit-alt"></i>
                            <i class="uil uil-trash-alt"></i>
                        </div>

                    </label>
                </li>`;
    });
  }

  taskBox.innerHTML = list;
}

showTodo();

function updateStatus(selectedTask){


    // GETTING PARAGRAPH THAT CONTAINS CLASS NAME
    let taskName = selectedTask.parentElement.lastElementChild;

    // TO ADD CHECKED CLASS DYNAMICALLY
    if(selectedTask.checked){
        taskName.classList.add("checked")
    }
    else{
        taskName.classList.remove("checked")
    }

    // console.log(selectedTask);
}



taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();

  if (e.key == "Enter" && userTask) {
    // console.log(userTask)

    if (!todos) {
      todos = [];
      
      // IF TODOS IS EMPTY THEN PASS EMPTY ARRAY TO TODOS
    }

    
    // SETTING TASK INPUT VALUE TO EMPTY AGAIN
    taskInput.value = "";

    let taskInfo = { name: userTask, status: "pending" };

    // ADD NEW TASK
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));

    // MAKE IT APPEAR ON TASKBOX
    showTodo();
  }
});
