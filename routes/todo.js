//For every single route file we need these two lines
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// bringing in data from each model
const todoModel = require('../models/todoModel');
const completedList = require('../models/completedlistModel');
const inprogList = require('../models/inproglistModel');
const testingList = require('../models/testinglistModel');


router.get("/",async (request,response)=>{
    const userid = request.session.user_id; 
    const todoModelData = await todoModel.getAll(userid);
    const completedListData = await completedList.getAllCompletedlist(userid);
    const testingData = await testingList.getAllTesting(userid);
    const inprogData = await inprogList.getAllInprog(userid);
    console.log("this is the to do model data:", todoModelData);
    console.log("this is the completed model data:", completedListData);
    console.log("this is the testing model data:", testingData);
    console.log("this is the inprog model data:", inprogData);

    response.render("template",{
        locals: {
            title: "To Do",
            data: todoModelData,
            testingData: testingData,
            inprogData: inprogData,
            completedData: completedListData,
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
    response.redirect("/todo")
    // response.render("template",{
    //     locals: {
    //         title: "To Do",
    //         data: todoModelData,
    //         testingData: testingData,
    //         inprogData: inprogData,
    //         completedData: completedListData,
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