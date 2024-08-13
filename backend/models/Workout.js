const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		sets: {
			type: Number,
			required: true,
		},
		reps: {
			type: Number,
			required: true,
		},
		load: {
			type: Number,
			required: true,
		},
		notes: {
			type: String,
		},
		associated_user_id: {
			type: String,
			required: true,
		},
		associated_category_id: {
			type: String,
		},
		associated_tag_ids: [{ type: String }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
