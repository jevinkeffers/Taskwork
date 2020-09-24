//For every single route file we need these two lines
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// bringing in data from each model
const todoModel = require('../models/todoModel');



router.get("/",async (request,response)=>{
    const userid = request.session.user_id; 
    let todoModelData = await todoModel.getAll(userid);

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
    console.log("this is the request body from the submit button :", request.body)
    await todoModel.submitTask(userid,todoitem);

    todoModelData = await todoModel.getAll(userid);
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