const express = require("express");
const router = express.Router();
const {makeQuery} = require("../database");
const {INVALID_CLASS_STATUS, DATABASE_ERROR, INVALID_CLASS_ID}  = require("../Response");

//Teaching Table
//teaching_id INT auto_increment
//class_id INT,
//employee_id INT,
//sem STRING ("SPRING", "FALL", "FALL-SPRING")
//enrollment_cap INT, 
//start_date DATE,
//end_date DATE,
//time_start TIME,
//time_end TIME,
//time_period STRING ("AM", "PM")
//status ("finished", "ongoing", "next-year")

//(path="/teaching")

router.get("/", (req, res)=>{
    let q = "SELECT * FROM Teaching";
    makeQuery(q, [])
    .then(results=>{
        res.send({successful:true, results:results});
    }).catch(err=>{
        res.send({successful:false, msg:DATABASE_ERROR})
    })
})


router.get("status/:status", (req, res)=>{
    let status = req.params.status; 
    if(status != "finished" && status != "ongoing" && status != "next-year"){
        res.send({successful:false,msg:INVALID_CLASS_STATUS})
        return;
    }

    let q = "SELECT * FROM Teaching WHERE status = ?";
    let values = [status];

    makeQuery(q, values)
    .then(results=>{
        res.send({successful:true, results:results});
    }).catch(err=>{
        res.send({successful:false, msg:DATABASE_ERROR})
    })
});


router.get("/class/:teaching_id", (req, res)=>{
    let teaching_id = req.params.teaching_id; 
  
    let q = "SELECT * FROM Teaching WHERE teaching_id = ?";
    let values = [teaching_id];

    makeQuery(q, values)
    .then(results=>{
        res.send({successful:true, results:results});
    }).catch(err=>{
        res.send({successful:false, msg:DATABASE_ERROR})
    })
});


router.get("/employee", (req, res)=>{
    //TODO:try catch
    console.log("HI");
    let employee_id = parseInt(req.query.employee_id); 
    

    let q ="SELECT C.name, U.first_name, U.last_name, T.time_start, T.time_end, T.start_period, T.end_period, T.days, T.status "+ 
    "FROM Teaching as T, User as U, Class as C " + 
    "WHERE C.class_id = T.class_id AND U.id = T.employee_id AND T.employee_id=?";
    let values = [employee_id];

    makeQuery(q, values)
    .then(results=>{
        console.log(results);
        res.send({successful:true, results:results});
    }).catch(err=>{
        console.log(err);
        res.send({successful:false, msg:DATABASE_ERROR})
    })
});




router.post("/add", getColumns, (req, res)=>{

    let q = "INSERT INTO " + 
    "Teaching(class_id, employee_id, sem, enrollment, enrollment_cap, start_date, end_date, time_start, time_end, time_period, status)"+  
    "VALUES(?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    let values = req.values;

    makeQuery(q, values)
    .then(results=>{
        res.send({successful:true});
    }).catch(err=>{
        console.log(err);
        res.send({successful:false, msg:""})
    })


});

router.delete("/remove", (req, res)=>{
    let teaching_id = req.body.teaching_id;
    let q = "DELETE FROM Teaching WHERE teaching_id = ?";
    let values = [teaching_id];
    makeQuery(q, values)
    .then(results=>{
        if(results.affectedRows == 0){
            res.send({successful:false, msg:INVALID_CLASS_ID})
            return;
        }
        res.send({successful:true})
    }).catch(err=>{
        //TODO: look into error to send proper msg 
        res.send({successful:false, msg:INVALID_CLASS_ID})
    })
});

router.put("/:teaching_id", getColumns, (req, res)=>{
    let id = req.params.teaching_id;
    let values = req.values;
    values.push(id);
    let q = "UPDATE Teaching SET class_id=?, employee_id=?, sem=?, enrollment=?, enrollment_cap=?, start_date=?, end_date=?, time_start=?, time_end=?, time_period=?, status=? WHERE teaching_id=?"
    makeQuery(q, values)
    .then(results=>{
        res.send({successful:true});
    }).catch(err=>{
        res.send({successful:false, msg:IN})
    })
});

function getColumns(req, res, next){
    let body = req.body;
    let class_id = body.class_id;
    let employee_id = body.employee_id;
    let sem = body.sem;
    let enrollment = body.enrollment;
    let enrollment_cap = body.enrollment_cap;
    let start_date = body.start_date;
    let end_date = body.end_date;
    let time_start = body.time_start;
    let time_end = body.time_end;
    let time_period = body.time_period;
    let status = body.status;

    req.values = [class_id, employee_id, sem, enrollment, enrollment_cap, start_date, end_date, time_start, time_end, time_period, status];

    next();
}


module.exports = router;