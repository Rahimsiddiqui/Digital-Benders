const { express, Blog } = require(`../dependencies`);

const router = express.Router();

function formatDate(dateObj) {
  if (!dateObj) return "";
  const d = new Date(dateObj);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

router.get("/blogs", async (_, res) => {
  try {
    const blogs = await Blog.find({}).sort({ date: -1 }).lean();

    const formattedBlogs = blogs.map((b) => ({
      ...b,
      date: formatDate(b.date),
    }));

    res.render("pages/blogs/blogs", { posts: formattedBlogs });
  } catch (err) {
    console.error("Database Error: ", err);
    res.status(500).render("pages/500-error");
  }
});

router.get("/blogs/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const [blog, topBlogsRaw] = await Promise.all([
      Blog.findOne({ slug }),
      Blog.find({}).sort({ views: -1 }).limit(6).lean(),
    ]);

    if (!blog) return res.status(404).render("pages/404-error");

    const cookieName = `viewed_${slug}`;
    if (!req.cookies[cookieName]) {
      await Blog.updateOne({ slug }, { $inc: { views: 1 } });
      blog.views += 1;
      res.cookie(cookieName, "1", {
        maxAge: 43200000,
        httpOnly: true,
      });
    }

    const words = blog.title.split(" ");
    const firstWord = words[0];
    const rest = words.slice(1).join(" ");

    const topBlogs = topBlogsRaw.map((b) => ({
      ...b,
      shortDate: formatDate(b.date),
    }));

    const blogForView = blog.toObject();
    blogForView.date = formatDate(blog.date);

    res.render("pages/blogs/post", {
      blog: blogForView,
      post: blogForView.post,
      rest,
      firstWord,
      topBlogs,
    });
  } catch (err) {
    console.error("Error Occurred: ", err);
    res.status(500).render("pages/500-error");
  }
});

module.exports = router;
