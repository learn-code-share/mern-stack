const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

var todoRoutes = require('./routes/todo_routes');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true})); // Supports URL encoded bodies
app.use(bodyParser.json()); // Supports JSON encoded bodies

mongoose.connect("mongodb://127.0.0.1:27017/mern_todo", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once('open', function(){
    console.log('MongoDB database connection established successfully');
});

app.get('/',(_, response) => {
    response.send("Hey, You can see me now!!!");
});

app.use('/todos', todoRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

