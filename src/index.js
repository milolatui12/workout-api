const express = require("express");
const bodyParser = require("body-parser");

const v1WorkoutRouter = require("./v1/routes/workoutRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// For testing purposes
app.use("/api/v1/workout", v1WorkoutRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
