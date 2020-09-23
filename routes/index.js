//For every single route file we need these two lines
const express = require("express")
const router = express.Router();
const indexModel = require('../models/indexModel');


//The slash always references the file that it is in
router.get("/",async (request,response)=>{

       response.render("template",{
           locals: {
               title: "Index"

           },
           //This is the actual view
           partials:{
               partial:"partial-index"
           }
       })

       //response.status(200).send("OK").end();
})

//exporting out of the router
module.exports = router;