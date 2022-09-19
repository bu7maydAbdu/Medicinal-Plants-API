const mongoose = require("mongoose")

const plantSchema = new mongoose.Schema({

    plantName : {
        type : String,
        required : true
    }, 
    familyName : {
        type : String,
        required : true
    }, 
    scientificName : {
        type : String,
        required : true
    }, 
    mainIngredient : {
        type : String,
        required : true
    }, 
    partUsed : {
        type : String, 
        required : true
    },
    areaOfPlant : {
        type : String,
        required : true
    }, 
    biologicalActivity : {
        type : String,
        required : true
    }, 
    // image: {
    //     type: String,
    //     require: true,
    //   },
    //   cloudinaryId: {
    //     type: String,
    //     require: true,
    //   }
})

module.exports = mongoose.model("Plant", plantSchema)