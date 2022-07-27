const express = require('express');
const path = require('path');
const fs = require('fs');
const { get } = require('http');
const { randomUUID } = require('crypto');

const uuid = require('./helpers/uuid');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))

});

app.get('/api/notes', (req,res) => {
  console.log('get route for api');

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);
    
      res.send(parsedNotes);
      
    }
  });
})

app.post('/api/notes', (req,res) => {
  console.log(req.body)

  const {title, text} = req.body;

  const newNote = {
    title,
    text,
  };


  

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parsedNotes = JSON.parse(data);

      // Add a new review
      parsedNotes.push(newNote);

      // Write updated reviews back to the file
      fs.writeFile(
        './db/db.json',
        JSON.stringify(parsedNotes),
        (writeErr) =>
          writeErr
            ? console.error(writeErr)
            : console.info('Successfully updated Notes!')
      );
    }
  });
      
})






app.get('*', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);



// // Add a new review
// parsedReviews.push(newReview);

// // Write updated reviews back to the file
// fs.writeFile(
//   './db/reviews.json',
//   (parsedReviews, null, 4),
//   (writeErr) =>
//     writeErr
//       ? console.error(writeErr)
//       : console.info('Successfully updated reviews!')
// );