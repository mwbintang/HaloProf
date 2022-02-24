const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Controller = require('./controllers/index')
const doctorRoute = require("./routers/doctorRoute")
const deseaseRoute = require("./routers/deseaseRoute")
const authRoute = require("./routers/authRoute")
const userRoute = require("./routers/userRoute");

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: true,
    cookie: { 
        secure: false
    }
}));
app.use(cookieParser());

app.use("/desease", deseaseRoute);
app.get('/', Controller.home);
app.use('/', authRoute);

app.use(Controller.isUserAlreadyLogin);
app.use("/user",userRoute);
app.use(Controller.isUserADoctor);
app.use("/doctor", doctorRoute);



app.listen(port, ()=>{
    console.log("connect");
})