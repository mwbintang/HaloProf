const router = require("express").Router();
const deseasesController = require("../controllers/deseaseController")


router.get("/", deseasesController.deseaseList)
// app.get('/editpenyakit', )
// app.post('/editpenyakit', )


module.exports = router;