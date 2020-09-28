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
    
    // // Defining keys from the request body
    const entryDelete = request.body.Delete;
    const entryBack = request.body.Back;
    const review = request.body.review;
    const approved = request.body.approved;
    let projectIDdata = await projectIDModel.getprojectID();
    let projectID = projectIDdata.current_project_num;
    let current_user_id = await projectIDModel.getuserID();
    let userid = current_user_id.current_userid;
    // const entryProgress = request.body.Progress;

    //This is how we will decide what to do when the form is submitted from todolist view
    if(entryDelete != undefined ){
        //delete the entry 
        const taskID = entryDelete;
        todoModelData = todoModel.deleteOne(taskID, projectID);
        response.redirect('/todo')
    }
    if(entryBack != undefined){
        // we will use this for going back a spot
        const taskID = entryBack;
        todoModelData = await todoModel.backOne_complete(taskID, projectID);
        response.redirect("/todo")
    }
    if(review == 'true'){
        todoModelData = await projectIDModel.markReview(userid,projectID);
        response.redirect("/projects")
    }
    if(approved == 'true'){
        todoModelData = await projectIDModel.markApproved(userid,projectID);
        response.redirect("/projects")
    }
    // response.redirect("/todo")
    //  response.status(200).send("OK").end();
    
})


//exporting out of the router
module.exports = router;