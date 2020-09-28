//For every single route file we need these two lines
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// bringing in data from each model
const todoModel = require('../models/todoModel');
const projectIDModel = require('../models/projectModel');

router.get("/",async (request,response)=>{
    const userid = request.session.user_id; 
    let projectIDdata = await projectIDModel.getprojectID();
    let projectID = await projectIDdata.current_project_num;
    //console.log("User ID >>>>>", userid)
    let todoModelData = await todoModel.getAll(userid, projectID);
    //console.log("User ID >>>>>",userid)
    let projectName = await todoModel.getProjectName(userid, projectID);
    //console.log("Project Name: ", projectName)
    let projectDescription = await todoModel.getProjectDescription(userid, projectID);
    //console.log(projectDescription);
    //Filtering through data recieved from the model to remove null from rendering in the view
    for(let i = 0;i<todoModelData.length;i++){
        if (todoModelData[i].todo_task == null){
            todoModelData[i].todo_task = '';
        }
        if (todoModelData[i].in_progress == null){
            todoModelData[i].in_progress = '';
        }
        if (todoModelData[i].in_testing == null){
            todoModelData[i].in_testing = '';
        }
        if (todoModelData[i].completed == null){
            todoModelData[i].completed = '';
        }
    }
    response.render("template",{
        locals: {
            title: "To Do",
            data: todoModelData,
            projectName: projectName,
            projectDescription: projectDescription,
            is_logged_in: request.session.is_logged_in
        },
        //This is the actual view
        partials:{
            partial:"partial-todolist"
            
        }
    })
    // response.status(200).send("OK").end();
})

router.post("/", async(request,response) => {
    const userid = request.session.user_id; 
    const todoitem = request.body.todoitem;
    let projectIDdata = await projectIDModel.getprojectID();
    let projectID = projectIDdata.current_project_num;
    
    //console.log(projectID)

    // var projectId = request.body.Project_id;

    //console.log("this is the request body from the submit button :", request.body)
    //console.log(userid)
    await todoModel.submitTask(userid,todoitem, projectID);
    let todoModelData = await todoModel.getAll(userid, projectID);
    response.redirect("/todo")
    // response.render("template",{
    //     locals: {
    //         title: "To Do",
    //         data: todoModelData,
    //         is_logged_in: request.session.is_logged_in
    //     },
    //     //This is the actual view
    //     partials:{
    //         partial:"partial-todolist"
            
    //     }
    // })
})

//exporting out of the router
module.exports = router;