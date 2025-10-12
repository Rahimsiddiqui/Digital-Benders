const express = require(`express`);
const app = express();
const path = require(`path`);
const ejsMate = require(`ejs-mate`);
const fs = require(`fs`);

function loadJSON(file) {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", file), "utf-8")
  );
}

module.exports = {
  express,
  app,
  path,
  ejsMate,
  fs,
  loadJSON,
};
