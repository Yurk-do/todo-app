import Todo from "./model/todo.js";

const apiRoot = "http://localhost:3000";

async function createTodo(todoText) {
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
  const addedTodo = await addResponse.json();

  return addedTodo.id;
}

async function getAllTodo() {
  const allTodoResponse = await fetch(`${apiRoot}/todos/`);

  if (!allTodoResponse.ok) {
    console.log(`Error with status: ${allTodoResponse.status}`);
    return;
  }
  console.log(`Ok with status: ${allTodoResponse.status}`);
  return await allTodoResponse.json();
}

function convertToTodo(todoDto) {
  const todo = new Todo(todoDto.text);
  todo.state = todoDto.state;
  todo.dateCreated = new Date(todoDto.dateCreated);
  todo.dateCompleted =
    todoDto.dateCompleted === null ? null : new Date(todoDto.dateCompleted);
  return todo;
}

async function updateTodo(todoId, todo) {
  const updateResponse = await fetch(`${apiRoot}/todos/${todoId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

  if (!updateResponse.ok) {
    console.log(`Error with status: ${updateResponse.status}`);
    return;
  }
  console.log(`Ok with status: ${updateResponse.status}`);
  const updateTodo = await updateResponse.json();

  return updateTodo.id;
}

async function patchTodo(todoId, patch) {
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
  const patchTodo = await patchResponse.json();

  return patchTodo.id;
}

async function postponeById(id, todo) {
  todo.postpone();
  const patch = { state: todo.state };
  return await patchTodo(id, patch);
}

async function resumeById(id, todo) {
  todo.resume();
  const patch = { state: todo.state };
  return await patchTodo(id, patch);
}

async function completeById(id, todo) {
  todo.done();
  const patch = { state: todo.state, dateCompleted: todo.dateCompleted };
  return await patchTodo(id, patch);
}

export async function netDemo() {
  const todoNumber = Math.trunc(Math.random() * 1000);
  const newTodoId = await createTodo(`One more demo record ${todoNumber}`);
  console.log(`==> ${newTodoId}`);

  const allTodo = await getAllTodo();

  const changedTodoPosition = Math.trunc(Math.random() * allTodo.length);
  const todoDto = allTodo[changedTodoPosition];
  const changedTodoId = todoDto.id;
  const todo = convertToTodo(todoDto);

  console.log(todo);
  // todo.done();
  // postponeById(changedTodoId, todo);
  // resumeById(changedTodoId, todo);
  completeById(changedTodoId, todo);
  console.log(todo);

  // const id = await updateTodo(changedTodoId, todo);
  const id = await patchTodo(changedTodoId, todo);
  console.log(`====> ${id}`);
}
