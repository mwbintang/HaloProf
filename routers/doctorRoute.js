const router = require("express").Router();
const checkResultController = require("../controllers/checkResultController")


// router.get("/:doctorId", );
router.get("/:doctorId/checkResult",checkResultController.showCRForDoctor)
router.route("/:doctorId/checkResult/add")
    .get(checkResultController.showCRForm)
    .post(checkResultController.createCR)
router.get("/:doctorId/checkResult/:id",checkResultController.showCRDetailForDoctor)


module.exports = router;