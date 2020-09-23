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
            // console.log(response);
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

    async progressOne(id) {
        try {
            const response = await db.any(``)
        }
        catch (error) {
            console.log("ERROR: ", error.message);
            return error.message;
        }
    }
}

module.exports = todoList;