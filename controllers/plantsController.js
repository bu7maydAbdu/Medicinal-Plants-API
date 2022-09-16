const express = require("express")
const Plant = require("../models/Plant")


// app.post('/addPlant', (request, response) => {
//     db.collection('plants').insertOne({plantName: request.body.plantName, plantArabicName: request.body.plantArabicName, familyName: request.body.familyName, scientificName: request.body.scientificName,
//     mainIngredient: request.body.mainIngredient,partUsed: request.body.partUsed, areaOfPlant: request.body.area, biologicalActivity: request.body.biologicalActivity, plantImage: request.body.plantImage})
//     .then(result => {
//         console.log('plant Added')
//         response.redirect('/')
//     })
//     .catch(error => console.error(error))
// })

//            }catch(err){
//              console.error(err)
//            }
    
//     }

module.exports = {
    getApi : async (request, response)=>{

        try{
            const plants = await Plant.find()
           
        
                response.json(plants)
        
         

        }catch(err){
            console.error(err)
        }
       
       
    }
}