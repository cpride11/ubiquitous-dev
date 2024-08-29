const express = require('express')
const app = express()

app.use(express.static('./'))

console.log("I'm on a node server");

app.get('/', function (req, res) {
  //res.send('Hello Node from Express on local dev box')
  res.sendFile('index.html')

app.listen(5000)
})