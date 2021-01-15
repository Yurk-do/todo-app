import { createElement, clearRootElement } from "../../helpers.js";
import getBackToHomeButton from "../../events/statPageEvents.js";

function renderStatisticBlock(
  doc,
  totalCount,
  totalInProcess,
  totalPostpone,
  totalComlpete
) {
  const statBlock = createElement(doc, "div");
  statBlock.id = "stat-block";
  const countAllTodo = createElement(doc, "p", "statistic-info");
  countAllTodo.innerHTML = `All TODOs: ${totalCount}`;
  const countInProcess = createElement(doc, "p", "statistic-info");
  countInProcess.innerHTML = `TODOs In process: ${totalInProcess}`;
  const countPostpone = createElement(doc, "p", "statistic-info");
  countPostpone.innerHTML = `TODOs Postponed: ${totalPostpone}`;
  const countDone = createElement(doc, "p", "statistic-info");
  countDone.innerHTML = `TODOs Completed: ${totalComlpete}`;
  statBlock.append(countAllTodo);
  statBlock.append(countInProcess);
  statBlock.append(countPostpone);
  statBlock.append(countDone);

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
  totalInProcess
) {
  const rootElement = clearRootElement(doc);

  const container = createElement(doc, "div");
  container.id = "container-statistic";

  const backButton = renderBackButton(doc);

  container.append(
    renderStatisticBlock(
      doc,
      totalCount,
      totalPostpone,
      totalComlpete,
      totalInProcess
    )
  );
  container.append(backButton);
  rootElement.append(container);
  backButton.addEventListener("click", getBackToHomeButton);
}
