const {ensureAuth} = require("../Middlewares/AuthToken");
const { createProduct, getAllProducts } = require("../Controllers/ProductController");

const router = require("express").Router();

router.post("/create",createProduct)
router.get("/all",getAllProducts)

module.exports = router;
