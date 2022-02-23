const router = require("express").Router();
const registerController = require("../controllers/registerController")


router.get("/", registerController.registerAdd)
router.post("/", registerController.registerPost)


module.exports = router;