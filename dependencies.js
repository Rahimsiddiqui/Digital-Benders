// CORE & THIRD-PARTY DEPENDENCIES
const express = require(`express`);
const app = express();
const path = require(`path`);
const helmet = require(`helmet`);
const ejsMate = require(`ejs-mate`);
const mongoose = require(`mongoose`);
const fs = require(`fs`);

// MODELS
const Blog = require(`./models/Blog`);
const CaseStudy = require(`./models/CaseStudy`);

// FUNCTIONS
function loadJSON(file) {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "data", file), "utf-8")
  );
}

function saveJSON(file, data) {
  const filePath = path.join(__dirname, "data", file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function slugify(title) {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function formatDate(dateObj) {
  if (!dateObj) return "";
  const d = new Date(dateObj);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

module.exports = {
  fs,
  app,
  path,
  helmet,
  ejsMate,
  express,
  mongoose,

  slugify,
  saveJSON,
  loadJSON,
  formatDate,

  Blog,
  CaseStudy,
};
