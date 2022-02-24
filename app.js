const express = require("express");
const app = express();
const port = 3000;
const session = require('express-session');
const cookieParser = require('express-session');
const Controller = require('./controllers')
const doctorRoute = require("./routers/doctorRoute")
const deseaseRoute = require("./routers/deseaseRoute")
const authRoute = require("./routers/authRoute")
const userRoute = require("./routers/userRoute");

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
    cookie: { secure: false }
}));
// app.use(cookieParser());



app.get('/', Controller.home)
app.use('/', authRoute)

app.use("/desease", deseaseRoute);
app.use("/doctor", doctorRoute);
app.use("/user",userRoute);


app.listen(port, ()=>{
    console.log("connect");
})