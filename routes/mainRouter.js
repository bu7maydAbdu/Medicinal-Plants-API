const express = require("express")
const router = express.Router()
const mainController = require("../controllers/mainController")


router.get("/", mainController.getHomePage)

router.get(`/${process.env.adminLoginPagePath}`, mainController.adminLoginPage)

router.post("/adminLoggingIn", mainController.adminLoggingIn)




module.exports = router