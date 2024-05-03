const express = require('express');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(express.static('static'));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
});