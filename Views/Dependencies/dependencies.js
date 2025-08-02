const express = require(`express`);
const mongoose = require(`mongoose`);
const path = require(`path`);
const ejs = require(`ejs`);
const ejsMate = require(`ejs-mate`);
const app = express();

module.exports = { express, mongoose, app, path, ejs, ejsMate };
