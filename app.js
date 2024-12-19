const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const tasks = [
    {
        id : 1,
        title: "Set up environment",
        description: "Install Node.js, npm, and git",
        completed: true
    },
    {
        id : 2,
        title: "Create a new project",
        description: "Create a new project using the Express application generator",
        completed: true
    },
    {
        id : 3,
        title: "Install nodemon",
        description: "Install nodemon as a development dependency",
        completed: true
    },
    {
        id : 4,
        title: "Install Express",
        description: "Install Express",
        completed: false
    },
    {
        id : 5,
        title: "Install Mongoose",
        description: "Install Mongoose",
        completed: false
    },
    {
        id: 6,
        title: "Install Morgan",
        description: "Install Morgan",
        completed: false
      },
      {
        id: 7,
        title: "Install body-parser",
        description: "Install body-parser",
        completed: false
      },
      {
        id: 8,
        title: "Install cors",
        description: "Install cors",
        completed: false
      },

]

const logger = (req,res,next) =>{
    console.log(`${req.method} : Request received on ${req.url}`);
    next();
}

app.use(logger);

app.get('/',(req,res) =>{
    res.send("Hey");
});

app.get("/api/v1/tasks",(req,res) =>{
    res.send(tasks);
});

app.get("/api/v1/tasks/:id",(req, res) =>{
    const id = parseInt(req.params.id);
    if(!tasks[id-1]){
        return res.status(404).send({message :"The task with the given ID was not found"});
    }
    res.send(tasks[id-1]);
});

app.post("/api/v1/tasks",(req,res) =>{
    const task = req.body;
    console.log({task});
    task.id = tasks.length+1;
    tasks.push(task);
    res.send({task});
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;