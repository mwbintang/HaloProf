const router = require("express").Router();
const CheckResultController = require("../controllers/checkResultController");
const userController = require("../controllers/userController");


// router.get("/:doctorId", );
router.get("/:doctorId/checkResult", CheckResultController.showCRForDoctor);
router.route("/:doctorId/checkResult/add")
    .get(CheckResultController.showCRForm)
    .post(CheckResultController.createCR);
router.route("/:doctorId/checkResult/edit/:checkResultId")
    .get(CheckResultController.showCREditForm)
    .post(CheckResultController.updateCR);
router.get("/:doctorId/user/:userId", userController.showUserProfile);
router.get("/:doctorId/checkResult/delete/:checkResultId", CheckResultController.deleteCR);
router.get("/:doctorId/checkResult/:checkResultId", CheckResultController.showCRDetail);


module.exports = router;