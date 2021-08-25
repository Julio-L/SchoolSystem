const express = require("express");
const router = express.Router();
const {makeQuery} = require("../database.js");

//path = /assignments
router.get("/:teaching_id", (req,res)=>{
    let teaching_id = req.params.teaching_id;

    let q = "SELECT * FROM Assignments WHERE teaching_id = ?";
    makeQuery(q, [teaching_id])
    .then(results=>{
        res.send({successful:true, results:results})
    }).catch(err=>{
        res.send({successful:false, msg:""})
    })
})

router.post("/add", (req,res)=>{
    let teaching_id = req.body.teaching_id;
    let assignment_id = req.body.assignment_id;
    let title = req.body.title;

    let q = "INSERT INTO Assignments VALUES(?, ?, ?)";
    makeQuery(q, [teaching_id,assignment_id, title])
    .then(results=>{
       if(results.affectedRows == 0){
           res.send({successful:false, msg:""})
           return;
       }
       res.send({successful:true})
    }).catch(err=>{
        res.send({successful:false, msg:""})
    })

})


router.post("/add/all", (req,res)=>{
    let teaching_id = req.body.teaching_id;
    let assignment_id = req.body.assignment_id;

    let q = "SELECT student_id FROM Enrollment WHERE teaching_id = ?";
    makeQuery(q, [teaching_id])
    .then(results=>{
        let statements = "INSERT IGNORE INTO StudentAssignment VALUES";
        for(let i = 0; i < results.length; i++){
            let student_id = results[i].student_id;
            statements += `(${teaching_id}, ${assignment_id}, ${student_id}, ${0}, ${title}, "", ${false}, ${new Date().toJSON().slice(0, 10)})`;
            if(i  +1 == results.length){
                statements += ";"
            }else {
                statements += ",";
            }
        }
        makeQuery(statements, [])
        .then(results=>{
            res.send({successful:true});
        }).catch(err=>{
            res.send({error});
        })
    }).catch(err=>{
        res.send({successful:false, msg:""})
    })

})


router.post("/add/single/:student_id", (req,res)=>{
    let teaching_id = req.body.teaching_id;
    let assignment_id = req.body.assignment_id;
    let title = req.body.title;
    let student_id = req.body.student_id;

    let q = `INSERT INTO StudentAssignment VALUES(?, ?, ?, 0, ?, '', ${false}, ${new Date().toJSON().slice(0, 10)})`;
    makeQuery(q, [teaching_id, assignment_id,student_id, title])
    .then(results=>{
        if(results.affectedRows == 0){
            res.send({successful: false, msg:""});
            return;
        }
        res.send({successful:true});
    }).catch(err=>{
        res.send({successful:false, msg:""})
    })
})


router.put("/update", (req,res)=>{
    let teaching_id = req.body.teaching_id;
    let assignment_id = req.body.assignment_id;
    let student_id = req.body.student_id;
    let grade = req.body.grade;
    let comment = req.body.comment;


    let q = "UPDATE StudentAssignment SET grade = ?, comment = ?, checked = ?, last_updated=? WHERE teaching_id=? AND assignment_id=?, and student_id = ?";
    makeQuery(q, [grade, comment,teaching_id, assignment_id , student_id, false, new Date().toJSON().slice(0, 10)])
    .then(results=>{
        if(results.affectedRows == 0){
            res.send({successful: false, msg:""});
            return;
        }
        res.send({successful:true});
    }).catch(err=>{
        res.send({successful:false, msg:""})
    })
})

router.get("/class/:student_id", (req, res)=>{
    let student_id = req.params.student_id;
    let teaching_id = req.body.teaching_id;
    let q = "SELECT * StudentAssignment WHERE student_id=? AND teaching_id = ?";
    let values = [student_id, teaching_id];

    makeQuery(q, values)
    .then(results=>{
        res.send({successful:true, results:results});
    }).catch(err=>{
        res.send({successful:false, msg:""})
    })
})


module.exports = router;
