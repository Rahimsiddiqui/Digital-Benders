const { express, loadJSON } = require(`../dependencies`);
const router = express.Router();

router.get("/production-service-in-canada", (_, res) => {
  const data = loadJSON("production-service/data.json");

  const brandLogos = data.brandLogos;
  const designImages = data.designImages;
  const photographyServices = data.photographyServices;
  const productInsights = data.productInsights;
  const faqs = data.faqs;

  res.render("pages/production-service", {
    brandLogos,
    designImages,
    photographyServices,
    productInsights,
    faqs,
  });
});

module.exports = router;
