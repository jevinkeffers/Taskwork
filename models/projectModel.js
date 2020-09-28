"use strict";
// Linking database from Conn.js
const db = require("./conn");
// Linking bcrypt password encryption Express Module
const bcrypt = require("bcryptjs");


class projectModel {
    constructor(id,name,project){
        this.id = id;
        this.name = name;
        this.project = project;
    }
    // Get all projects from our Database
    static async getAll(id){
        try{
            const response = await db.any(`SELECT * FROM projects WHERE users_id = $1;`,[id]);
            return response;
        } catch (error){
            return error.message;
        }
    }
    // Submit Project to Database from the Partial Form
    static async submitProject(id,projectName, projectDescription){
        
        try{
            const response = await db.result(`INSERT INTO projects (users_id,name,project_description)
            VALUES ($1,$2, $3);`,[id,projectName, projectDescription]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    // Updating Database table with Project that was clicked on
    static async currentProjectNumber(projectID){
        
        try{
            const response = await db.result(`UPDATE currentproject SET current_project_num = $1 WHERE id =1`,[projectID]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    // Select current project from current project table
    static async getprojectID(){
        
        try{
            const response = await db.one(`SELECT current_project_num FROM currentproject WHERE id =1;`);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    // Delete project from database
    static async deleteProject(id){
        
        try{
            const response = await db.one(`DELETE FROM projects WHERE id =$1;`, [id]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    // Updating current user that is logged in inside the current project table
    static async currentuserID(userID){
        
        try{
            const response = await db.result(`UPDATE currentproject SET current_userid = $1 WHERE id =1;`,[userID]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    // Select current User ID from the currenct project table
    static async getuserID(){
        
        try{
            const response = await db.one(`SELECT current_userid FROM currentproject WHERE id =1;`);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    // Update project to in review
    static async  markReview(id, projectID) {
        try {
            let response = await db.result(`UPDATE projects SET is_complete = true WHERE users_id =$1 and id = $2;`,[id, projectID]); 
            response = await db.result(`UPDATE projects SET is_approved = false WHERE users_id =$1 and id = $2;`,[id, projectID]);    
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }
//    Update project to complete
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