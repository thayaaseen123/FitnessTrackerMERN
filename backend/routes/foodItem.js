const express = require("express");

const {
	getFoodItems,
	getFoodItem,
	createFoodItem,
	updateFoodItem,
	deleteFoodItem,
} = require("../controllers/foodItemController");

const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getFoodItems);

router.get("/:id", getFoodItem);

router.post("/", createFoodItem);

router.patch("/:id", updateFoodItem);

router.delete("/:id", deleteFoodItem);

module.exports = router;
