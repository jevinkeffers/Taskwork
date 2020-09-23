//For every single route file we need these two lines
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const todoModel = require('../models/todoModel');

router.get("/",async (request,response)=>{
    const userid = request.session.user_id; 
    const todoModelData = await todoModel.getAll(userid);
    console.log(todoModelData)
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

    await todoModel.submitTask(userid,todoitem);
    todoModelData = await todoModel.getAll(userid);
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
})


//exporting out of the router
module.exports = router;