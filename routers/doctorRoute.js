const router = require("express").Router();
const CheckResultController = require("../controllers/checkResultController");
const userController = require("../controllers/userController");


// router.get("/:doctorId", );
router.get("/:doctorId/checkResult",CheckResultController.showCRForDoctor);
router.route("/:doctorId/checkResult/add")
    .get(CheckResultController.showCRForm)
    .post(CheckResultController.createCR);
router.get("/:doctorId/user/:userId",userController.showUserProfile);
router.get("/:doctorId/checkResult/delete/:id",CheckResultController.deleteCR);
router.get("/:doctorId/checkResult/:id",CheckResultController.showCRDetail);


module.exports = router;