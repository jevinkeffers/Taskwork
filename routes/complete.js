//For every single route file we need these two lines
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const todoModel = require('../models/todoModel');

const projectIDModel = require('../models/projectModel');

router.get("/",async (request,response)=>{
  
    // response.status(200).send("OK").end();
})

router.post("/", async(request,response) => {
    
    // Defining keys from the request body
    const entryDelete = request.body.Delete;
    const entryProgress = request.body.Progress;
    let projectIDdata = await projectIDModel.getprojectID();
    let projectID = projectIDdata.current_project_num;

    //This is how we will decide what to do when the form is submitted from todolist view
    if(entryDelete != undefined ){
        //delete the entry 
        const taskID = entryDelete;
        let todoModelData = await todoModel.deleteOne(taskID, projectID);
    }else{
        // progress the entry
        const taskID = entryProgress;
        todoModelData = await todoModel.progressOne(taskID, projectID);
    }
    
    
    response.redirect("/todo")
    
})


//exporting out of the router
module.exports = router;