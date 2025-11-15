const { express, saveJSON, loadJSON } = require(`../dependencies`);

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

// Parse DD/MM/YYYY string to a Date object
function parseDMY(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
}

// Top 6 Blogs
function getTopBlogs(limit = 6) {
  return [...blogsWithSlug]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
}

// Shorten Date
function shortenDate(dateStr) {
  const [day, month, year] = dateStr.split("/");
  const shortYear = year.slice(-2);
  return `${day}/${month}/${shortYear}`;
}

// Add slug to each blog
const blogsWithSlug = blogs.map((blog) => ({
  ...blog,
  slug: slugify(blog.title),
}));

// Blogs page
router.get("/blogs", (_, res) => {
  const sortedBlogs = [...blogsWithSlug].sort(
    (a, b) => parseDMY(b.date) - parseDMY(a.date)
  );

  res.render("pages/blogs/blogs", { posts: sortedBlogs });
});

// Single blog page
router.get("/blogs/:slug", (req, res) => {
  const slugParam = req.params.slug;
  const blog = blogsWithSlug.find((b) => b.slug === slugParam);
  if (!blog) return res.status(404).send("Page not found");

  const words = blog.title.split(" ");
  blog.firstWord = words.shift();
  blog.rest = words.join(" ");

  const cookieName = `viewed_${slugParam}`;
  const hasViewed = req.cookies && req.cookies[cookieName];

  if (!hasViewed) {
    blog.views = (blog.views || 0) + 1;

    // Save to JSON
    saveJSON("blogs/blogs.json", blogsWithSlug);

    // Set cookie for 24 hours
    res.cookie(cookieName, "1", {
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      httpOnly: true,
    });
  }

  const topBlogs = getTopBlogs(6);

  res.render("pages/blogs/post", {
    post: blog,
    topBlogs,
    shortDate: shortenDate(blog.date),
  });
});

module.exports = router;
