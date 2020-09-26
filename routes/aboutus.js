const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");

router.get("/aboutus",async (request,response)=>{

        response.render("template",{
            locals: {
                title: "About Us",
                is_logged_in: request.session.is_logged_in
            },
            partials:{
                partial:"partial-aboutus"
            }
        })

       //response.status(200).send("OK").end();
});

module.exports = router;