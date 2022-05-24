const express = require('express');
const path = require('path')
const port = 3000;

const app = express();

app.get('/', (req, res) => {
  res.status(200).sendFile('./client/index.html');
});

app.listen(port, (req, res) => {
  console.log(`listening on ${port}`);
});