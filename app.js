const express = require("express");
const app = express();
const port = 3000;
const doctorRoute = require("./routers/doctorRoute")
const deseaseRoute = require("./routers/deseaseRoute")
const registerRoute = require("./routers/registerRoute")
const userRoute = require("./routers/userRoute")

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
// app.get('/', Controller.home)
// app.get('/login')
// app.get('/logout')
app.use("/doctor", doctorRoute);
app.use("/desease", deseaseRoute)
app.use('/register', registerRoute)
app.use("/user",userRoute);
// app.get('/user/:id/', )
// app.get('/user/:id/checkResult', )
// app.get('/doctor/:Id', )


app.listen(port, ()=>{
    console.log("connect");
})