export function netDemo() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export function netDemo() {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.text())
    .then((text) => console.log(text));
}

export async function netDemo() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    console.log(`Error with status: ${response.status}`);
    return;
  }
  console.log(`Ok with status: ${response.status}`);
  const json = await response.json();
  console.log(json.filter((todo) => todo.id > 10 && todo.id < 15));
}

// Добавление объекта с помощью fetch

export async function netDemo() {
  const todoSave = { userId: 1, id: 3, title: "IT-academy", completed: false };

  const addResponse = await fetch(
    "https://jsonplaceholder.typicode.com/todos",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todoSave),
    }
  );

  console.log(`Ok with status: ${addResponse.status}`);
  const data = await addResponse.json();
  console.log(data);

  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    console.log(`Error with status: ${response.status}`);
    return;
  }
  console.log(`Ok with status: ${response.status}`);
  const json = await response.json();
  console.log(json.filter((todo) => todo.id === 201));
}
