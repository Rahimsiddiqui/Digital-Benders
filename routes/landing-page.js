const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

const blogs = loadJSON("blogs/blogs.json");

// Convert title → URL-friendly slug
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

// Add slug to each blog
const blogsWithSlug = blogs.map((blog) => ({
  ...blog,
  slug: slugify(blog.title),
}));

router.get("/", (_, res) => {
  const data = loadJSON("landing-page/data.json");
  const trustpilot = loadJSON("misc/trustpilot.json");

  res.render("pages/landing-page", {
    data,
    blogs: blogsWithSlug,
    trustpilot,
  });
});

module.exports = router;
