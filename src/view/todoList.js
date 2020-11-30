import { createElement } from "../helpers.js";
import renderTodoItem from "./todo.js";

function renderEmptyPlaceHolder(doc) {
  const emptyList = createElement(doc, "div", "empty-list");
  emptyList.innerHTML = "Nothing to do";

  return emptyList;
}

export default function renderTodoList(doc, allTodo) {
  const todoListElement = doc.querySelector(".todo-list");

  // удаление всех потомков элемента
  todoListElement.replaceChildren();

  if (allTodo.length === 0) {
    todoListElement.append(renderEmptyPlaceHolder(doc));
  } else {
    allTodo.forEach((todo) => {
      const todoElement = renderTodoItem(doc, todo);
      todoListElement.prepend(todoElement);
    });
  }
}
