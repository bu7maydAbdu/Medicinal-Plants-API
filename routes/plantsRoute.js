const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer");
const plantsController = require("../controllers/plantsController")
const {ensureAuth} = require("../middleware/adminAuth")


router.post("/addPlant", upload.single("file"), plantsController.addPlant )

router.get("/:id", plantsController.getPlant)

router.post("/searchPlantByName", plantsController.searchPlantByName)

router.delete("/deletePlant/:id", plantsController.deletePlant);





module.exports = router