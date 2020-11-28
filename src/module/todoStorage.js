import todo from "./todo.js";

class TodoStorage {
  constructor() {
    this.storage = [];
  }

  save(todoItem) {
    this.storage.push(todoItem);
  }

  totalTodoCount() {
    return this.storage.length;
  }
  //   Копия массива с тудухами
  getAllTodo() {
    return this.storage.map((todo) => ({
      text: todo.text,
      state: todo.state,
      dateCreated: new Date(todo.dateCreated),
      dateCompleted:
        todo.dateCompleted !== null ? new Date(todo.dateCompleted) : null,
    }));
  }
}

const todoStorage = new TodoStorage();
export default todoStorage;
