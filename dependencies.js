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

function slugify(title) {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

const getCaseStudies = () => {
  const data = loadJSON("portfolio/data.json");

  data.caseStudies.forEach((study) => {
    if (!study.slug) {
      study.slug = slugify(study.title);
    }
  });

  return data;
};

module.exports = {
  express,
  app,
  path,
  ejsMate,
  fs,
  saveJSON,
  loadJSON,
  slugify,
  getCaseStudies,
  helmet,
};
