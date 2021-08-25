const express = require("express");
const router = express.Router();
const {makeQuery} = require("../database.js");
//path="/enrollment"

router.get("/enrolled", (req, res)=>{
    console.log(req.originalUrl)
    console.log("GETTING /enrollment GET Request, ID: " + req.query.student_id);
    let student_id = parseInt(req.query.student_id);

    let q ="SELECT C.name, U.first_name, U.last_name, T.time_start, T.time_end, T.start_period, T.end_period, T.days, T.status "+ 
    "FROM Enrollment as E, Teaching as T, User as U, Class as C " + 
    "WHERE C.class_id = T.class_id AND U.id = T.employee_id AND E.teaching_id = T.teaching_id AND E.student_id = ?"
    
    makeQuery(q, [student_id])
    .then(results=>{
        console.log(results)
        res.send({successful:true, results:results});
    }).catch(err=>{
        console.log(err);
        res.send({successful:false, msg:""});
    })

})

router.get("/enrolled/:status", (req, res)=>{
    let student_id = req.query.student_id;
    let status = req.params.status;

    let q =`SELECT * FROM Enrollment as E, Teaching as T WHERE E.teaching_id = T.teaching_id AND E.student_id = ? AND T.status = ?`
    
    makeQuery(q, [student_id, status])
    .then(results=>{
        res.send({successful:true, results:results});
    }).catch(err=>{
        res.send({successful:false, msg:""});
    })

})


router.post("/enroll", (req, res)=>{
    let student_id = req.body.student_id;
    let teaching_id = req.body.teaching_id;


    let q =`INSERT INTO Enrollment VALUES(?, ?)`
    let values = [student_id, teaching_id];
    
    makeQuery(q, values)
    .then(results=>{
        if(results.affectedRows==0){
            res.send({successful:false, msg:""})
            return;
        }
        res.send({successful:true});
    }).catch(err=>{
        res.send({successful:false, msg:""});
    })

})

router.post("/unenroll", (req, res)=>{
    let student_id = req.body.student_id;
    let teaching_id = req.body.teaching_id;


    let q =`DELETE FROM Enrollment WHERE student_id =? AND teaching_id = ?`;
    let values = [student_id, teaching_id];
    
    makeQuery(q, values)
    .then(results=>{
        if(results.affectedRows==0){
            res.send({successful:false, msg:""})
            return;
        }
        res.send({successful:true});
    }).catch(err=>{
        res.send({successful:false, msg:""});
    })

})

module.exports = router;