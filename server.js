const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.redirect('/HomePage.html');
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
});