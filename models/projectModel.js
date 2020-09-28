"use strict";
const db = require("./conn");
const bcrypt = require("bcryptjs");


class projectModel {
    constructor(id,name,project){
        this.id = id;
        this.name = name;
        this.project = project;
    }
    static async getAll(id){
        try{
            const response = await db.any(`SELECT * FROM projects WHERE users_id = $1;`,[id]);
            return response;
        } catch (error){
            return error.message;
        }
    }
    static async submitProject(id,projectName, projectDescription){
        
        try{
            const response = await db.result(`INSERT INTO projects (users_id,name,project_description)
            VALUES ($1,$2, $3);`,[id,projectName, projectDescription]);        
            return response;
        } catch (error){
            return error.message;
        }
    }

    static async currentProjectNumber(projectID){
        
        try{
            const response = await db.result(`UPDATE currentproject SET current_project_num = $1 WHERE id =1`,[projectID]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    static async getprojectID(){
        
        try{
            const response = await db.one(`SELECT current_project_num FROM currentproject WHERE id =1;`);        
            return response;
        } catch (error){
            return error.message;
        }
    }

    static async deleteProject(id){
        
        try{
            const response = await db.one(`DELETE FROM projects WHERE id =$1;`, [id]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    static async currentuserID(userID){
        
        try{
            const response = await db.result(`UPDATE currentproject SET current_userid = $1 WHERE id =1;`,[userID]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    static async getuserID(){
        
        try{
            const response = await db.one(`SELECT current_userid FROM currentproject WHERE id =1;`);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    static async  markReview(id, projectID) {
        try {
            let response = await db.result(`UPDATE projects SET is_complete = true WHERE users_id =$1 and id = $2;`,[id, projectID]); 
            
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }
   
    static async  markApproved(id, projectID) {
        try {
            let response = await db.result(`UPDATE projects SET is_approved = true WHERE users_id =$1 and id = $2;`,[id, projectID]); 
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }
    


}


module.exports = projectModel;