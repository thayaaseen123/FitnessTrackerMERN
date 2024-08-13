const express = require("express");

const {
	getMeals,
	getMeal,
	createMeal,
	updateMeal,
	deleteMeal,
} = require("../controllers/mealController");

const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getMeals);

router.get("/:id", getMeal);

router.post("/", createMeal);

router.patch("/:id", updateMeal);

router.delete("/:id", deleteMeal);

module.exports = router;
