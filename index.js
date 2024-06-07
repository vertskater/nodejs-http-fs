"use strict";
const fs = require("fs");
const http = require("http");
const port = 3000;

const routes = ["/contact-me", "/about", "/"];

const readFile = (filename, res) => {
  fs.readFile(filename, (err, data) => {
    if (!err && data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    }
    res.writeHead(404, { "Content-Type": "text/html" });
    console.error("Sorry, something went wrong");
    return res.end();
  });
};

http
  .createServer((req, res) => {
    const baseUrl = "http://" + req.headers.host + "/";
    const url = new URL(req.url, baseUrl);
    const filename = "." + url.pathname + ".html";
    if (!routes.includes(url.pathname)) {
      readFile("404.html", res);
      return;
    }
    if (url.pathname === "/") {
      readFile("index.html", res);
      return;
    }
    readFile(filename, res);
  })
  .listen(port);
