import Todo from "./todo.js";

const apiRoot = "http://localhost:3000";

class TodoStorage {
  constructor() {
    this.postponeCount = 0;
    this.completeCount = 0;
    this.deleteCount = 0;
  }

  async createTodo(todoText) {
    const todo = new Todo(todoText);

    const addResponse = await fetch(`${apiRoot}/todos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    if (!addResponse.ok) {
      console.log(`Error with status: ${addResponse.status}`);
      return;
    }
    console.log(`Ok with status: ${addResponse.status}`);
  }

  totalTodoCount() {
    return this.todoCount;
  }

  totalPostponeCount() {
    return this.postponeCount;
  }
  totalCompleteCount() {
    return this.completeCount;
  }
  totalDeleteCount() {
    return this.deleteCount;
  }

  convertToViewDto(todoDto) {
    return {
      id: todoDto.id,
      text: todoDto.text,
      state: todoDto.state,
      dateCreated: new Date(todoDto.dateCreated),
      dateCompleted:
        todoDto.dateCompleted !== null ? new Date(todoDto.dateCompleted) : null,
    };
  }

  convertToTodo(todoDto) {
    const todo = new Todo(todoDto.text);
    todo.state = todoDto.state;
    todo.dateCreated = new Date(todoDto.dateCreated);
    todo.dateCompleted =
      todoDto.dateCompleted === null ? null : new Date(todoDto.dateCompleted);
    return todo;
  }

  async getTodoDtoById(id) {
    const todoResponse = await fetch(`${apiRoot}/todos/${id}`);
    if (!todoResponse.ok) {
      console.log(`Error with status: ${todoResponse.status}`);
      return;
    }
    console.log(`Ok with status: ${todoResponse.status}`);

    return await todoResponse.json();
  }

  async getTodoById(id) {
    return this.convertToViewDto(await this.getTodoDtoById(id));
  }

  async patchTodo(todoId, patch) {
    const patchResponse = await fetch(`${apiRoot}/todos/${todoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });

    if (!patchResponse.ok) {
      console.log(`Error with status: ${patchResponse.status}`);
      return;
    }
    console.log(`Ok with status: ${patchResponse.status}`);
    const patchedTodo = await patchResponse.json();

    return patchedTodo.id;
  }
  async postponeById(id) {
    const todo = this.convertToTodo(this.getTodoDtoById(id));
    todo.postpone();
    const patch = { state: todo.state };
    this.postponeCount += 1;
    return await this.patchTodo(id, patch);
  }

  async resumeById(id) {
    const todo = this.convertToTodo(this.getTodoDtoById(id));
    todo.resume();
    const patch = { state: todo.state };
    this.postponeCount -= 1;
    return await this.patchTodo(id, patch);
  }

  async completeById(id) {
    const todo = this.convertToTodo(this.getTodoDtoById(id));
    todo.done();
    const patch = { state: todo.state, dateCompleted: todo.dateCompleted };
    this.completeCount += 1;
    return await this.patchTodo(id, patch);
  }

  async deleteById(id) {
    const deleteResponse = await fetch(`${apiRoot}/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!deleteResponse.ok) {
      console.log(`Error with status: ${deleteResponse.status}`);
      return;
    }
    console.log(`Ok with status: ${deleteResponse.status}`);
    this.deleteCount += 1;
  }

  async getAllTodo() {
    const allTodoResponse = await fetch(`${apiRoot}/todos/`);

    if (!allTodoResponse.ok) {
      console.log(`Error with status ${allTodoResponse.status}`);
      return;
    }

    console.log(`Ok with status ${allTodoResponse.status}`);

    const returnedDto = await allTodoResponse.json();

    this.todoCount = returnedDto.length;

    return returnedDto.map((dto) => this.convertToViewDto(dto));
  }
}

const todoStorage = new TodoStorage();

export default todoStorage;
