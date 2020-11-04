const express = require('express')
const faker = require('faker');
const { fake } = require('faker');
const app = express()
const port = 8080

app.use(express.static('public/'));
app.use(express.json());

let database = {};
database['patients'] = [];
database['drivers'] = [];
database['hospitals'] = [];

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



// PUT Patients 
app.put('/hospitals/:id', (req, res) => {
    console.log(req.params.id);
    res.send("done");
});






function generateFakeData() {

    for (let i = 0; i < 10; i++) {

        let patientjson = {
            first_name: faker.name.firstName(),
            last: faker.name.lastName(),
            age: Math.floor(Math.random() * (99) + 1),
            phone: faker.phone.phoneNumber("#########"),
            emergency: faker.phone.phoneNumber("#########"),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            pickup: "Door C",
            driver: Math.floor(Math.random() * (1000000000000000000000) + 1),
            status: "waiting"
        }

        database['patients'].push(patientjson);

        let driverjson = {
            first_name: faker.name.firstName(),
            last: faker.name.lastName(),
            age: Math.floor(Math.random() * (99) + 1),
            phone: faker.phone.phoneNumber("#########"),
            email: faker.internet.email(),
            car: {
                make: faker.vehicle.manufacturer(),
                model: faker.vehicle.model(),
                color: faker.vehicle.color(),
                plate: faker.vehicle.vin()
            },
            patients: [Math.floor(Math.random() * (1000000000000000000000) + 1), Math.floor(Math.random() * (1000000000000000000000) + 1)],
            verified: Math.random() >= 0.5
        }

        database['drivers'].push(driverjson);
        
        let hospitaljson = {
            name: faker.address.city() + " Medical Center"

        }

        database['hospitals'].push(hospitaljson);

    }

    console.log(database);

}

generateFakeData();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});