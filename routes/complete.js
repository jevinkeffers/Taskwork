//For every single route file we need these two lines
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const todoModel = require('../models/todoModel');

router.get("/",async (request,response)=>{
    //console.log("user_id is: ",request.session.user_id)
    
    // response.status(200).send("OK").end();
})

router.post("/", async(request,response) => {
    const taskID = request.body.complete;
    console.log(request.body)
    let todoModelData = await todoModel.deleteOne(taskID);
    response.redirect("/todo")
    
})


//exporting out of the router
module.exports = router;