const router = require("express").Router();
const deseasesController = require("../controllers/deseaseController")


router.get("/", deseasesController.deseaseList)
router.get("/:id", deseasesController.deseaseListById)


module.exports = router;