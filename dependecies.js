const express = require(`express`);
const app = express();
const path = require(`path`);
const ejsMate = require(`ejs-mate`);
const fs = require(`fs`);

module.exports = {
  express,
  app,
  path,
  ejsMate,
  fs,
};
