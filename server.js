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
    
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })
    
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
        })
        .catch(error => console.error(error))
    })

})