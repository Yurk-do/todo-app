class TodoState {
  constructor() {
    this.InProcess = "in-process";
    this.Done = "done";
    this.Posponed = "postponed";
  }
}

const todoState = new TodoState();
Object.freeze(todoState);

export default todoState;
