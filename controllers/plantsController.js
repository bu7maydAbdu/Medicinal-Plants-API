const cloudinary = require("../middleware/cloudinary");
const Plant = require("../models/Plant")




module.exports = {
    getApi : async (request, response)=>{

        try{
            const plants = await Plant.find()
           
        
                response.json(plants)
        
         

        }catch(err){
            console.error(err)
        }
       
       
    },
    addPlant : async (request, response) => {

        try {
            console.log(request.body)
        //    console.log(request.file.path) 
            const result = await cloudinary.uploader.upload(request.file.path);

            await Plant.create({
                
                plantName: request.body.plantName,
                 familyName: request.body.familyName,
                  scientificName: request.body.scientificName,
                     mainIngredient: request.body.mainIngredient,
                     partUsed: request.body.partUsed, areaOfPlant: request.body.area,
                      biologicalActivity: request.body.biologicalActivity,
                         image: result.secure_url,
                     cloudinaryId: result.public_id
    
                    })

                    console.log("Plant has been added!");
      response.redirect(`/${process.env.dashboard}`);

        }catch(err){

            console.log(err)
        }
  
    }, 
    searchPlantByName : async (request, response) => {
      try {
        // console.log(request.body)

const plantSearched = await Plant.find({plantName : request.body.searchedPlant})
// console.log(plantSearched)
response.render("searchPage.ejs", {plant : plantSearched, filteredBy : request.body.searchedPlant})


      }catch(err){
        console.log(err)
      }

    },


    getPlant : async (request, response) => {
        try {
            //  console.log(request.params)
            const plant = await Plant.findById({_id : request.params.id})
            // console.log(plant.plantName)
            response.render("plantPage.ejs", {plant : plant})

        }catch(err){
            console.log(err)
        }
    }, 


deletePlant : async (request, response) => {
            try {

                let plant = await Plant.findById({ _id: request.params.id });
                console.log("plant found")
                console.log(plant)
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(plant.cloudinaryId);
      console.log("destroyed")
      // Delete post from db
      await Plant.deleteOne({ _id: request.params.id });
      console.log("Deleted Plant");
      response.redirect(`/${process.env.dashboard}`);

            }catch(err){
                console.log(err)
            }
}

}