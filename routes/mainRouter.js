const express = require("express")
const router = express.Router()
const mainController = require("../controllers/mainController")
const authController = require("../controllers/auth")
const plantsController = require("../controllers/plantsController")
const {ensureAuth} = require("../middleware/adminAuth")


router.get("/", mainController.getHomePage)

router.get(`/${process.env.dashboard}`, ensureAuth , mainController.dasboardPage )

router.get(`/${process.env.adminLoginPagePath}`, mainController.adminLoginPage)

router.post("/adminLoggingIn", authController.postLogin)

router.post("/adminSignUp", authController.postSignup)

router.get('/api', plantsController.getApi )




module.exports = router