const express = require('express');
const app = express();
let PORT = 3001;
const cors = require('cors')
const auth = require("./Routers/auth.js")
const register = require("./Routers/Register.js");
const classes = require("./Routers/Classes.js");
const teaching = require("./Routers/Teaching");
const enrollment = require("./Routers/Enrollment");
const assignments = require("./Routers/Assignments")
const users = require("./Routers/Users");


app.use(express.json());
app.use(cors());

app.use("/auth", auth);

app.use("/register", register);
app.use("/classes", classes);
app.use("/teaching", teaching);
app.use("/enrollment", enrollment);
app.use("/user", users);



app.get("/", (req, res)=>{
    res.send("home");
})

app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT);
})


