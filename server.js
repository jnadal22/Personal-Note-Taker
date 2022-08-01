const express = require('express');
const path = require('path');
const fs = require('fs');

const uuid = require('uuid')
const {v4:uuidv4} = uuid;



const PORT = process.env.PORT || 3001;

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

  const {title, text, Id} = req.body;

  const newNote = {
    title,
    text,
    Id: uuidv4(),
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

app.delete('/api/notes/:id', (req,res) => {
  fs.readFile('db/db.json', (err,data) => {
    console.error(err);



  })

})






app.get('*', (req,res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);



