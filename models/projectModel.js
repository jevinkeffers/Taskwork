"use strict";
const db = require("./conn");
const bcrypt = require("bcryptjs");


class projectModel {
    constructor(id,name,project){
        this.id = id;
        this.name = name;
        this.project = project
    }
    static async getAll(id){
        try{
            const response = await db.any(`SELECT * FROM projects WHERE users_id = $1;`,[id]);
            return response;
        } catch (error){
            return error.message;
        }
    }
    static async submitProject(id,project){
        
        try{
            const response = await db.result(`INSERT INTO projects (users_id,name)
            VALUES ($1,$2);`,[id,project]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
}


module.exports = projectModel;