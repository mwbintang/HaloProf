const router = require("express").Router();
const  AuthController = require("../controllers/authController")


router.get("/register", AuthController.registerAdd)
router.post("/register",  AuthController.registerPost)
router.get('/login', AuthController.showFormlogin);
router.post("/login", AuthController.login);
router.get("/logout", AuthController.logout);


module.exports = router;