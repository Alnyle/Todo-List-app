
// selector
const todoInput = document.querySelector('#todo-input');
const todoBtn = document.querySelector('#todo-btn');
const todoList = document.querySelector('.todo-list');
const fileOption = document.querySelector('.filter-todo')


// Event Listener
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
fileOption.addEventListener('click', filterTodo);

// Function
function addTodo(event) { 
    // prevent form from submitting
    event.preventDefault();

    /* --- Create Todo DIV --- */ 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    /* --- create li --- */
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    // append the newTodo to todoDiv
    todoDiv.appendChild(newTodo);

    /* --- check button --- */
    // create check button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    // add class name to check button
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);

    /* --- trash button --- */
    // create trash button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';

    // add class name to check button
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    // append To List
    todoList.appendChild(todoDiv);
    
    // clear the input field (Todo Input value)
    todoInput.value = '';
};

function deleteCheck(e) {
    const item = e.target;
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        // remove animation
        todo.classList.add("fall");
        // todo.remove();

        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
};

function filterTodo(e) {
    const todos = todoList;
    console.log(todos);
}