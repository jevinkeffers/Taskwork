// Importing the database from PG-Promise
const db = require("./conn");

class testingList {
    constructor(task){
        this.task = task;
        
    }
    //Static Async Method 
    static async getAllTesting(id){
        try{
            const response = await db.any(`SELECT * FROM testinglist WHERE users_id = $1;`,[id]);
            console.log(response);
            return response;
        } catch (error){
            return error.message;
        }
    }

    //Post will go here
    static async submitTaskTesting(id,task){
        
        try{
            const response = await db.result(`INSERT INTO testinglist (users_id, testing_task)
            VALUES ($1,$2);`,[id,task]);        
            return response;
        } catch (error){
            return error.message;
        }
    }

    static async deleteOneTesting(id){
        
        try{
            const response = await db.result(`DELETE FROM testinglist WHERE id =$1;`,[id]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
}

module.exports = testingList;