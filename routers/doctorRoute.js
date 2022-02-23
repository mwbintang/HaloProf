const router = require("express").Router();
const checkResultController = require("../controllers/checkResultController")


// router.get("/:doctorId", );
router.get(":doctorId/checkResult",checkResultController.showCheckResultsForDoctor)


module.exports = router;