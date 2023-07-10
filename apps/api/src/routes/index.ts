/* eslint-disable @typescript-eslint/no-var-requires */
import { FastifyInstance, HTTPMethods } from "fastify";
import fs from "fs";
import path from "path";

import Log from "../utils/log";

function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), []);
}

function getDirectories(srcpath) {
  return fs
    .readdirSync(srcpath)
    .map((file) => path.join(srcpath, file))
    .filter((path) => fs.statSync(path).isDirectory());
}

function getDirectoriesRecursive(srcpath) {
  return [
    srcpath,
    ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive)),
  ];
}

const routes = (fastify: FastifyInstance, _opts: any, next: any) => {
  // get folders and their sub folders, etc
  const directories = getDirectoriesRecursive(path.join(__dirname, "./"));

  // check if the directories contains files (end with .ts or .js), if so fastify get it, route is the path to the file from this current folder and handler is exported by default, by the way it us unvailable for this current file
  directories.forEach((directory) => {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
      // if the file is the current file and directory, skip it
      if (
        (file === "index.ts" || file === "index.js") &&
        (directory === path.join(__dirname + "/") || directory === __dirname)
      )
        return;

      if (file.endsWith(".ts") || file.endsWith(".js")) {
        // path.join(directory, file), remove dirname from it, remove .ts or .js from it, replace all \ with /
        const route = path
          .join(directory, file)
          .replace(__dirname, "")
          .replace(/.ts|.js/g, "")
          .replace(/\\/g, "/")
          .replace(/\/index/g, "");
        const handler = require(path.join(directory, file));
        Object.keys(handler).forEach((method) => {
          fastify.route({
            method: method as HTTPMethods,
            url: route,
            handler: handler[method],
          });
          Log.info(`added route ${method} - ${route}`);
        });
      }
    });
  });

  next();
};

export default routes;
