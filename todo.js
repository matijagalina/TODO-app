
// object which holds properties and methods of todo list
let todoApp = {
  // todo items in an array
  todoItems: [],
  // object method for displaying todo list items
  displayTodoItems: function() {
    // If there is no items in todo list (length === 0) notify the user
    if (this.todoItems.length === 0) {
      console.log("There is nothing to do!");
    // if there is items in todo list go through the list and display the items
    } else {
      console.log('Stuff to do: ');
      for (let i = 0; i < this.todoItems.length; i++) {
        if (this.todoItems[i].completed === true) {
          console.log("(x)", this.todoItems[i].todoDescription);  // if completed print with (x)
        } else {
          console.log("( )", this.todoItems[i].todoDescription);  //if not completed print with ( )
        }
      }
    }
  },
  // object method for adding new todo items
  addTodoItem: function (todoDescription) {
    this.todoItems.push({
      // each todo item is defined as an object to hold more properties not only text
      todoDescription: todoDescription,      // text of the todo item
      completed: false        // default value for todo item is not completed
    });
    this.displayTodoItems();
  },
  // object method for changing the todo item
  changeTodoItem: function (index, todoDescription) {
    this.todoItems[index].todoDescription = todoDescription;
    this.displayTodoItems();
  },
  // object method for deleting todo item
  deleteTodoItem: function (index) {
    this.todoItems.splice(index, 1);  // deletes only one item
    this.displayTodoItems();
  },
  // object method for completing todo item
  toggleCompleted: function(index) {
    let item = this.todoItems[index];   // var in which the todo item is saved
    item.completed = !item.completed;   // flips the boolean of todo item
    this.displayTodoItems();
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
    this.displayTodoItems();
  },
};

/*
Object with functions which we can acces from html for onclick buttons
Less lines and repetition of code, variables which contain elements and less event listeners
*/
var handlerMethods = {
  displayTodoItems: function() {
    todoApp.displayTodoItems();
  },
  toggleAllItems: function() {
    todoApp.toggleAllItems();
  },
  addTodoItem: function() {
    var addTodoText = document.getElementById("addTodoText");
    todoApp.addTodoItem(addTodoText.value);
    // clearing the input line for the next item
    addTodoText.value= "";
  },
  changeTodoItem: function() {
    var changeTodoIndex = document.getElementById("changeTodoIndex");
    var changeTodoText = document.getElementById("changeTodoText");
    todoApp.changeTodoItem(changeTodoIndex.valueAsNumber, changeTodoText.value);
    // clearing the input line for the next item
    changeTodoIndex.value = "";
    changeTodoText.value = "";
  },
  deleteTodoItem: function() {
    var deleteTodoIndex = document.getElementById("deleteTodoIndex");
    todoApp.deleteTodoItem(deleteTodoIndex.valueAsNumber);
    // clearing the input line for the next item
    deleteTodoIndex.value="";
  },
  toggleCompleted: function() {
    var toggleCompletedIndex = document.getElementById("toggleCompletedIndex");
    todoApp.toggleCompleted(toggleCompletedIndex.valueAsNumber);
    // clearing the input line for the next item
    toggleCompletedIndex.value = "";
  },
  toggleAll: function() {
    todoApp.toggleAllItems();
  }
};
