const express = require('express')
const app = express()
const port = 8080

app.use(express.static('public/'));
app.use(express.json());

// POST Patients 
app.post('/patients', (req, res) => {
    console.log(req.body);
    res.send("done");
});

// GET Patients 
app.get('/patients/:id', (req, res) => {
    console.log(req.params.id);
    res.send("done");
});

// PUT Patients 
app.put('/patients/:id', (req, res) => {
    console.log(req.params.id);
    res.send("done");
});

// DELETE Patients 
app.delete('/patients/:id', (req, res) => {
    console.log(req.params.id);
    res.send("done");
});



// POST Drivers
app.post('/drivers', (req, res) => {
    console.log(req.body);
    res.send("done");
});

// GET Patients 
app.get('/drivers/:id', (req, res) => {
    console.log(req.params.id);
    res.send("done");
});

// PUT Patients 
app.put('/drivers/:id', (req, res) => {
    console.log(req.params.id);
    res.send("done");
});

// DELETE Patients 
app.delete('/drivers/:id', (req, res) => {
    console.log(req.params.id);
    res.send("done");
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});