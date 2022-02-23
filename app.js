const express = require("express");
const app = express();
const port = 3000;
const doctorRoute = require("./routers/doctorRoute")
const deseaseRoute = require("./routers/deseaseRoute")
const registerRoute = require("./routers/registerRoute")

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
// app.get('/', Controller.home)
// app.get('/login')
// app.get('/logout')
app.use("/doctor", doctorRoute);
app.use("/desease", deseaseRoute)
app.use('/register', registerRoute)
// app.get('/user/:id/', )
// app.get('/user/:id/checkResult', )
// app.get('/doctor/:Id', )
// app.get('/doctor/:id/checkresult/add', )
// app.post('/doctor/:id/checkresult/add', )


app.listen(port, ()=>{
    console.log("connect");
})