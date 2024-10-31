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

console.log('im on a node server change that and that tanad f, yo');


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', function (req, res) {
  // res.send('Hello Node from Ex on local dev box')
  res.render('song', {
    songData : "Welcome to the song page"
  });
})

app.get('/ejs', (req,res)=>{

  res.render('index', {
    songData : "Welcome to the song page"
  });

  //can you get content from client...to console? 
})


app.get('/test', async (req, res) => {

  //start here, delete old / and rename this one from /test to / 
  console.log('in /');
  await client.connect();

  console.log('I should be connected');
  // Send a ping to confirm a successful connection

  let result = await client.db("courtneys-db").collection("courtneys-collection")
    .find({}).toArray();
  console.log(result);

  res.render('song', {
    songData: result
  });
  //makes ure on song.ejs to change severVarable to songData
})

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

  client.connect;

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