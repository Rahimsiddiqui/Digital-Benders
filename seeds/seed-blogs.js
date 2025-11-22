require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Blog = require("../models/Blog");

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

const parseDate = (dateStr) => {
  if (!dateStr) return new Date();
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
};

const jsonPath = path.join(__dirname, "../data/blogs/blogs.json");

const seedDB = async () => {
  try {
    if (!fs.existsSync(jsonPath))
      throw new Error(`File not found: ${jsonPath}`);
    const rawData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Blog.deleteMany({});
    console.log("🗑️  Old database data cleared");

    const uniqueBlogsMap = new Map();

    rawData.forEach((b) => {
      const slug = slugify(b.title);

      if (!uniqueBlogsMap.has(slug)) {
        uniqueBlogsMap.set(slug, {
          title: b.title,
          slug: slug,
          date: parseDate(b.date),
          views: b.views || 0,
          src: b.src,
          alt: b.alt,
          description: b.description,
          post: b.post,
        });
      } else {
        console.log(`⚠️ Skipped duplicate in JSON file: "${b.title}"`);
      }
    });

    const blogsToInsert = Array.from(uniqueBlogsMap.values());

    await Blog.insertMany(blogsToInsert);
    console.log(
      `🚀 Successfully uploaded ${blogsToInsert.length} unique blogs!`
    );

    process.exit();
  } catch (err) {
    console.error("❌ Error: ", err);
    process.exit(1);
  }
};

seedDB();
