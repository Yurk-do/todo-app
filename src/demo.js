function sayHi1() {
  console.log("Hi!!!!!!!!");
}
function sayHi2() {
  console.log("Hello!!!!!!!!");
}

function runner(callback1, callback2) {
  const random = Math.random() * 100;
  random < 50 ? callback1() : callback2();
}

export function demo() {
  console.log("Demo");
  runner(sayHi1, sayHi2);
}
