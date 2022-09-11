const mongoose = require("mongoose")

const plantSchema = new mongoose.Schema({

    plantName : {
        type : String
    }, 
    familyName : {
        type : String
    }, 
    scientificName : {
        type : String
    }, 
    mainIngredient : {
        type : String
    }, 
    areaOfPlant : {
        type : String
    }, 
    biologicalActivity : {
        type : String
    }, 
    plantImage : {
        type : String
    }

})

module.exports = mongoose.model("Plant", plantSchema)