// Route Order
const express = require("express");
const router = express.Router();

const OrderController = require("../controllers/PlaceOrder.js");

router.route("/order").get(OrderController.getOrders);
router.route("/order").post(OrderController.createOrder);
router.route("/order").put(OrderController.editTrip);

module.exports = router;
