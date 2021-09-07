const express = require("express");
const todoRoutes = express.Router();

let Todo = require('../models/todo');

todoRoutes.route("/").get(function (req, res) {
  Todo.find(function (error, todos) {
    if (error) {
      console.log(error);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get(function (req, res) {
  let id = req.params.id;
  Todo.findById(id, function (error, todo) {
    if (!todo) {
      res.status(404).send("Todo not found");
    }
    res.json(todo);
  });
});

todoRoutes.route("/:id").put(function (req, res) {
  let id = req.params.id;
  Todo.findById(id, function (error, todo) {
    if (!todo) {
      res.status(404).send("Todo not found");
    } else {
      todo.title = req.body.title;
      todo.description = req.body.description;
      todo.priority = req.body.priority;
      todo.completed = req.body.completed;

      todo
        .save()
        .then((todo) => {
          res.json("Todo updated");
        })
        .catch((error) => {
          req.status(400).send("Update not possible");
        });
    }
  });
});

todoRoutes.route('/').post(function(req,res){
    let todo = new Todo(req.body);
    todo
        .save()
        .then((todo) => {
          res.status(200).json({'todo': 'todo created successfully'});
        })
        .catch((error) => {
          req.status(400).send("failed to create todo");
        });
});

todoRoutes.route('/:id').delete(function(req,res){
  let id = req.params.id;
  Todo.findById(id, function (error, todo) {
    if (!todo) {
      res.status(404).send("Todo not found");
    } else {      
      todo
      .delete()
      .then((todo) => {
        res.status(200).json({'todo': 'todo deleted successfully'});
      })
      .catch((error) => {
        req.status(500).send("failed to delete");
      });
    }
  });
});

module.exports = todoRoutes;