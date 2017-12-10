
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
    displayTodoItems();
  }
};
