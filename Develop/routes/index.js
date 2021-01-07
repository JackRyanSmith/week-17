const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({"name": "Jack"})
});

router.get("/exercise", (req, res) => {
    let exercise_html = path.join(__dirname, '../public/exercise.html');
    fs.readFile(exercise_html, 'utf8', (err, html) => {
        res.send(html);
    });
});

router.get("/stats", (req, res) => {
    let stats_html = path.join(__dirname, '../public/stats.html');
    fs.readFile(stats_html, 'utf8', (err, html) => {
        res.send(html)
    });
});

module.exports = router;