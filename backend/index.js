const express = require('express');     
const cors = require('cors');
const app = express();

app.use (cors());
app.use(express.json());

let notes = [];

app.get('/notes', (req, res) => res.json(notes));

app.post('/notes', (req, res) => {
    const note = {id: Date.now(), text: req.body.text }; 
    notes.push(note);
    res.json(note);

});


app.delete('/notes/:id', (req, res) => {
    notes= notes.filter(n =>n.id != req.params.id);
    res.sendStatus(204); 

}); 

app.listen(3001, () => console.log ('Backend running on http://localhost:3001')); 





