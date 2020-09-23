// Importing the database from PG-Promise
const db = require("./conn");

class inprogList {
    constructor(task, id){
        this.task = task;
        this.id = id;
        
    }
    //Static Async Method 
    static async getAllInprog(id){
        try{
            const response = await db.any(`SELECT * FROM inproglist WHERE users_id = $1;`,[id]);
            // console.log(response);
            return response;
        } catch (error){
            return error.message;
        }
    }

    //Post will go here
    static async submitTaskInprog(id,task){
        
        try{
            const response = await db.result(`INSERT INTO improglist (users_id, inprog_task)
            VALUES ($1,$2);`,[id,task]);        
            return response;
        } catch (error){
            return error.message;
        }
    }

    static async deleteOneInprog(id){
        
        try{
            const response = await db.result(`DELETE FROM improglist WHERE id =$1;`,[id]);        
            return response;
        } catch (error){
            return error.message;
        }
    }
}

module.exports = inprogList;