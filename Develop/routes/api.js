const express = require("express");
const router = express.Router();

const Workout = require("../models/workout");

router.get("/", (req, res) => {
    res.json({"name": "Jack"})
});

router.get("/workouts", (req, res) => {
    Workout.find({}, (err, workout_obj) => {
        console.log(workout_obj)
        res.json(workout_obj);
    });
})

router.post("/workouts", (req, res) => {
    Workout.create({}, (err, new_workout) => {
        if (err) return res.sendStatus(500);
        res.json(new_workout);
    });
    // workout.findOne({ id: -1 }, (err, workout) => {
    //     res.json(JSON.parse(workout));
    // })
})

router.put("/workouts/:id", (req, res) => {
    const workoutObj = {
        date: new Date(),
        exercises: [req.body]
    }

    console.log(workoutObj)
    Workout.findOneAndUpdate({_id: req.params.id}, req.body, (err, doc) => {
        console.log("Found: \n" + doc);
        console.log(err);
        if (err) return res.sendStatus(500);
        res.json(doc);
    });
})


router.get("/workouts/range", (req, res) => {
    Workout.find({}, (err, docs) => {
        if (err) return res.sendStatus(500);
        console.log(docs)
        res.json(docs)
    });
})

module.exports = router;
