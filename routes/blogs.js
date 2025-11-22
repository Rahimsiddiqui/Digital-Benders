const { express, saveJSON, loadJSON, slugify } = require(`../dependencies`);

const router = express.Router();
const blogs = loadJSON("blogs/blogs.json");

// Parse DD/MM/YYYY string to a Date object
function parseDMY(dateStr) {
  const [day, month, year] = dateStr.split("/").map(Number);
  return new Date(year, month - 1, day);
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

// Top 6 Blogs
function getTopBlogs(limit = 6) {
  return [...blogsWithSlug]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, limit);
}

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
  const firstWord = words[0];
  const rest = words.slice(1).join(" ");

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

  const topBlogs = getTopBlogs(6).map((b) => ({
    ...b,
    shortDate: shortenDate(b.date),
  }));

  res.render("pages/blogs/post", {
    post: blog,
    topBlogs,
    firstWord,
    rest,
  });
});

module.exports = router;
