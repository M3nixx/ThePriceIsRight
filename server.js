"use strict"; 

const fs = require('fs');

const port = 8080;



app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
});

app.get('/api/images', async (request, response) => {
  console.log('GET /api/images');
  fs.readFile('data/images.json', (error, data) => {
    if (error) {
        console.error(error);
        return;
    }
    const images = JSON.parse(data.toString()).images;
    response.status(200).send(images);
  });
});
  
