require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const CaseStudy = require("../models/CaseStudy");

const slugify = (text) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};

const jsonPath = path.join(__dirname, "../data/portfolio/data.json");

const seedDB = async () => {
  try {
    if (!fs.existsSync(jsonPath))
      throw new Error(`File not found: ${jsonPath}`);
    const rawData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    const studiesList = rawData.caseStudies;

    if (!studiesList)
      throw new Error("JSON does not contain 'caseStudies' key");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await CaseStudy.deleteMany({});
    console.log("🗑️  Old Case Studies cleared");

    const studiesToInsert = studiesList.map((study) => ({
      ...study,
      slug: slugify(study.title),
    }));

    await CaseStudy.insertMany(studiesToInsert);
    console.log(
      `🚀 Successfully uploaded ${studiesToInsert.length} Case Studies!`
    );

    process.exit();
  } catch (err) {
    console.error("❌ Error: ", err);
    process.exit(1);
  }
};

seedDB();
