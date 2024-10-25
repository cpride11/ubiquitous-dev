require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://cpride11:${process.env.MONGO_PWD}@cluster0.mw4al.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT || 3000;


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
    res.sendFile('index.ejs');
    res.sendFile('index.ejs');
  })
  
  app.get('/ejs', (req,res)=>{
  
    res.render('index', {
     
    });
  
    //can you get content from client...to console? 
  })
  

  app.get('/read', async (req,res)=>{

  app.get('/read', async (req,res)=>{

    console.log('in /read');
    await client.connect();
    
    console.log('I should be connected');
    // Send a ping to confirm a successful connection

  let result = await client.db("courtneys-db").collection("courtneys-collection").find({}).toArray();
    console.log(result);

    res.render('index', {
      postData : result
    });
  })

  app.post('/insert', async (req,res)=> {

    console.log('in /insert');

    console.log('request', req.body);
    console.log('request', req.body.newPost);

    //connect to db,
    await client.connect();
    
    //point to the collection 
    await client.db("courtneys-db").collection("courtneys-collection").insertOne({ post: 'hardcoded post insert '});
    //await client.db("courtneys-db").collection("courtneys-collection").insertOne({ iJustMadeThisUp: 'hardcoded new key '});  
    //insert into it
    
    res.redirect('read');
  
  }); 

  
  app.post('/update/:id', async (req,res)=>{

    console.log("req.parms.id: ", req.params.id)
  
    client.connect; 
    const collection = client.db("courtneys-db").collection("courtneys-collection");
    let result = await collection.findOneAndUpdate( 
    {"_id": new ObjectId(req.params.id)}, { $set: {"post": "NEW POST" } }
  )
  .then(result => {
    console.log(result); 
    res.redirect('/read');
  })
  }); 
  
  app.post('/delete/:id', async (req,res)=>{
  
    console.log("req.parms.id: ", req.params.id)
  
    client.connect; 
    const collection = client.db("courtneys-db").collection("courtneys-collection");
    let result = await collection.findOneAndDelete( 
    {"_id": new ObjectId(req.params.id)})
  
  .then(result => {
    console.log(result); 
    res.redirect('/read');
  })
  
    //insert into it
  
  })


//app.listen(5500)

app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});
