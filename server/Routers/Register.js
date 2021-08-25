const express = require("express");
const router = express.Router();
const {makeQuery} = require("../database.js");
const {REGISTERED_SUCCESSFUL,
    REGISTRATION_FAILED,
    DUPLICATE_USERNAME,
    STUDENT_REGISTRATION_FAILED,
    STUDENT_REGISTRATION_SUCCESS,
    EMPLOYEE_REGISTRATION_SUCCESS,
    EMPLOYEE_REGISTRATION_FAILED}  = require("../Response");
// path = /register

router.post("/", (req, res)=>{
    let body = req.body;
    let first_name = body.first_name.toString();
    let last_name = body.last_name;
    let date = body.date;
    let url = body.url;
    let username = body.username;
    let password = body.password;
    let role = body.role;
    let email = body.email;
    let standing= req.body.standing;
    let interests = req.body.interests;
    let job_title = req.body.job_title;
    console.log(first_name)
    //check validusername
    
    let values = [username, password, first_name, last_name, date, url, role, email];
    let q = "START TRANSACTION;" + 
    "INSERT INTO User(username, password, first_name, last_name, date_of_birth, url, role, email) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";
    if(role !== 'admin'){
        if(role === 'student'){
            q += "INSERT INTO Student VALUES((SELECT id FROM User WHERE username = ?), ?, ?, ?, ?);";
            values.push(username, standing, 0, 0.00, interests)

        }else{
            q += "INSERT INTO Employee VALUES((SELECT id FROM User WHERE username = ?), ?);";
            values.push(username, job_title)
        }   
    }
    q += "COMMIT;"
    makeQuery(q, values)
    .then(result=>{
        console.log("INSERTED: ");
        console.log(result);
        res.send({successful:true, msg:REGISTERED_SUCCESSFUL});
    }).catch(err=>{
        console.log(err)
        res.send({successful:false, msg: REGISTRATION_FAILED, err:err.code})
    })


})

router.post("/student", (req, res)=>{
    let id = req.body.id;
    let standing= req.body.standing;
    let interests = req.body.interests;
    let q = "INSERT INTO Student VALUES(?, ?, ?, ?, ?)";
    let values = [id,standing, 0, 0.00, interests]
    makeQuery(q, values)
    .then(results=>{
        console.log("ADDED STUDENT");
        res.send({successful:true, msg:STUDENT_REGISTRATION_SUCCESS})
    })
    .catch(err=>{
        console.log(err);
        res.send({successful:false, msg:STUDENT_REGISTRATION_FAILED})
    })
});

router.post("/employee", (req, res)=>{
    let id = req.body.id;
    let job_title = req.body.job_title;
    let q = "INSERT INTO Employee VALUES(?, ?)";
    let values = [id, job_title]
    makeQuery(q, values)
    .then(results=>{
        res.send({successful:true, msg:EMPLOYEE_REGISTRATION_SUCCESS})
    })
    .catch(err=>{
        console.log(err);
        res.send({successful:false, msg:EMPLOYEE_REGISTRATION_FAILED})
    })
});


module.exports = router;
