class SimpleAsyncWorker {
  // Default value constructor.
  constructor(
    { maxAsyncTasks = 4, onDone = null } = { maxAsyncTasks: 4, onDone: null }
  ) {
    this._tasks = [];
    this._maxAsyncTasks = maxAsyncTasks;
    this._currentJobs = 0;
    this._onDone = onDone;
  }
  // TODO Return a promise that starts when the current tasks begins.
  addTask(promise) {
    this._tasks.push(promise);
    this.work();
  }
  work() {
    if (this._currentJobs < this._maxAsyncTasks) {
      const newTask = this._tasks.shift();
      if (!newTask) {
        // No more tasks have been queued up.
        if (this._onDone && this._currentJobs === 0) {
          this._onDone();
        }
        return;
      }
      this._currentJobs++;
      (async () => {
        await newTask();
        this._currentJobs--;
        this.work();
      })();
    }
  }
  get isDone() {
    return this._tasks.length === 0;
  }
  get currentJobs() {
    return this._currentJobs;
  }
  get tasks() {
    return [...this._tasks];
  }
}

module.exports = SimpleAsyncWorker;
