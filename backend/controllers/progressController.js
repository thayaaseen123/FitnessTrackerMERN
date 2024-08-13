const mongoose = require("mongoose");

const Progress = require("../models/Progress");

const getProgresses = async (request, response) => {
	const user_id = request.user._id;
	const progresses = await Progress.find({
		associated_user_id: user_id,
	}).sort({
		createdAt: -1,
	});

	return response.status(200).json(progresses);
};

const getProgress = async (request, response) => {
	const { id } = request.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return response.status(404).json({ error: "Progress not found!" });
	}

	const progress = await Progress.findById(id);

	if (!progress) {
		return response.status(400).json({ error: "Progress not found!" });
	}

	return response.status(200).json(progress);
};

const createProgress = async (request, response) => {
	const { weight, bodyMeasurements, performanceMetrics, notes } =
		request.body;

	const user_id = request.user._id;

	try {
		const newProgress = await Progress.create({
			weight,
			bodyMeasurements,
			performanceMetrics,
			notes,
			associated_user_id: user_id,
		});
		response.status(200).json({ progress: newProgress });
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
};

const updateProgress = async (request, response) => {
	const { id } = request.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return response.status(404).json({ error: "Progress not found!" });
	}

	const { weight, bodyMeasurements, performanceMetrics, notes } =
		request.body;

	const user_id = request.user._id;

	const progressFound = await Progress.findOneAndUpdate(
		{ _id: id, associated_user_id: user_id },
		{
			weight,
			bodyMeasurements,
			performanceMetrics,
			notes,
		},
		{ new: true } // Return the updated document
	);

	if (!progressFound) {
		return response.status(400).json({ error: "Progress not found!" });
	}

	return response.status(200).json(progressFound);
};

const deleteProgress = async (request, response) => {
	const { id } = request.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return response.status(404).json({ error: "Progress not found!" });
	}

	const user_id = request.user._id;

	const progress = await Progress.findOneAndDelete(
		{ _id: id, associated_user_id: user_id },
		{ returnDocument: "before" }
	);

	if (progress === null) {
		return response.status(400).json({ error: "Progress not found!" });
	}

	return response.status(200).json(progress);
};

module.exports = {
	getProgresses,
	getProgress,
	createProgress,
	updateProgress,
	deleteProgress,
};
