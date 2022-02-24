const express = require("express");
const app = express();
const port = 3000;
const Controller = require('./controllers')
const doctorRoute = require("./routers/doctorRoute")
const deseaseRoute = require("./routers/deseaseRoute")
const registerRoute = require("./routers/registerRoute")
const userRoute = require("./routers/userRoute")

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
app.get('/', Controller.home)
// app.get('/login')
// app.get('/logout')

app.use("/desease", deseaseRoute)
app.use('/register', registerRoute)
app.use("/doctor", doctorRoute);
app.use("/user",userRoute);


app.listen(port, ()=>{
    console.log("connect");
})