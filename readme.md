# Async Worker

This is a very small asynchronus worker, it takes in promises and asks you how much tasks should it do at the same time.

## Examples

```javascript
// Providing onDone is optional.
const worker = new AsyncWorker({maxAsyncTasks: 1, onDone: () => {
	console.log("It ended every task!");
}});

worker.addTask(async () => {
	const data = await fetch("some page");
	await doSomethingWithData(data);
	return;
});

worker.addTask(async () => {
	const data = await fetch("some other page");
	await doSomethingWithData(data);
	return;
});

// Get if every work is done.
console.log(worker.isDone);

// Get the amount of active jobs it is doing (Not the amount of tasks left).
console.log(worker.currentJobs);

// Get an array of promises that are still unresolved.
// The array is a copy, and not a direct pointer.
console.log(worker.tasks);

```
