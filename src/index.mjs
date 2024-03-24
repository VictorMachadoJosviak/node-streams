import csv from "csv-parser";
import fs from "fs";
import { Transform, Writable } from "stream";

const path = `${process.cwd()}/recipes_data.csv`;

const readableStream = fs.createReadStream(path);
const csvParser = csv({
  separator: ",",
});

const transform = new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    callback(null, JSON.stringify(chunk));
  },
});

const writable = new Writable({
  objectMode: true,
  write(chunk, encoding, callback) {
    const data = JSON.parse(chunk.toString());
    console.log(data);
    callback(null);
  },
});

const start = Date.now();

readableStream.pipe(csvParser).pipe(transform).pipe(writable);

readableStream.on("close", () => {
  const elapsed = Date.now() - start;
  const total = elapsed / 1000;

  console.log(`Finalizado em: ${total}s`);
});
