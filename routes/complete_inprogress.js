//For every single route file we need these two lines
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const todoModel = require('../models/todoModel');


router.get("/",async (request,response)=>{
  
    // response.status(200).send("OK").end();
})

router.post("/", async(request,response) => {
    
    
    // Defining keys from the request body
    const entryDelete = request.body.Delete;
    const entryProgress = request.body.Progress;
    const entryBack = request.body.Back;
    // console.log("request body from the todolist  --> ", entryBack)

    //This is how we will decide what to do when the form is submitted from todolist view
    if(entryDelete != undefined ){
        //delete the entry 
        console.log("we will delete id: ",entryDelete)
        const taskID = entryDelete;
        let todoModelData = await todoModel.deleteOne(taskID);
    }
    if (entryProgress != undefined) {
        // progress the entry
        console.log("we will progress id: ",entryProgress)
        const taskID = entryProgress;
        todoModelData = await todoModel. progressOne_intesting(taskID);
    }
    if (entryBack != undefined) {
        // progress the entry
        
        const taskID = entryBack;
        todoModelData = await todoModel.backOne_inprogress(taskID);
    }
    
    
    
    response.redirect("/todo")
    //  response.status(200).send("OK").end();
    
})


//exporting out of the router
module.exports = router;