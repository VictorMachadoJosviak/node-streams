import { parentPort } from "node:worker_threads";

parentPort.once("message", (msg) => {
  console.log("processo filho: ", msg);
});

parentPort.postMessage("volta pro pai");
