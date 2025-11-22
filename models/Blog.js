const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  // Core SEO & Meta Data
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  views: { type: Number, default: 0 },

  // Image Data
  src: String,
  alt: String,
  description: String,

  // The Complex Content Structure
  post: {
    intro: String,
    sections: [mongoose.Schema.Types.Mixed],
  },
});

module.exports = mongoose.model("Blog", blogSchema);
