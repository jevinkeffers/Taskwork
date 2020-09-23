"use strict";
const db = require("./conn");
const bcrypt = require("bcryptjs");


class UserModel {
    constructor(id,name, email, password){
        this.id = id;
        this.name = name;
        this.email = email ;
        this.password = password;
    }
    //private (instance) method will return tru or false
    async checkPassword(hashedPassword){
        return bcrypt.compareSync(this.password,hashedPassword);
    }

    //instance method not passing any arguments
    //because this is an insatnce method we can use the this keyword
    async save(){
        try{
            const response = await db.one(`INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING id;`,[this.name,this.email,this.password])
            console.log("User was created with ID: ", response.id)
            return response;
        }catch(error){
            console.error("ERROR: ",error.message);
            return error.message;
        }
    }

    //another instance method
    //not passing arguments
    async login(){
        try{
            const response = await db.one(`SELECT id, name, email, password FROM users WHERE email = $1;`,[this.email])
            //console.log("loging response is: ",response);
            const isValid = await this.checkPassword(response.password);
            //console.log("loging response is: ",isValid);
            if (!!isValid){
                //if isvalid === absolutely is true
                const {name,id} = response;
                return {isValid, name, user_id: id}
            }else{isValid}
            
            return response;
        }catch(error){
            console.error("ERROR: ",error.message);
            return error.message;
        }
    }
}


module.exports = UserModel;