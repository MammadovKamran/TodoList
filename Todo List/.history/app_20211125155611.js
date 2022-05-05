let form = document.getElementById('todo-form');
let todoInput = document.getElementById('todo-input');
let todoSelector = document.getElementById('todo');
let cardBody1 = document.querySelectorAll('.card-body')[0];
let cardBody2 = document.querySelectorAll('.card-body')[1];
let todoList = document.querySelector('.list-group');

eventListeners();

function eventListeners() {
  form.addEventListener('submit', formValidation);
  todoSelector.addEventListener('change', filterChangeAbleTodo);
  cardBody2.addEventListener('click', deleteTodosFromUI$Str);
  document.addEventListener('DOMContentLoaded', getSelectedTodosFromStorage);
}

function formValidation(e) {
  let newTodo = todoInput.value.trim();
  let newSelect = todoSelector.value;

  if (newTodo === '') {
    displayMessage('danger', 'Todo daxil edin!!!');
  } else {
    displayMessage('primary', `${newTodo} daxil edildi...`);
    addTodo(newTodo);
    addTodosToStorage(newSelect, newTodo);
  }

  e.preventDefault();
}

function displayMessage(type, content) {
  let div = document.createElement('div');
  div.className = `alert alert-${type}`;
  div.textContent = content;

  cardBody1.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 2000);
}

function addTodo(nextTodo) {
  if (todoList.firstElementChild.className === 'alert alert-danger' ) {
    todoList.removeChild(todoList.firstElementChild);
  }

  todoList.innerHTML += `

            <li class="list-group-item d-flex text-danger justify-content-between">
                 <b>${nextTodo}</b>
                 <a href="#">
                    <i class="bi bi-file-x"></i>
                 </a>
          </li>

    `;

  todoInput.value = '';
}

function getTodosFromStorage(params2key) {
  let todos;
  if (localStorage.getItem(params2key) === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(params2key));
  }
  return todos;
}

function addTodosToStorage(params1key, paramsValue) {
  let todos = getTodosFromStorage(params1key);
  todos.push(paramsValue);
  localStorage.setItem(params1key, JSON.stringify(todos));
}

function filterChangeAbleTodo() {
  let newSelect = todoSelector.value;
  localStorage.setItem('selector', newSelect);
  let todos = getTodosFromStorage(newSelect);

  while (todoList.firstElementChild !== null) {
    todoList.removeChild(todoList.firstElementChild);
  }

  if (todos && todos.length > 0) {
    todos.forEach(function (todo) {
      addTodo(todo);
    });
  } else {
    todoList.innerHTML = `
          <div class="alert alert-danger">"there is no any task"</div>

        `;
  }
}

function getSelectedTodosFromStorage() {
  todoSelector.value = localStorage.getItem('selector');
  let newSelector = todoSelector.value;
  getTodosFromStorage(newSelector).forEach(function (select) {
    addTodo(select);
  });
}

function deleteTodosFromUI$Str(e) {
  if (e.target.className === 'bi bi-file-x') {
    e.target.parentElement.parentElement.remove();
    let content =
      e.target.parentElement.parentElement.firstElementChild.textContent.trim();
    deleteFromStr(content);
  }
}

function deleteFromStr(paramsContent) {
  let todos = getTodosFromStorage(localStorage.getItem('selector'));

  todos.forEach(function (todo, index) {
    if (todo === paramsContent) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem(localStorage.getItem('selector'), JSON.stringify(todos));
}
