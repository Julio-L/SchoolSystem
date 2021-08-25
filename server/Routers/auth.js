const express = require("express");
const QueryString = require("qs");
const router = express.Router();
const {makeQuery} = require("../database.js");
const {AUTHENTICATION_FAILED, DATABASE_ERROR, NO_AUTHORIZATION} = require("../Response")


//path="/auth"

function authenticateUser(req, res, next){
    //TODO: implement json web tokens 
    //At this time, the user will just send an auth boolean attribute in req.body 
    if(req.body.auth){
        next();
    }else{
        res.send({successful:false, msg:AUTHENTICATION_FAILED})
    }
}


function authenticateStudent(req, res, next){
    //TODO: implement json web tokens 

    //TODO:
    //After Student routes are finished make sure that the student is only making requests for themselves. 
    //Despite having student authorization, dont allow the user to modify other students data.

    let username = req.body.username;
    let q = "SELECT role FROM User WHERE username = ?";
    let values = [username];
    makeQuery(q, values)
    .then(results=>{
        if(results[0].role === "student"){
            next();
        }else{
            res.send({successful:false, msg:NO_AUTHORIZATION})
        }
    }).catch(err=>{
        res.send({successful:false, msg:DATABASE_ERROR})
    })
}


function authenticateTeacher(req, res, next){
    //TODO: implement json web tokens 

    //TODO:
    //After Teaching routes are finished, make sure that the teacher is only making requests for themselves. 
    //Despite having Teacher authorization, dont allow the user to modify other teachers data.

    let username = req.body.username;
    let q = "SELECT role FROM User WHERE username = ?";
    let values = [username];
    makeQuery(q, values)
    .then(results=>{
        if(results[0].role === "teacher"){
            next();
        }else{
            res.send({successful:false, msg:NO_AUTHORIZATION})
        }
    }).catch(err=>{
        res.send({successful:false, msg:DATABASE_ERROR})
    })
}

function authenticateAdmin(req, res, next){
    //TODO: implement json web tokens 

    let username = req.body.username;
    let q = "SELECT role FROM User WHERE username = ?";
    let values = [username];
    makeQuery(q, values)
    .then(results=>{
        if(results[0].role === "admin"){
            next();
        }else{
            res.send({successful:false, msg:NO_AUTHORIZATION})
        }
    }).catch(err=>{
        res.send({successful:false, msg:DATABASE_ERROR})
    })
}




router.use((req, res, next)=>{
    let params = req.body
    console.log("User with Username:" + params.username +
     ", password: " + params.password 
     + " parameters tried to login at " + Date().toString());
    next();
})


//checks if password and username can be found in database
router.post("/", (req, res)=>{
    let body = req.body;
    let values = [body.username, body.password]
    let q = "SELECT * FROM User WHERE username = ? AND password = ?";
    makeQuery(q, values)
    .then((data)=>{
        //if exists send token
        if(data.length==1){
            res.status(200);
            res.send({auth: true, results:data[0]});
        }else{
            // res.status(400);
            res.send({auth: false});
        }
    })
    .catch((err)=>{
        console.log(err);
        res.status(401);
        res.send({auth:false});
    })

});

module.exports = router;
