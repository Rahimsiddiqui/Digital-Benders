const express = require(`express`);
const app = express();
const path = require(`path`);
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const helmet = require("helmet");
const User = require("./models/User");
const ejsMate = require(`ejs-mate`);
const mongoose = require(`mongoose`);
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
  jwt,
  bcrypt,
  mongoose,
  helmet,
  User,
};
