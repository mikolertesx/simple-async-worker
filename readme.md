# Async Worker

This is a very small asynchronus worker, it takes in promises and asks you how much tasks should it do at the same time.

## Examples

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
```
Since we've specified that it only does one task at the same time, the last one will have to wait for the first one to finish.

It uses a queue in order to do that.

That's the library, there's no extra functionality than that, and it's extremely small.