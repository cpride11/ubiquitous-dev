const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello Node from Express on local dev box')
})

app.listen(5000)

console.log("I'm on a node server");