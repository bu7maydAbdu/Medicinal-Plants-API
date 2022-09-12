const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config({path: './config/.env'})
const main = require("./routes/mainRouter")
// const plants = require("./routes/plantsRoute")
const connectDB = require("./config/database")

const app = express()

connectDB()




app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())









app.use("/", main)
// app.use("/addPlant", plants )


// app.get('/home',(request, response)=>{
//     db.collection('plants').find().toArray()
//     .then(data => {
//         console.log(data)
//         response.render('home.ejs', { info: data })
//     })
//     .catch(error => console.error(error))
// })


app.get('/api', (request, response)=>{
    db.collection('plants').find().toArray()
    .then(data => {

        response.json(data)

    })
   
})






app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})

