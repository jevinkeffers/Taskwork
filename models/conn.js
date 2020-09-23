// ==================PGP-Header (from elephant sql)===========
const hostname = "lallah.db.elephantsql.com";
const database = "thmpvpwv";
const user = "thmpvpwv";
const password = "B3AGIAMLvINg2NH_PeQiRN7WusgtDAWH";


// ==================PGP-Wrapper=============================
//importing pg-promise library (interface with postgre)
//Whatever sql query we run this willl log it to the console
const pgp = require ('pg-promise')({
    query: function(e){
        console.log("QUERY: ",e.query)
    }
});

const options = {
    host: hostname,
    database: database,
    user: user,
    password: password

}

// talk to the database use these specified options
const db = pgp(options);
// export the db out
module.exports = db;
// ========================================================