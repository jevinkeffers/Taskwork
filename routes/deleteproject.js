//For every single route file we need these two lines
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const todoModel = require('../models/todoModel');

const projectIDModel = require('../models/projectModel');
const projectModel = require('../models/projectModel');

router.get("/",async (request,response)=>{
  
    // response.status(200).send("OK").end();
})

router.post("/", async(request,response) => {
    
    
    // Defining keys from the request body
    let projectIDdata = await projectIDModel.getprojectID();
    let projectID = projectIDdata.current_project_num;
    // console.log("request body from the todolist  --> ", entryBack)

    await projectModel.deleteProject(projectID);
    
    
    response.redirect("/projects")
    //  response.status(200).send("OK").end();
    
})


//exporting out of the router
module.exports = router;