const router = require("express").Router();
const deseasesController = require("../controllers/deseaseController")


router.get("/", deseasesController.deseaseList)


module.exports = router;