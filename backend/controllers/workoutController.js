const mongoose = require("mongoose");

const Workout = require("../models/Workout");
const WorkoutCategory = require("../models/WorkoutCategory");
const WorkoutTag = require("../models/WorkoutTag");

const getWorkouts = async (request, response) => {
	const user_id = request.user._id;
	const workouts = await Workout.find({ associated_user_id: user_id }).sort({
		createdAt: -1,
	});

	return response.status(200).json(workouts);
};

const getWorkoutCategories = async (request, response) => {
	const user_id = request.user._id;
	const workoutCategories = await WorkoutCategory.find({
		associated_user_id: user_id,
	}).sort({
		createdAt: -1,
	});
	return response.status(200).json(workoutCategories);
};

const getWorkoutTags = async (request, response) => {
	const user_id = request.user._id;
	const workoutTags = await WorkoutTag.find({
		associated_user_id: user_id,
	}).sort({
		createdAt: -1,
	});
	return response.status(200).json(workoutTags);
};

const getWorkout = async (request, respozznse) => {
	const { id } = request.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return response.status(404).json({ error: "Workout not found!" });
	}

	const workout = await Workout.findById(id);

	if (!workout) {
		return response.status(400).json({ error: "Workout not found!" });
	}

	return response.status(200).json(workout);
};

const createWorkout = async (request, response) => {
	const { workout, categoryName, tags } = request.body;
	const { title, sets, reps, load, notes } = workout;

	const user_id = request.user._id;

	let category = null;

	if (categoryName) {
		category = await WorkoutCategory.findOne({
			name: categoryName,
			associated_user_id: user_id,
		});

		if (!category) {
			category = await WorkoutCategory.create({
				name: categoryName,
				associated_user_id: user_id,
			});
		}
	}

	const associated_tag_ids = await Promise.all(
		tags.map(async (tagName) => {
			let tag = await WorkoutTag.findOne({
				name: tagName,
				associated_user_id: user_id,
			});

			if (!tag) {
				tag = await WorkoutTag.create({
					name: tagName,
					associated_user_id: user_id,
				});
			}

			return tag._id.toString();
		})
	);

	try {
		const newWorkout = await Workout.create({
			title,
			sets,
			reps,
			load,
			notes,
			associated_category_id: category ? category._id : null,
			associated_user_id: user_id,
			associated_tag_ids,
		});
		response.status(200).json({ newWorkout });
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
};

const updateWorkout = async (request, response) => {
	const { id } = request.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return response.status(404).json({ error: "Workout not found!" });
	}

	const { workout, categoryName, tags } = request.body;
	const { title, sets, reps, load, notes } = workout;

	const user_id = request.user._id;

	let category = null;

	if (categoryName) {
		category = await WorkoutCategory.findOne({
			name: categoryName,
			associated_user_id: user_id,
		});

		if (!category) {
			category = await WorkoutCategory.create({
				name: categoryName,
				associated_user_id: user_id,
			});
		}
	}

	const associated_tag_ids = await Promise.all(
		tags.map(async (tagName) => {
			let tag = await WorkoutTag.findOne({
				name: tagName,
				associated_user_id: user_id,
			});

			if (!tag) {
				tag = await WorkoutTag.create({
					name: tagName,
					associated_user_id: user_id,
				});
			}

			return tag._id.toString();
		})
	);

	const workoutFound = await Workout.findOneAndUpdate(
		{ _id: id, associated_user_id: user_id },
		{
			title,
			sets,
			reps,
			load,
			notes,
			associated_category_id: category ? category._id : null,
			associated_tag_ids,
		},
		{ new: true } // Return the updated document
	);

	if (!workoutFound) {
		return response.status(400).json({ error: "Workout not found!" });
	}

	return response.status(200).json(workoutFound);
};

const deleteWorkout = async (request, response) => {
	const { id } = request.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return response.status(404).json({ error: "Workout not found!" });
	}

	const user_id = request.user._id;

	const workout = await Workout.findOneAndDelete(
		{ _id: id, associated_user_id: user_id },
		{ returnDocument: "before" }
	);

	if (workout === null) {
		return response.status(400).json({ error: "Workout not found!" });
	}

	return response.status(200).json(workout);
};

module.exports = {
	getWorkouts,
	getWorkoutCategories,
	getWorkoutTags,
	getWorkout,
	createWorkout,
	updateWorkout,
	deleteWorkout,
};
