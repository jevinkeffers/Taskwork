//For every single route file we need these two lines
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UsersModel = require('../models/usersModel');

router.get("/login",async (request,response)=>{
    // console.log(request.session.is_logged_in)
    response.render("template",{
        locals: {
            title: "Log In",
            is_logged_in: request.session.is_logged_in
            
        },
        //This is the actual view
        partials:{
            partial:"partial-login"
            
        }
    })
    // response.status(200).send("OK").end();
})

router.get("/signup",async (request,response)=>{
   
    // console.log(request.session.is_logged_in)
    response.render("template",{
        locals: {
            title: "New User Sign Up",
            is_logged_in: request.session.is_logged_in
            
           
        },
        //This is the actual view
        partials:{
            partial:"partial-signup"
            
        }
    })
    // response.status(200).send("OK").end();
})


router.post("/signup", async(request,response)=>{
    // console.log(request.body);
    const {name, email, password} = request.body;

    //Salt and HASH our password 
    const salt = bcrypt.genSaltSync(10);
    //creates a new hash
    const hash = bcrypt.hashSync(password,salt)


    //creating new instance of the user model
    const userInstance = new UsersModel(null, name, email, hash);
    // note the res in the changed then is different from the router (vimp)
    userInstance.save().then(res => {
        console.log("response: ",res);
        if (res.id !== undefined){
            response.redirect('/users/login')
        }else {
            response.redirect('/users/signup')
        }
        // response.sendStatus(200);
    })
    // response.status(200).send("OK").end();

})

router.post("/login", async(request,response)=>{
    const {email, password} = request.body;
    // console.log(request.body);
    const userInstance = new UsersModel(null,null, email, password);
    userInstance.login().then(res => {
        console.log("response is", res);
         request.session.is_logged_in = res.isValid;
        console.log(request.session.is_logged_in);
        if(!!res.isValid){
            const {name, user_id} = res;
            request.session.name = name; 
            request.session.user_id = user_id;
            response.redirect("/todo")
        }else{
            response.sendStatus(401);
        }

    })

    // response.status(200).send("OK").end();

    
})


router.get("/logout", (request,response)=>{
    request.session.destroy();
    response.redirect("/");
})


//exporting out of the router
module.exports = router;