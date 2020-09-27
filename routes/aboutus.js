//For every single route file we need these two lines
const express = require("express");
const router = express.Router();


//The slash always references the file that it is in
router.get("/",async (request,response)=>{

        response.render("template",{
            locals: {
                title: "About Us"

            },
            //This is the actual view
            partials:{
                partial:"partial-aboutus"
            }
        })

       //response.status(200).send("OK").end();
});

//exporting out of the router
module.exports = router;