const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.use(express.static('./'))

console.log("I'm on a node server");

app.get('/', function (req, res) {
  //res.send('Hello Node from Express on local dev box')
  res.sendFile('index.html')
})

app.get('/ejs', (req,res) => {
  res.render('index', {
    myServerVariable : "something from server"
  });  

  // can you get content from client to console
})

app.listen(5000)
