
// selector
const todoInput = document.querySelector('#todo-input');
const todoBtn = document.querySelector('#todo-btn');
const todoList = document.querySelector('.todo-list');
const fileOption = document.querySelector('.filter-todo')


// Event Listener

document.addEventListener('DOMContentLoaded', getTodos);

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


    saveToLocal(todoInput.value);

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
        removeFromLocal(todo);
        // after transition animation end it will remove the node or the item
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
};


// Function to filter todos based on the selected option
function filterTodo(e) {

    // Get the list of todos
    const todos = todoList.childNodes;
    
     // Loop through each todo using forEach
    todos.forEach(function(todo) {
        // Switch statement based on the selected filter option
        switch(e.target.value) {
            // Show all todos => nothing to do
            case "All":
                todo.style.display = "flex";
                break;
            case "Completed":
                // Check if todo has 'completed' class
                if (todo.classList.contains('completed')) {
                    // If completed, display the todo
                    todo.style.display = "flex";
                }
                else {
                    // If not completed, hide the todo
                    todo.style.display = "none";
                }
                break;

            case "Uncompleted":
                // Check if todo does not have 'completed' class
                if (todo.classList.contains('completed')) {
                    // If not completed, display the todo
                    todo.style.display = "none";
                }
                else {
                    // If completed, hide the todo
                    todo.style.display = "flex";
                }
                break;
        }
    });
}


// save todo items in local storage
function saveToLocal(todo) {

    // check if we already have items in local storage
    let todos;
    // if local storage empty create an empty array to store todo items
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        // else convert todos NodeList into array so we push the new item in it
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
    let todos;
    // check if we already have items in local storage
    // if local storage empty create an empty array to store todo items
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        // else convert todos NodeList into array so we push the new item in it
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
          /* --- Create Todo DIV --- */ 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    /* --- create li --- */
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
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
    })


}

function removeFromLocal(todo) {

    // check if we already have items in local storage
    let todos;
    // if local storage empty create an empty array to store todo items
    if(localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        // else convert todos NodeList into array so we push the new item in it
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos', JSON.stringify(todos));

    
}