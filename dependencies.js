const express = require(`express`);
const app = express();
const path = require(`path`);
const helmet = require(`helmet`);
const ejsMate = require(`ejs-mate`);
const fs = require(`fs`);

function loadJSON(file) {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", file), "utf-8")
  );
}

function saveJSON(file, data) {
  const filePath = path.join(__dirname, "data", file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = {
  express,
  app,
  path,
  ejsMate,
  fs,
  saveJSON,
  loadJSON,
  helmet,
};
