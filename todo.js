
// object which holds properties and methods of todo list
let todoApp = {
  // todo items in an array
  todoItems: [],
  // object method for adding new todo items
  addTodoItem: function (todoDescription) {
    this.todoItems.push({
      // each todo item is defined as an object to hold more properties not only text
      todoDescription: todoDescription,      // text of the todo item
      completed: false        // default value for todo item is not completed
    });
  },
  // object method for changing the todo item
  changeTodoItem: function (index, todoDescription) {
    this.todoItems[index].todoDescription = todoDescription;
  },
  // object method for deleting todo item
  deleteTodoItem: function (index) {
    this.todoItems.splice(index, 1);  // deletes only one item
  },
  // object method for completing todo item
  toggleCompleted: function(index) {
    let item = this.todoItems[index];   // var in which the todo item is saved
    item.completed = !item.completed;   // flips the boolean of todo item
  },
  toggleAllItems: function() {
    // variable which stoes number of all to do items
    let allTodoItems = this.todoItems.length;
    // variable that stores number of all completed items
    let allCompletedItems = 0;
    // to get a number of all completed todos:
    this.todoItems.forEach(function(item) {
      if (item.completed === true) {
        allCompletedItems++;
      }
    })
    /* if every to do items is completed, flip them to uncompleted state
    from true to false */
    this.todoItems.forEach(function(item) {
      // using ternary operater
      (allTodoItems === allCompletedItems) ? item.completed = false
      : item.completed = true;
    });

  },
};

// Object with functions which we can acces from html for onclick buttons
// Less lines and repetition of code, variables which contain elements and less event listeners
let handlerMethods = {
  toggleAllItems: function() {
    todoApp.toggleAllItems();
    // update the list after every change
    showList.displayTodoItems();
  },
  addTodoItem: function() {
    let addTodoText = document.getElementById("addTodoText");
    todoApp.addTodoItem(addTodoText.value);
    // clearing the input line for the next item
    addTodoText.value= "";
    showList.displayTodoItems();
  },
  changeTodoItem: function() {
    let changeTodoIndex = document.getElementById("changeTodoIndex");
    let changeTodoText = document.getElementById("changeTodoText");
    todoApp.changeTodoItem(changeTodoIndex.valueAsNumber, changeTodoText.value);
    // clearing the input line for the next item
    changeTodoIndex.value = "";
    changeTodoText.value = "";
    showList.displayTodoItems();
  },
  deleteTodoItem: function(index) {
    todoApp.deleteTodoItem(index);
    showList.displayTodoItems();
  },
  toggleCompleted: function() {
    let toggleCompletedIndex = document.getElementById("toggleCompletedIndex");
    todoApp.toggleCompleted(toggleCompletedIndex.valueAsNumber);
    // clearing the input line for the next item
    toggleCompletedIndex.value = "";
    showList.displayTodoItems();
  },
  toggleAll: function() {
    todoApp.toggleAllItems();
    showList.displayTodoItems();
  }
};

// Object with methods for displaying items in a list
let showList = {
  displayTodoItems: function () {
    let todoList = document.querySelector("ul");
    // clears list before showing the to do items
    todoList.innerHTML = "";
    // goes through every item inside todoItems list
    todoApp.todoItems.forEach(function(item, position) {
      // defines a variable which holds method for creating an list item inside an unordered list
      let todoListItem = document.createElement("li");
      let todoItem = "";
      // if completed print todoDescription with (x), otherwise with ( )
      // again using ternary operater instead of if/else - less code
      (item.completed === true) ? todoItem = "(x) " + item.todoDescription
      : todoItem = "( ) " + item.todoDescription;
      /* adding an id attr which coresponds with its index to every list item
      so it can be connected with other functions
      */
      todoListItem.id = position;
      // adding the text from the todo item to the list item
      todoListItem.textContent = todoItem;
      // adding the delete button to every list with todo item
      todoListItem.appendChild(this.addDeleteButton());
      // append the list item with todo description to the list element
      todoList.appendChild(todoListItem);
    }, this);  /* this is an optional arg in forEach which refers to object in which it sits
              better to use because it can work even if I change the object name later
              - happens because anonymous function inside forEach isn' method of Object
              so this doesn't refer to object */
  },
  // method to create a button used for deleting todo items
  addDeleteButton: function() {
    let deleteButton = document.createElement('button');
    // giving the button a text inside of it
    deleteButton.textContent = 'Delete';
    // adding a class name to a button
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  // method for adding event listeners on every list item using event delegation
  manageEventListeners: function() {
    let todoList = document.querySelector('ul');

    todoList.addEventListener('click', function(event) {
    // variable that stores the clicked element
    let clickedElement = event.target;
    // check if elementClicked is a delete button
    if (clickedElement.className === 'deleteButton') {
      // Run handlers.deleteTodo to delete todo items next ot clicked button
      // parseInt turns string into integer
      handlerMethods.deleteTodoItem(parseInt(clickedElement.parentNode.id));
      }
    });
  }
};

// starts event listening
showList.manageEventListeners();
