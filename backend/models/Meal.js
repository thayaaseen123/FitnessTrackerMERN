const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ["Breakfast", "Lunch", "Dinner", "Snacks"],
			required: true,
		},
		foodItems: [
			{
				foodItemId: {
					type: "string",
					ref: "FoodItem",
					required: true,
				},
				quantityInGrams: {
					type: Number,
					required: true,
				},
			},
		],
		totalCalories: {
			type: Number,
			default: 0,
		},
		totalMacros: {
			protein: {
				type: Number,
				default: 0,
			},
			carbs: {
				type: Number,
				default: 0,
			},
			fat: {
				type: Number,
				default: 0,
			},
		},
		associated_user_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

mealSchema.pre("save", async function (next) {
	if (this.isModified("foodItems")) {
		let totalCalories = 0;
		let totalMacros = { protein: 0, carbs: 0, fat: 0 };

		for (const item of this.foodItems) {
			const foodItem = await mongoose
				.model("FoodItem")
				.findById(item.foodItemId);
			if (foodItem) {
				totalCalories +=
					foodItem.calories * (item.quantityInGrams / 100);
				totalMacros.protein +=
					foodItem.macros.protein * (item.quantityInGrams / 100);
				totalMacros.carbs +=
					foodItem.macros.carbs * (item.quantityInGrams / 100);
				totalMacros.fat +=
					foodItem.macros.fat * (item.quantityInGrams / 100);
			}
		}

		this.totalCalories = totalCalories;
		this.totalMacros = totalMacros;
	}
	next();
});

module.exports = mongoose.model("Meal", mealSchema);
