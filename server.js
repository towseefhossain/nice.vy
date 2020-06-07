const express = require('express')
const bodyParser =  require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express();
const connectionString = "mongodb+srv://dbUser:y7Yn3MolyGUnCcaR@cluster0-srucn.gcp.mongodb.net/test?retryWrites=true&w=majority"

app.listen(3000, function() {
    console.log('listening on 3000')
})

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('quotesDB')
    const quotesCollection = db.collection('quotes')

    app.set('view engine','ejs')
    
    app.get('/', (req, res) => {
        const cursor = db.collection('quotes').find().toArray()
        .then(results => {
            res.render('index.ejs', { quotes: results})
        })
        .catch(error => console.error(error))
    })
    
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            // console.log(result)
        })
        .catch(error => console.error(error))
    })

})