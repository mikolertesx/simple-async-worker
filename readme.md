# Async Worker

This is a very small asynchronus worker, it takes in promises and asks you how much tasks should it do at the same time.

## Examples

### Simple use

```javascript
const worker = new AsyncWorker({maxAsyncTasks: 1});

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

### OnDone Callback

```javascript
const worker = new AsyncWorker({maxAsyncTasks: 1, onDone: () => {
	console.log("This will happen when the worker finishes.");
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

```

### Await/Async use

```javascript
const worker = new AsyncWorker({maxAsyncTasks: 1});

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

// You can use await.
await worker.waitFinish();
console.log("Finished!");

// Or then.
await worker.waitFinish().then(() => {
	console.log("Finished!");
})
```

Note, using the onDone callback, and the waitFinish is mutually exclusive, meaning that you can't use both in the same worker.
