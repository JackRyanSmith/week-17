var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var Workout = require('../../../bootcampspot-week17-hw/models/workout');
var path = require('path');


const PORT = process.env.PORT || 3000;
var app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout-tracker", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('mongodb connected'));


app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/exercise.html'))
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/stats.html'))
});


app.get('/api/workouts', (req, res) => {
    Workout.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
});

app.get('/api/workouts/range', (req, res) => {
    Workout.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
});

app.post('/api/workouts', (req, res) => {
    Workout.create({})
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json(err)
        })
});

app.put('/api/workouts/:id', ({body, params}, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        {$push:{exercises:body}},
        {new: true, runValidators: true}
    )
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.json(err)
    })
});


app.listen(PORT, () => {
    console.log('app running on port ' + PORT)
});

