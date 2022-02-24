const router = require("express").Router();
const userController = require("../controllers/userController");
const CheckResultController = require("../controllers/checkResultController");

router.get("/:userId", userController.showUserProfile);
router.get("/:userId/checkResult/:checkResultId",CheckResultController.showCRDetail);

module.exports = router;