const express = require("express");
const router = express.Router();
const {makeQuery} = require("../database.js")
const {INVALID_CLASS_ID,
    FAILED_TO_LOAD_CLASSES,
    FAILED_TO_LOAD_CLASS,
    FAILED_TO_ADD_CLASS} = require("../Response")

//(/classes)
//Class Table
//class_id INT, 
//name string,
//description string,
//prereqs string,
//credits INT,

//(path="/", gets all classes)
router.get("/", (req, res)=>{
    let q = "SELECT * FROM Class";
    makeQuery(q, [])
    .then(results=>{
        res.send({successful:true, results:results})
    })
    .catch(err=>{
        res.send({successful:false, msg:FAILED_TO_LOAD_CLASSES});
    })
})

router.post("/add", (req, res)=>{
    let body = req.body;
    let name = body.name;
    let description = body.description;
    let prereqs = body.prereqs;
    let credits = body.credits;
    let required = body.required;

    let q = "INSERT INTO Class(name, description, prereqs, credits, required) VALUES(?, ?, ?, ?, ?)";
    let values = [name, description, prereqs, credits, required];

    makeQuery(q, values)
    .then(results=>{
        console.log(results);
        res.send({successful:true, class_id:results.insertId});
    }).catch(err=>{
        console.log(err);
        res.send({successful:false, msg:FAILED_TO_ADD_CLASS})
    })

})

router.get("/:id", (req, res)=>{
    let id = req.params.id;
    let q = "SELECT * FROM CLASS WHERE class_id=?";
    let values = [id];
    makeQuery(q, values)
    .then(results=>{
        if(results.length == 0){
            res.send({successful:false, msg: INVALID_CLASS_ID})
            return;
        }

        res.send({successful:true, results:results[0]})
    })
    .catch(err=>{
        res.send({successful:false, msg: FAILED_TO_LOAD_CLASS})
    });
})



router.delete("/remove", (req, res)=>{
    let id = req.body.id;
    let q = "DELETE FROM Class WHERE class_id = ?";
    let values = [id];
    makeQuery(q, values)
    .then(results=>{
        if(results.affectedRows==0){
            res.send({successful:false, msg:INVALID_CLASS_ID})
        }else{
            res.send({successful:true})
        }
    }).catch(err=>{
        res.send({successful:false, msg:""})
    })
})

router.put("/update", (req, res)=>{
    let body = req.body;
    let id = body.id;
    let name = body.name;
    let description = body.description;
    let prereqs = body.prereqs;
    let credits = body.credits;
    let required = body.required;

    let q = `UPDATE Class SET name = ? , description = ?, prereqs = ?, credits=?, required=? WHERE class_id = ?`;
    let values = [name, description, prereqs, credits, required, id];

    makeQuery(q, values)
    .then(results=>{
        if(results.affectedRows == 0){
            res.send({successful:false, msg:INVALID_CLASS_ID})
        }else{
            res.send({successful:true});
        }
    }).catch(err=>{
        res.send({successful:false, msg:""});
    })

})

module.exports = router;