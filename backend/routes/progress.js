const express = require("express");

const {
	getProgresses,
	getProgress,
	createProgress,
	updateProgress,
	deleteProgress,
} = require("../controllers/progressController");

const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.use(requireAuth);

router.get("/", getProgresses);

router.get("/:id", getProgress);

router.post("/", createProgress);

router.patch("/:id", updateProgress);

router.delete("/:id", deleteProgress);

module.exports = router;
