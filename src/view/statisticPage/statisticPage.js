import { createElement, clearRootElement } from "../../helpers.js";
import configureRouter from "../../routerConfig.js";

function renderStatisticBlock(
  doc,
  totalCount,
  totalPostpone,
  totalComlpete,
  totalDelete
) {
  const statBlock = createElement(doc, "div");
  statBlock.id = "stat-block";
  const countAllTodo = createElement(doc, "p", "statistic-info");
  countAllTodo.innerHTML = `All TODOs: ${totalCount}`;
  const countPostpone = createElement(doc, "p", "statistic-info");
  countPostpone.innerHTML = `TODOs Postponed: ${totalPostpone}`;
  const countDone = createElement(doc, "p", "statistic-info");
  countDone.innerHTML = `TODOs Completed: ${totalComlpete}`;
  const countDelete = createElement(doc, "p", "statistic-info");
  countDelete.innerHTML = `TODOs Deleted: ${totalDelete}`;
  statBlock.append(countAllTodo);
  statBlock.append(countPostpone);
  statBlock.append(countDone);
  statBlock.append(countDelete);

  return statBlock;
}

function renderBackButton(doc) {
  const button = createElement(doc, "button", "back-button-stat-page");
  button.innerHTML = "Back to list";
  return button;
}

export default function renderStatisticPage(
  doc,
  totalCount,
  totalPostpone,
  totalComlpete,
  totalDelete
) {
  const rootElement = clearRootElement(doc);

  const container = createElement(doc, "div");
  container.id = "container-statistic";

  const backButton = renderBackButton(doc);

  backButton.addEventListener("click", (e) => {
    e.preventDefault();
    const router = configureRouter(doc, "/");
    router.navigate("/");
  });

  container.append(
    renderStatisticBlock(
      doc,
      totalCount,
      totalPostpone,
      totalComlpete,
      totalDelete
    )
  );
  container.append(backButton);

  rootElement.append(container);
}
