require('dotenv').config()
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const PORT = process.env.PORT || 5500;
const uri = `mongodb+srv://cpride11:${process.env.MONGO_PWD}@cluster0.mw4al.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static('./public/'))

console.log(uri);

console.log('im on a node server, yo');


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// app.get('/', function (req, res) {
//   // res.send('Hello Node from Ex on local dev box')
//   res.render('song', {
//     songData : "Welcome to the song page"
//   });
// })

// app.get('/ejs', (req,res)=>{

//   res.render('index', {
//     songData : "Welcome to the song page"
//   });

//   //can you get content from client...to console? 
// })


app.get('/', async function (req, res) {

  //start here, delete old / and rename this one from /test to / 
  console.log('in /');
  await client.connect();
  console.log("I should be connected");

  // p.ping("https://ubiquitous-umbrella-dev-idx5.onrender.com")
  //   .then(result => {
  //     console.log('I should be connected' + result);
  //     // Send a ping to confirm a successful connection
  //   })
  //   .catch(result => {
  //     console.error('Not connected' + result);
  //   })

  let result = await client.db("courtneys-db").collection("courtneys-collection")
    .find({}).toArray();
  console.log(result);

  // app.get('/ejs', (req, res) => {
  res.render('song', {
    songData: result
  });
  // });
  //makes sure on song.ejs to change severVarable to songData
});

app.post('/insert', async (req, res) => {

  console.log('in /insert');

  // console.log('request', req.body);
  // console.log('request', req.body.newPost);

  //connect to db,
  await client.connect();

  //point to the collection 
  await client.db("courtneys-db").collection("courtneys-collection").insertOne({ fname: req.body.fname });
  //await client.db("courtneys-db").collection("courtneys-collection").insertOne({ iJustMadeThisUp: 'hardcoded new key '});  
  //insert into it

  res.redirect('/');

});


app.post('/update/:id', async (req, res) => {

  console.log("req.body: ", req.body)

  client.connect;

  const collection = client.db("courtneys-db").collection("courtneys-collection");

  let result = await collection.findOneAndUpdate(
    { "_id": new ObjectId(req.body.nameID) }, { $set: { "fname": req.body.inputUpdateName } }
  )
    .then(result => {
      console.log(result);
      res.redirect('/');
    })
});

app.post('/delete/:id', async (req, res) => {

  console.log("in delete, req.parms.id: ", req.params.id)

  await client.connect;

  const collection = client.db("courtneys-db").collection("courtneys-collection");

  let result = await collection.findOneAndDelete(
    { "_id": new ObjectId(req.params.id) }).then(result => {
      console.log(result);
      res.redirect('/');
    })

  //insert into it

})


//app.listen(5500)

app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});