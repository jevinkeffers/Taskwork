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
    
     console.log("request body from the todolist  --> ", request.body)
    // // Defining keys from the request body
    const entryDelete = request.body.Delete;
    const entryBack = request.body.Back;
    let projectIDdata = await projectIDModel.getprojectID();
    let projectID = projectIDdata.current_project_num;
    // const entryProgress = request.body.Progress;

    //This is how we will decide what to do when the form is submitted from todolist view
    if(entryDelete != undefined ){
        //delete the entry 
        console.log("we will delete id: ",entryDelete)
        const taskID = entryDelete;
        let todoModelData = await todoModel.deleteOne(taskID, projectID);
    }else{
        // we will use this for going back a spot
        console.log("we will back id: ",entryBack)
        const taskID = entryBack;
        todoModelData = await todoModel.backOne_complete(taskID, projectID);
    }
    
    
    response.redirect("/todo")
    //  response.status(200).send("OK").end();
    
})


//exporting out of the router
module.exports = router;