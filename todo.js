
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
    for (let i =0; i < allTodoItems; i++) {
      if (this.todoItems[i].completed === true) {
        allCompletedItems++;
      }
    }
    /* if every to do items is completed, flip them to uncompleted state
    from true to false */
    if (allTodoItems === allCompletedItems) {
      for (let j = 0; j < allTodoItems; j++) {
        this.todoItems[j].completed = false;
      }
    // in every other situation make everything completed
    } else {
      for (let h = 0; h < allTodoItems; h++) {
        this.todoItems[h].completed = true;
      }
    }
  },
};

// Functions which we can acces from html for onclick buttons
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
  deleteTodoItem: function() {
    let deleteTodoIndex = document.getElementById("deleteTodoIndex");
    todoApp.deleteTodoItem(deleteTodoIndex.valueAsNumber);
    // clearing the input line for the next item
    deleteTodoIndex.value="";
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
var showList = {
  displayTodoItems: function () {
    var todoList = document.querySelector("ul");
    // clears list before showing the to do items
    todoList.innerHTML = "";
    for(var i = 0; i < todoApp.todoItems.length; i++) {
      var todoListItem = document.createElement("li");
      var todo = todoApp.todoItems[i];
      var todoItem = "";

      // if completed print todoText with (x) otherwise with ( )
      if (todo.completed === true) {
        todoItem = "(x) " + todo.todoDescription;
      } else {
        todoItem = "( ) " + todo.todoDescription;
      }

      // adding the text from the todo item to the list item
      todoListItem.textContent = todoItem;
      // append the list item with todo description to the list element
      todoList.appendChild(todoListItem);
    }
  }
};
