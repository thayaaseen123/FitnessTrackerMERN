const mongoose = require("mongoose");
const Meal = require("../models/Meal");
const FoodItem = require("../models/FoodItem");

// Get all meals
const getMeals = async (req, res) => {
	const userId = req.user._id;

	try {
		const meals = await Meal.find({ associated_user_id: userId }).sort({
			createdAt: -1,
		});
		res.status(200).json(meals);
	} catch (error) {
		res.status(500).json({
			error: "An error occurred while fetching meals.",
		});
	}
};

// Get a single meal by ID
const getMeal = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Meal not found!" });
	}

	try {
		const meal = await Meal.findById(id);

		if (!meal) {
			return res.status(404).json({ error: "Meal not found!" });
		}

		res.status(200).json(meal);
	} catch (error) {
		res.status(500).json({
			error: "An error occurred while fetching the meal.",
		});
	}
};

// Create a new meal
const createMeal = async (req, res) => {
	const { type, foodItems } = req.body;
	const userId = req.user._id;

	try {
		const meal = new Meal({
			type,
			foodItems,
			associated_user_id: userId,
		});

		await meal.save();
		res.status(201).json(meal);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Update an existing meal by ID
const updateMeal = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Meal not found!" });
	}

	const { type, foodItems } = req.body;

	try {
		const meal = await Meal.findByIdAndUpdate(
			id,
			{ type, foodItems },
			{ new: true }
		);

		if (!meal) {
			return res.status(404).json({ error: "Meal not found!" });
		}

		res.status(200).json(meal);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// Delete a meal by ID
const deleteMeal = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ error: "Meal not found!" });
	}

	try {
		const meal = await Meal.findByIdAndDelete(id);

		if (!meal) {
			return res.status(404).json({ error: "Meal not found!" });
		}

		res.status(200).json(meal);
	} catch (error) {
		res.status(500).json({
			error: "An error occurred while deleting the meal.",
		});
	}
};

module.exports = {
	getMeals,
	getMeal,
	createMeal,
	updateMeal,
	deleteMeal,
};
