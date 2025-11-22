const mongoose = require("mongoose");

const caseStudySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true }, // URL-friendly ID
  src: String, // Thumbnail image
  industry: String,
  explanation: String,

  // Nested Post Content
  post: {
    title: String,
    videoSrc: String,

    problemTitle: String,
    problemText: String,
    problemImage: String,

    solutionTitle: String,
    solutionText: String,
    solutionImage: String,

    resultsText: String,
    strategyText: String,

    // Array of Outcomes
    outcomes: [
      {
        value: String,
        text: String,
      },
    ],
  },

  // Array of Services used
  caseStudyServices: [
    {
      src: String,
      text: String,
    },
  ],
});

module.exports = mongoose.model("CaseStudy", caseStudySchema);
