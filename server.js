const express = require('express')
const cors = require("cors")
const PORT = 8000
const mongoose = require("mongoose")
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require("method-override")
const flash = require('express-flash')
const multer  = require('multer')
require('dotenv').config({path: './config/.env'})
const main = require("./routes/mainRouter")
const plantsRoute = require("./routes/plantsRoute")
const connectDB = require("./config/database")

require('./config/passport')(passport)


const app = express()

connectDB()




app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Use forms for put / delete
app.use(methodOverride("_method"));



// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({mongoUrl:process.env.DB_STRING})
    })
  )
  


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())





app.use("/", main)
app.use("/plants", plantsRoute)
// app.use("/addPlant", plants )


// app.get('/home',(request, response)=>{
//     db.collection('plants').find().toArray()
//     .then(data => {
//         console.log(data)
//         response.render('home.ejs', { info: data })
//     })
//     .catch(error => console.error(error))
// })







app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})

