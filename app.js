const express = require("express");
const app = express();
const port = 3000;
const Controller = require('./controllers')
const doctorRoute = require("./routers/doctorRoute")

app.set("view engine", "ejs");

app.use(express.urlencoded({extended:true}));
// app.get('/', Controller.home)
// app.get('/login')
// app.get('/logout')
app.use("/doctor",doctorRoute);
app.get("/penyakit", Controller.penyakit)
// app.get('/register')
// app.post('/register')
// app.get('/user/:id/', )
// app.get('/user/:id/checkResult', )
// app.get('/doctor/:Id', )
// app.get('/doctor/:id/checkresult/add', )
// app.post('/doctor/:id/checkresult/add', )
// app.get('/doctor/:id/editpenyakit', )
// app.post('/doctor/:id/editpenyakit', )

app.listen(port, ()=>{
    console.log("connect");
})