const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
// const { ObjectId } = require('bson');
const ObjectId = require('mongodb').ObjectId;

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
  const ordersCollection = client.db("fruitVillage").collection("orders");
  console.log('Database connected successfully.');


    app.get('/events', (req, res) => {
      fruitsCollection.find()
      .toArray((err, items) => {
        // console.log('From Database Images.', items);
        res.send(items)
      })
    })

    app.get('/fruitDetail', (req, res) => {
      fruitsCollection.find()
      .toArray((err, fruit) => {
        // console.log('From Database Images.', items);
        res.send(fruit)
      })
    })

    app.get('/orders', (req, res) => {
      ordersCollection.find()
      .toArray((err, order) => {
        // console.log('From Database Images.', items);
        res.send(order)
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


 app.post('/addOrder', (req, res) => {
  const order = req.body;
  // console.log(product);
  ordersCollection.insertOne(order)
  .then(result => {
    // console.log(result.insertedCount);
    res.send(result.insertedCount > 0)
  })
})

//  app.get('fruitDetail/:id', (req, res) => {
//   fruitsCollection.find({_id: ObjectId(req.params.id)})
//   .toArray( (err, documents) =>{
//     res.send(documents);
//   })
//  })

//  app.get('/fruitDetail/:id', (req, res) => {
//   const fruitDetail = req.body;
//   fruitsCollection.find(fruitDetail)
//   .toArray((err, fruit) => {
//     // console.log('From Database Images.', items);
//     res.send(fruit)
//   })
// })
 app.delete('/delete/:id', (req, res) =>{
  fruitsCollection.deleteOne({_id: ObjectId(req.params.id)})
  .then(  result =>{
    // console.log(result);
    res.send(result.deletedCount > 0);
  })
 })

})








app.get('/', (req, res) => {
    res.send('Hello World! New Project.')
  })
  
  app.listen(process.env.PORT || port)