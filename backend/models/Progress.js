const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProgressSchema = new Schema(
	{
		weight: {
			type: Number,
			required: true,
		},
		bodyMeasurements: {
			chest: { type: Number },
			waist: { type: Number },
			arms: { type: Number },
			legs: { type: Number },
		},
		performanceMetrics: {
			runtime: { type: Number },
			benchpress: { type: Number },
			deadlift: { type: Number },
			squat: { type: Number },
		},
		associated_user_id: {
			type: String,
			required: true,
		},
		notes: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Progress", ProgressSchema);
