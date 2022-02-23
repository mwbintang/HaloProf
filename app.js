const express = require('express')
const app = express()
const port = 3000
const Controller = require('./controllers')

app.set('view engine', 'pug')
app.use(express.urlencoded({extended:false}));

// app.get('/', Controller.home)
// app.get('/login')
// app.get('/logout')
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})