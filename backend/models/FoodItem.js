const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const foodItemSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		calories: {
			type: Number,
			required: true,
		},
		macros: {
			protein: {
				type: Number,
				required: true,
			},
			carbs: {
				type: Number,
				required: true,
			},
			fat: {
				type: Number,
				required: true,
			},
		},
		associated_user_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("FoodItem", foodItemSchema);
