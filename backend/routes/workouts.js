const express = require("express");
const {
	getWorkouts,
	getWorkoutCategories,
	getWorkoutTags,
	getWorkout,
	createWorkout,
	updateWorkout,
	deleteWorkout,
} = require("../controllers/workoutController");

const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getWorkouts);

router.get("/categories", getWorkoutCategories);

router.get("/tags", getWorkoutTags);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.patch("/:id", updateWorkout);

router.delete("/:id", deleteWorkout);

module.exports = router;
