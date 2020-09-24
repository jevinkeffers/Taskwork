// Importing the database from PG-Promise
const db = require("./conn");

class todoList {
    constructor(task){
        this.task = task;
        
    }
    //Static Async Method 
    static async getAll(id){
        try{
            const response = await db.any(`SELECT * FROM todolist WHERE users_id = $1;`,[id]);
            return response;
        } catch (error){
            return error.message;
        }
    }

    //Post will go here
    static async submitTask(id,task){
        
        try{
            const response = await db.result(`INSERT INTO todolist (users_id,todo_task)
            VALUES ($1,$2);`,[id,task]);        
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

    static async progressOne_completed_intesting(id) {
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
}

module.exports = todoList;