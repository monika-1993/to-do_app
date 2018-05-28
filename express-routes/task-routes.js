var express = require('express');
var app = express();
var taskRoutes = express.Router();

// Require Item model in our routes module
var Task = require('../models/tasks');

// Defined store route
taskRoutes.route('/add').post(function (req, res) {
  var task = new Task(req.body);
  task.lastUpdated= new Date();
  task.save()
    .then(item => {
      res.status(200).json({
        task: item
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("unable to save to database");
    });
});

// Defined get route
taskRoutes.route('/get').get(function (req, res) {
  Task.find(function (err, tasks) {
    if (err) {
      console.log(err);
    } else {
      res.json(tasks);
    }
  });
});

//  Defined update route
taskRoutes.route('/update/:id').post(function (req, res, next) {
  Task.findById(req.params.id, function (err, task) {
    if (!task)
      return next(new Error('Could not load Document'));
    else {
      task.name = req.body.name;
      task.description = req.body.description;
      task.isCompleted = req.body.isCompleted;
      task.priority = req.body.priority;
      task.subtasks = req.body.subtasks;
      task.lastUpdated= new Date();
      
      task.save().then(task => {
          res.json(task);
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});

// Defined delete | remove | destroy route
taskRoutes.route('/delete/:id').get(function (req, res) {
  Task.findByIdAndRemove({
    _id: req.params.id
  }, function (err, task) {
    if (err) res.json(err);
    else res.json({
      id: req.params.id
    });
  });
});

module.exports = taskRoutes;
