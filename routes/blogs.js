const {
  express,
  formatDate,

  Blog,
} = require(`../dependencies`); // Import necessary module, helper, and Mongoose model

// Initialize Express router
const router = express.Router();

// Route to display the main blog listing page
router.get("/blogs", async (_, res) => {
  try {
    // Getting all blogs (sorted)
    const blogs = await Blog.find({}).sort({ date: -1 }).lean();

    // Format the date for each blog post before sending to the view
    const formattedBlogs = blogs.map((b) => ({
      ...b,
      date: formatDate(b.date),
    }));

    // Rendering Blogs Page
    res.render("pages/blogs/blogs", { posts: formattedBlogs });
  } catch (err) {
    console.error("Database Error: ", err);
    res.status(500).render("pages/500-error");
  }
});

// Route to display a single Blog Page
router.get("/blogs/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;

    // Fetching 6 most viewed blogs
    const [blog, topBlogsRaw] = await Promise.all([
      Blog.findOne({ slug }),
      Blog.find({}).sort({ views: -1 }).limit(6).lean(),
    ]);

    if (!blog) return res.status(404).render("pages/404-error");

    // Logic to prevent counting multiple views from the same user within 12 hours
    const cookieName = `viewed_${slug}`;
    if (!req.cookies[cookieName]) {
      await Blog.updateOne({ slug }, { $inc: { views: 1 } });
      blog.views += 1;

      res.cookie(cookieName, "1", {
        maxAge: 43200000,
        httpOnly: true,
      });
    }

    // Splitting the title for customization
    const words = blog.title.split(" ");
    const firstWord = words[0];
    const rest = words.slice(1).join(" ");

    // Getting Formatted Top 6 Blogs
    const topBlogs = topBlogsRaw.map((b) => ({
      ...b,
      shortDate: formatDate(b.date),
    }));

    // Prepare the main blog object for the view, formatting its date
    const blogForView = blog.toObject();
    blogForView.date = formatDate(blog.date);

    // Rendering singel Blog Page
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
