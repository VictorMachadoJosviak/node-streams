import { availableParallelism } from "node:os";
import { Worker } from "node:worker_threads";

const path = `${process.cwd()}/src/child.mjs`;

const array = new Array(150000);

const numCPUs = availableParallelism();

const pageSize = array.length / numCPUs;

for (let page = 1; page <= numCPUs; page++) {
  const worker = new Worker(path);

  const slicedArray = array.slice((page - 1) * pageSize, page * pageSize);

  worker.postMessage(slicedArray);

  worker.on("message", (msg) => {
    console.log("mensagem que chegou do filho", msg);
  });
}
