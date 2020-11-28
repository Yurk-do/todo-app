import { getTodoInput } from "./helpers.js";
import Todo from "./module/todo.js";
import todoStorage from "./module/todoStorage.js";

function addTodoHandler(doc) {
  console.log("add button clicked");
  const todoTextInput = getTodoInput(doc);
  todoStorage.save(new Todo(todoTextInput.value));
  todoTextInput.value = "";
  console.log(todoStorage);

  // Создание собственного события
  const todoItemCreated = new Event("todo-item-created");
  doc.dispatchEvent(todoItemCreated);
}

function clearFormHandler(doc) {
  console.log("clear button clicked");
  const todoTextInput = getTodoInput(doc);
  todoTextInput.value = "";
}

function updateTotalTodoCount(doc) {
  console.log("updating Total Todo Count");
  const h2 = doc.getElementById("todo-counter");
  h2.innerHTML = `Total Todo Count: ${todoStorage.totalTodoCount()}`;
}

function createTodoElement(doc, todo) {
  const todoItem = doc.createElement("div");
  todoItem.className = "item";
  todoItem.innerHTML = JSON.stringify(todo);

  return todoItem;
}

function updateTodoList(doc) {
  console.log("Updating Todo List");

  const todoListElement = doc.querySelector(".todo-list");

  // удаление всех потомков элемента
  todoListElement.replaceChildren();

  todoStorage.getAllTodo().forEach((todo) => {
    const todoElement = createTodoElement(doc, todo);
    todoListElement.append(todoElement);
  });
}

function setupEventListenerByName(doc, elementId, eventName, handler) {
  const element = doc.getElementById(elementId);
  element.addEventListener(eventName, handler);
}
function setupEventListener(element, eventName, handler) {
  element.addEventListener(eventName, handler);
}

function describeEventListeners(doc) {
  return [
    {
      elementId: "add-todo-button",
      eventName: "click",
      handler: addTodoHandler.bind(null, doc),
    },
    {
      elementId: "clear-todo-button",
      eventName: "click",
      handler: clearFormHandler.bind(null, doc),
    },
    {
      element: doc,
      eventName: "todo-item-created",
      handler: updateTotalTodoCount.bind(null, doc),
    },
    {
      element: doc,
      eventName: "todo-item-created",
      handler: updateTodoList.bind(null, doc),
    },
  ];
}

export function setupEventListeners(doc) {
  console.log("Setting up event listeners");

  describeEventListeners(doc).forEach((h) => {
    if (h.element === undefined) {
      setupEventListenerByName(doc, h.elementId, h.eventName, h.handler);
    } else {
      setupEventListener(h.element, h.eventName, h.handler);
    }
  });
}
