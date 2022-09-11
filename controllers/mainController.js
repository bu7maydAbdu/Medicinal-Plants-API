const { request, response } = require("express")
const Plant = require("../models/Plant")

module.exports = {
    getHomePage : async (request, response)=> {
           try {
            const plants = await Plant.find()
          response.render('index.ejs', { plants: plants })
            
    }catch(err){
          console.error(err)
    }

},
adminLoginPage : async (request, response) => {
      response.render("adminLogin.ejs")
}, 

adminLoggingIn : async (request, response) => {
      const plants = await Plant.find()
      response.render("dashboard.ejs", { plants: plants })
}
}