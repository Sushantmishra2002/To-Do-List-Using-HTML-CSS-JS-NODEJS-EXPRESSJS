document.addEventListener('DOMContentLoaded', () => {
    loadTodos();

    document.getElementById('addTodoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo();
    });

    document.getElementById('todoList').addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            deleteTask(e.target.dataset.index);
        } else if (e.target.classList.contains('complete-btn')) {
            toggleComplete(e.target.dataset.index);
        }
    });
});

function loadTodos() {
    const todos = getTodosFromLocalStorage();
    renderTodos(todos);
}

function getTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

function setTodosToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const newTodo = document.getElementById('newTodo').value;
    if (newTodo.trim()) {
        const todos = getTodosFromLocalStorage();
        todos.push({ task: newTodo, completed: false });
        setTodosToLocalStorage(todos);
        renderTodos(todos);
        document.getElementById('newTodo').value = ''; // Clear input
    }
}

function deleteTask(index) {
    const todos = getTodosFromLocalStorage();
    todos.splice(index, 1);
    setTodosToLocalStorage(todos);
    renderTodos(todos);
}

function toggleComplete(index) {
    const todos = getTodosFromLocalStorage();
    todos[index].completed = !todos[index].completed;
    setTodosToLocalStorage(todos);
    renderTodos(todos);
}

function renderTodos(todos) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; // Clear list

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', todo.completed);
        li.innerHTML = `
            ${todo.task}
            <div>
                <button class="complete-btn" data-index="${index}">
                    <i class="fas fa-check"></i>
                </button>
                <button class="delete-btn" data-index="${index}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        todoList.appendChild(li);
    });
}
