import Router from "./router.js";

import todoStorage from "./model/todoStorage.js";
import renderTodoListPage from "./view/todoListPage/todoListPage.js";

import renderTodoPage from "./view/todoPage/todoPage.js";
import renderStatisticPage from "./view/statisticPage/statisticPage.js";

let router = null;

export default (doc, appRootPath) => {
  if (router !== null) {
    return router;
  }

  router = new Router([], "history", appRootPath);

  router.add(/^\/$/, () => {
    console.log("=> Navigating to page");
    renderTodoListPage(doc, todoStorage.getAllTodo());
  });

  router.add(/^todo\/(.*)$/, (todoId) => {
    const parsedTodoId = parseInt(todoId);
    console.log(`=> Navigating to todo page with id: ${parsedTodoId}`);
    renderTodoPage(doc, todoStorage.getTodoById(parsedTodoId));
  });

  router.add(/^report$/, () => {
    console.log("=> Navigating to report page");
    renderStatisticPage(
      doc,
      todoStorage.totalTodoCount(),
      todoStorage.totalPostponeCount(),
      todoStorage.totalCompleteCount(),
      todoStorage.totalDeleteCount()
    );
  });

  router.config({ mode: "history", root: "/" });

  router.listen();

  return router;
};
