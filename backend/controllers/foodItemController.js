const mongoose = require("mongoose");

const FoodItem = require("../models/FoodItem");

const getFoodItems = async (request, response) => {
	const user_id = request.user._id;
	const foodItems = await FoodItem.find({
		associated_user_id: user_id,
	}).sort({
		createdAt: -1,
	});

	return response.status(200).json(foodItems);
};

const getFoodItem = async (request, response) => {
	const { id } = request.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return response.status(404).json({ error: "FoodItem not found!" });
	}

	try {
		const foodItem = await FoodItem.findById(id);

		if (!foodItem) {
			return response.status(404).json({ error: "FoodItem not found!" });
		}

		return response.status(200).json(foodItem);
	} catch (error) {
		return response
			.status(500)
			.json({ error: "An error occurred while fetching the food item." });
	}
};

const createFoodItem = async (request, response) => {
	const { name, calories, macros } = request.body;
	const user_id = request.user._id;

	try {
		const newFoodItem = await FoodItem.create({
			name,
			calories,
			macros,
			associated_user_id: user_id,
		});
		return response.status(201).json({ foodItem: newFoodItem });
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
};

const updateFoodItem = async (request, response) => {
	const { id } = request.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return response.status(404).json({ error: "FoodItem not found!" });
	}

	const { name, calories, macros } = request.body;
	const user_id = request.user._id;

	try {
		const updatedFoodItem = await FoodItem.findOneAndUpdate(
			{ _id: id, associated_user_id: user_id },
			{ name, calories, macros },
			{ new: true } // Return the updated document
		);

		if (!updatedFoodItem) {
			return response.status(404).json({ error: "FoodItem not found!" });
		}

		return response.status(200).json(updatedFoodItem);
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
};

const deleteFoodItem = async (request, response) => {
	const { id } = request.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return response.status(404).json({ error: "FoodItem not found!" });
	}

	const user_id = request.user._id;

	try {
		const deletedFoodItem = await FoodItem.findOneAndDelete(
			{ _id: id, associated_user_id: user_id },
			{ returnDocument: "before" } // Return the deleted document
		);

		if (!deletedFoodItem) {
			return response.status(404).json({ error: "FoodItem not found!" });
		}

		return response.status(200).json(deletedFoodItem);
	} catch (error) {
		return response
			.status(500)
			.json({ error: "An error occurred while deleting the food item." });
	}
};

module.exports = {
	getFoodItems,
	getFoodItem,
	createFoodItem,
	updateFoodItem,
	deleteFoodItem,
};
