const {createOrder, orderDetails } = require("../Controllers/OrderController")
const {ensureAuth} = require("../Middlewares/AuthToken")

const router = require("express").Router();

// create
router.post("/create/order",ensureAuth,createOrder)

// fetch details Popluate
router.post("/populate",orderDetails)

module.exports = router;
