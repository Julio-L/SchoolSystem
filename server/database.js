const mysql = require("mysql");

let con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'pass4root',
    database: 'julyschool',
    multipleStatements: true
});

const makeQuery = (query, values) =>{
    return new Promise((res, rej)=>{ 
        con.query(query, values, (err, results, fields)=>{
            if(err){
                rej(err);
                return;
            }
            res(results);
        });
    })
}

const stopConnections = ()=>{
    con.end();
}


module.exports = {makeQuery, stopConnections};