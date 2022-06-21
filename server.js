const express = require('express')
const app = express()
const cors = require("cors")
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Medicinal-Plants-API'

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })



app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.get('/',(request, response)=>{
    db.collection('plants').find().toArray()
    .then(data => {
        console.log(data)
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.get('/api', (request, response)=>{
    db.collection('plants').find().toArray()
    .then(data => {

        response.json(data)
        console.log(data)

    })
   
})


// app.post('/addPlant', (request, response) => {
//     db.collection('plants').insertOne({plantName: request.body.plantName,
//     mainIngredient: request.body.mainIngredient})
//     .then(result => {
//         console.log('plants Added')
//         response.redirect('/')
//     })
//     .catch(error => console.error(error))
// })




app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})