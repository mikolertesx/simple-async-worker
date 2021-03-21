class SimpleAsyncWorker {
  // Default value constructor.
  constructor(
    { maxAsyncTasks = 4, onDone = null } = { maxAsyncTasks: 4, onDone: null }
  ) {
    this._tasks = [];
    this._maxAsyncTasks = maxAsyncTasks;
    this._currentJobs = 0;
    this._onDone = onDone;
    this._onAwait = null;
  }
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
          if (this._onAwait) {
            this._onAwait();
          }
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
    return this._tasks.length === 0 && this._currentJobs === 0;
  }
  get currentJobs() {
    return this._currentJobs;
  }
  get tasks() {
    return [...this._tasks];
  }
  waitFinish() {
    if (this.isDone) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      this._onDone = resolve;
    });
  }
}

module.exports = SimpleAsyncWorker;
