require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const workoutRoutes = require("./routes/workouts");
const progressRoutes = require("./routes/progress");
const foodItemRoutes = require("./routes/foodItem");
const mealRoutes = require("./routes/meal");

const app = express();

app.use(express.json());

app.use("/auth/", userRoutes);
app.use("/workouts/", workoutRoutes);
app.use("/progress/", progressRoutes);
app.use("/foodItems/", foodItemRoutes);
app.use("/meals/", mealRoutes);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => {
		app.listen(process.env.PORT);
	})
	.catch((error) => console.log(error));

// app.get("/", (request, response) => {
// 	return response.json({ message: "hello, world!" });
// });
