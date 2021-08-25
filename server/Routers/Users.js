const express = require('express');
const router = express.Router();
const {makeQuery} = require("../database");
const {DATABASE_ERROR, INVALID_STUDENT_ID, INVALID_EMPLOYEE_ID} = require("../Response")

//path="/user"
router.get("/student/:student_id", (req, res)=>{
    let id = req.params.student_id;

    let q = "SELECT * FROM Student WHERE student_id = ?";
    makeQuery(q, [id])
    .then(results=>{
        console.log(results, id)
        if(results.length == 0){
            res.send({successful:false, msg:INVALID_STUDENT_ID})
            return;
        }
        res.send({successful:true, results:results[0]})
    }).catch(err=>{
        res.send({successful:false, msg:DATABASE_ERROR})
    })
})


router.get("/employee/:employee_id", (req, res)=>{
    let id = parseInt(req.params.employee_id);

    let q = "SELECT * FROM Employee WHERE employee_id = ?";
    makeQuery(q, [id])
    .then(results=>{
        console.log(results);
        if(results.length == 0){
            res.send({successful:false, msg:INVALID_EMPLOYEE_ID})
            return;
        }
        res.send({successful:true, results:results[0]})
    }).catch(err=>{
        console.log(err);
        res.send({successful:false, msg:DATABASE_ERROR})
    })
})

module.exports = router;