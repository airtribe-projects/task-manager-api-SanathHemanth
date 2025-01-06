const express = require("express");
const router = express.Router();


const tasks = [
    {
        id : 1,
        title: "Set up environment",
        description: "Install Node.js, npm, and git",
        completed: true,
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

router.get("/tasks",(req,res) =>{
    res.send(tasks);
});

router.get("/tasks/:id",(req, res) =>{
    const id = parseInt(req.params.id);
    if(!tasks[id-1]){
        return res.status(404).send({message :"The task with the given ID was not found"});
    }
    res.status(200).send(tasks[id-1]);
});

router.post("/tasks",(req,res) =>{
    const task = req.body;
    //console.log(task);
    if(!task.description || !task.title || task.completed==undefined){
        res.status(400).send({message : "Invalid data"});
    }
    else{
        console.log({task});
        const len = tasks.length;
        task.id = tasks[len-1].id+1;
        tasks.push(task);
        res.status(201).send({task});
    }

});

router.put("/tasks/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    if(!tasks[id-1]){
        return res.status(404).send({message :"The task with the given ID was not found"});
    }
    const task = req.body;
    if(typeof(task.title)!="string" || typeof(task.description)!="string" || typeof(task.completed)!="boolean"){
        return res.status(400).send({message : "Invalid data"});
    }
    task.id = id;
    tasks[id-1]=task;
    res.status(200).send({task});
});

router.delete("/tasks/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    //console.log(id);
    const taskIndex = tasks.findIndex(task=> task.id === id);
    if(taskIndex==-1){
        res.status(404).send("Invalid ID");
    }
    tasks.splice(taskIndex,1);
    res.status(200).send({message:"Task deleted"});
});

module.exports = router;