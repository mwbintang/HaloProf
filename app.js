const express = require("express");
const app = express();
const port = 3000;
const doctorRoute = require("./routers/doctorRoute")

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
app.use("/doctor",doctorRoute);

app.listen(port, ()=>{
    console.log("connect");
})