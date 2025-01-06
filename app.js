const express = require('express');
const app = express();
const port = 3000;

const taskRouter = require("./routes/tasks");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const logger = (req,res,next) =>{
    console.log(`${req.method} : Request received on ${req.url}`);
    next();
}

app.use(logger);
app.use(taskRouter);

//app.get('/',(req,res) =>{
//    res.send("Hey");
//});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;