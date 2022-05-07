const DB = require("./db.json");
const { saveToDB } = require("./utils");

const getAllWorkouts = () => {
  try {
    return DB.workouts;
  } catch (error) {
    throw { stauts: 500, message: error };
  }
};

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    return workout;
  } catch (error) {
    throw { status: error?.status || 500, message: error.message };
  }
};

const createNewWorkout = (newWorkout) => {
  try {
    const isAlreadyAdded =
      DB.workouts.findIndex((workout) => newWorkout.name === workout.name) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${newWorkout.name}' already exists`,
      };
    }

    DB.workouts.push(newWorkout);
    saveToDB(DB);
    return newWorkout;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneWorkout = (workoutId, changes) => {
  try {
    const indexForUpdate = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }

    const updateWorkout = {
      ...DB.workouts,
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    DB.workouts[indexForUpdate] = updateWorkout;
    saveToDB(DB);
    return updateWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error.message };
  }
};

//condition? stament1: stament2

const deleteOneWorkout = (workoutId) => {
  try {
    const indexForDelete = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForDelete === -1) {
      throw {
        status: 500,
        message: `Can't find workout with the id '${workoutId}'`
      }
    }
  
    DB.workouts.splice(indexForDelete, 1);
    saveToDB(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error.message}
  }
};

module.exports = {
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
