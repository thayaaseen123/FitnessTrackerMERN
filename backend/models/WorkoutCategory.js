const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutCategorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		associated_user_id: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("WorkoutCategory", workoutCategorySchema);
