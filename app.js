const express = require("express");
const app = express();
const port = 3000;
const Controller = require('./controllers/deseaseController')
const doctorRoute = require("./routers/doctorRoute")
const deseaseRoute = require("./routers/deseaseRoute")

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
// app.get('/', Controller.home)
// app.get('/login')
// app.get('/logout')
app.use("/doctor",doctorRoute);
app.use("/penyakit", deseaseRoute)
// app.get('/register')
// app.post('/register')
// app.get('/user/:id/', )
// app.get('/user/:id/checkResult', )
// app.get('/doctor/:Id', )
// app.get('/doctor/:id/checkresult/add', )
// app.post('/doctor/:id/checkresult/add', )
// app.get('/penyakit/editpenyakit', )
// app.post('/penyakit/editpenyakit', )

app.listen(port, ()=>{
    console.log("connect");
})