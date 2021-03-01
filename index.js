class SimpleAsyncWorker {
  constructor({ maxAsyncTasks = 4 }) {
    this.tasks = [];
    this.maxAsyncTasks = maxAsyncTasks;
    this.currentJobs = 0;
  }
  addTask(promise) {
    this.tasks.push(promise);
    this.work();
  }
  work() {
    if (this.currentJobs < this.maxAsyncTasks) {
      const newTask = this.tasks.shift();
      if (!newTask) {
        // No more tasks have been queued up.
        return;
      }
      this.currentJobs++;
      (async () => {
        await newTask();
        this.currentJobs--;
        this.work();
      })();
    }
  }
}

module.exports = SimpleAsyncWorker;
