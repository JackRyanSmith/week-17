var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },

    exercises: [
      {
        name: {
          type: String,
          trim: true,
          required: 'Enter name '
        },

        weight: {
          type: Number,
          required: 'Enter weight'
        },

        sets: {
          type: Number,
          required: 'Enter sets'
        },

        reps: {
          type: Number,
          required: 'Enter reps'
        },

        duration: {
          type: Number,
          required: 'Enter duration'
        },

        distance: {
          type: Number,
          required: 'Enter distance'
        }
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

workoutSchema.virtual('Duration').get(function () {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model('workoutDb', workoutSchema);

module.exports = Workout;