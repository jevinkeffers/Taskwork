// Importing the database from PG-Promise
const db = require("./conn");

class todoList {
    constructor(task){
        this.task = task;
        
    }
    //Static Async Method 
    static async getAll(id,projectid){
        try{
            const response = await db.any(`SELECT * FROM todolist INNER JOIN projects on todolist.project_id = projects.id WHERE todolist.users_id = $1 AND todolist.project_id = $2;`,[id,projectid]);
            // const response = await db.any(`SELECT * FROM todolist WHERE users_id = $1;`,[id]);
            return response;
        } catch (error){
            return error.message;
        }
    }

    //Post will go here
    static async submitTask(id,task,projectid){
        
        try{
             const response = await db.result(`INSERT INTO projectstodo (users_id,todo_task,projectid)
            // VALUES ($1,$2,$3);`,[id,task,projectid]);
            return response;
        } catch (error){
            return error.message;
        }
    }

    static async deleteOne(id){
        
        try{
            const response = await db.result(`DELETE FROM todolist WHERE id =$1;`,[id]);        
            return response;
        } catch (error){
            return error.message;
        }
    }

    static async progressOne(id) {
        try {
            let response = await db.result(`UPDATE todolist SET in_progress = todo_task WHERE id =$1;`,[id]); 

            response = await db.result(`UPDATE todolist SET todo_task = NULL  WHERE id =$1;`,[id]);      
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }

    static async backOne_inprogress(id) {
        try {
            let response = await db.result(`UPDATE todolist SET todo_task = in_progress WHERE id =$1;`,[id]); 

            response = await db.result(`UPDATE todolist SET in_progress = NULL  WHERE id =$1;`,[id]);      
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }



    static async progressOne_intesting(id) {
        try {
            let response = await db.result(`UPDATE todolist SET in_testing = in_progress WHERE id =$1;`,[id]); 

            response = await db.result(`UPDATE todolist SET in_progress = NULL  WHERE id =$1;`,[id]);      
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }

    static async backOne_intesting(id) {
        try {
            let response = await db.result(`UPDATE todolist SET in_progress = in_testing WHERE id =$1;`,[id]); 

            response = await db.result(`UPDATE todolist SET in_testing = NULL  WHERE id =$1;`,[id]);      
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }

    static async progressOne_completed(id) {
        try {
            let response = await db.result(`UPDATE todolist SET completed = in_testing WHERE id =$1;`,[id]); 

            response = await db.result(`UPDATE todolist SET in_testing = NULL  WHERE id =$1;`,[id]);      
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }
   
    static async  backOne_complete(id) {
        try {
            let response = await db.result(`UPDATE todolist SET in_testing = completed WHERE id =$1;`,[id]); 

            response = await db.result(`UPDATE todolist SET completed = NULL  WHERE id =$1;`,[id]);      
            return response;
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }
    
}

module.exports = todoList;