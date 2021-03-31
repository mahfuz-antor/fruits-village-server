const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

console.log(process.env.DB_USER);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cvjjn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri);


const app = express()

// app.use(bodyParser.json())

app.use(express.json());

app.use(cors());



const port = 5000


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log('connection err', err)
  const fruitsCollection = client.db("fruitVillage").collection("fruits");
  console.log('Database connected successfully.');


    app.get('/events', (req, res) => {
      fruitsCollection.find()
      .toArray((err, items) => {
        // console.log('From Database Images.', items);
        res.send(items)
      })
    })

 app.post('/addFruit', (req, res) => {
   const newEvent = req.body;
  //  console.log('adding new event', newEvent);
   fruitsCollection.insertOne(newEvent)
   .then(result => {
    //  console.log('event count', result.insertedCount);
     res.send(result.insertedCount > 0)
   })
 })

})








app.get('/', (req, res) => {
    res.send('Hello World! New Project.')
  })
  
  app.listen(process.env.PORT || port)