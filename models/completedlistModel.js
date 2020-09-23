// Importing the database from PG-Promise
const db = require("./conn");

class completedList {
    constructor(task){
        this.task = task;
        
    }
    //Static Async Method 
    static async getAllCompletedlist(id){
        try{
            const response = await db.any(`SELECT * FROM completedlist WHERE users_id = $1;`,[id]);
            // console.log(response);
            return response;
        } catch (error){
            return error.message;
        }
    }

    //Post will go here
    static async submitTaskCompletedlist(id,task){
        
        try{
            const response = await db.result(`INSERT INTO completedlist (users_id, completed_task)
            VALUES ($1,$2);`,[id,task]);        
            return response;
        } catch (error){
            return error.message;
        }
    }

    static async deleteOneCompletedlist(id){
        
        try{
            const response = await db.result(`DELETE FROM completedlist WHERE id =$1;`,[id]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
}

module.exports = completedList;