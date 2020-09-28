// Importing the database from PG-Promise
const db = require("./conn");

// Class constructor for tasks
class todoList {
    constructor(task){
        this.task = task;
        
    }
    // Get all tasks to populate on page
    static async getAll(id, projectID){
        try{
            const response = await db.any(`SELECT * FROM projectstodo WHERE users_id = $1 AND project_id = $2;`,[id, projectID]);
            return response;
        } catch (error){
            return error.message;
        }
    }
    // Get project name from the database
    static async getProjectName(id, projectID){
        try{
            const response = await db.one(`SELECT name FROM projects WHERE users_id = $1 AND id = $2;`,[id, projectID]);
            return response;
        } catch (error){
            return error.message;
        }
    }
    // Get project description from database
    static async getProjectDescription(id, projectID){
        try{
            const response = await db.one(`SELECT project_description FROM projects WHERE users_id = $1 AND id = $2;`,[id, projectID]);
            return response;
        } catch (error){
            return error.message;
        }
    }

    //Post will go here
    static async submitTask(id,task,projectID){
        
        try{
            const response = await db.result(`INSERT INTO projectstodo (users_id,todo_task, project_id)
            VALUES ($1,$2,$3);`,[id,task, projectID]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    // Delete task from database
    static async deleteOne(id,projectID){
        
        try{
            const response = await db.result(`DELETE FROM projectstodo WHERE id =$1 AND project_id = $2;`,[id,projectID]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
    // Progress task to in progress
    static async progressOne(id,projectID) {
        try {
            let response = await db.result(`UPDATE projectstodo SET in_progress = todo_task WHERE id =$1 and project_id = $2;`,[id, projectID]); 

            response = await db.result(`UPDATE projectstodo SET todo_task = NULL  WHERE id =$1 and project_id = $2;`,[id,projectID]);      
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }
    // Send task back to todo
    static async backOne_inprogress(id, projectID) {
        try {
            let response = await db.result(`UPDATE projectstodo SET todo_task = in_progress WHERE id =$1 and project_id = $2;`,[id, projectID]); 

            response = await db.result(`UPDATE projectstodo SET in_progress = NULL  WHERE id =$1 and project_id = $2;`,[id, projectID]);      
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }


    // Progress task to in testing
    static async progressOne_intesting(id, projectID) {
        try {
            let response = await db.result(`UPDATE projectstodo SET in_testing = in_progress WHERE id =$1 and project_id = $2;`,[id, projectID]); 

            response = await db.result(`UPDATE projectstodo SET in_progress = NULL  WHERE id =$1 and project_id = $2;`,[id, projectID]);      
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }
    // Send task back to in progress
    static async backOne_intesting(id, projectID) {
        try {
            let response = await db.result(`UPDATE projectstodo SET in_progress = in_testing WHERE id =$1 and project_id = $2;`,[id, projectID]); 

            response = await db.result(`UPDATE projectstodo SET in_testing = NULL  WHERE id =$1 and project_id = $2;`,[id, projectID]);      
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }
    // Progress task to completed
    static async progressOne_completed(id, projectID) {
        try {
            let response = await db.result(`UPDATE projectstodo SET completed = in_testing WHERE id =$1 and project_id = $2;`,[id, projectID]); 

            response = await db.result(`UPDATE projectstodo SET in_testing = NULL  WHERE id =$1 and project_id = $2;`,[id, projectID]);      
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }
//    Send task back to in testing
    static async  backOne_complete(id, projectID) {
        try {
            let response = await db.result(`UPDATE projectstodo SET in_testing = completed WHERE id =$1 and project_id = $2;`,[id, projectID]); 

            response = await db.result(`UPDATE projectstodo SET completed = NULL  WHERE id =$1 and project_id = $2;`,[id, projectID]);      
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }
    
}

module.exports = todoList;