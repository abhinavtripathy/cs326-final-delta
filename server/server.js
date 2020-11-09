import express from 'express';
import faker from 'faker';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public/'));
app.use(express.json());

const database = {};
database['patients'] = [];
database['drivers'] = [];
database['hospitals'] = [];



// Print Database  
app.get('/database', (req, res) => {
    database['patients'].push(req.body);
    res.send(database);
});


// POST Patients 
app.post('/patients', (req, res) => {
    database['patients'].push(req.body);
    res.send({
        'message': 'success'
    });
});

// GET Patients 
app.get('/patients', (req, res) => {
    res.send(database['patients']);
});

// GET Patients 
app.get('/patients/:id', (req, res) => {
    
    if (database['patients'].find(item => {
            return item.id === parseInt(req.params.id);
        })) {
        res.send(database['patients'].find(item => {
            
            return item.id === parseInt(req.params.id);
        }));
    } else {
        res.send({
            'message': 'Not Found'
        });
    }
});

// PUT Patients 
app.put('/patients/:id', (req, res) => {
    if (database['patients'].find(item => {
            return item.id === parseInt(req.params.id);
        })) {
        for (let i = 0; i < database['patients'].length; i++) {
            if (database['patients'][i].id === parseInt(req.params.id)) {
                console.log("found a patient");
                database['patients'][i] = req.body;
            }

        }
        res.send({
            'Message': 'Success'
        });
    } else {
        res.send({
            'message': 'error'
        });
    }
});

// DELETE Patients 
app.delete('/patients/:id', (req, res) => {
    if (database['patients'].find(item => {
            return item.id === parseInt(req.params.id);
        })) {
        for (let i = 0; i < database['patients'].length; i++) {
            if (database['patients'][i].id === parseInt(req.params.id)) {
                delete database['patients'][i];
            }

        }
        res.send({
            'Message': 'Success'
        });
    } else {
        res.send({
            'message': 'error'
        });
    }
});



// POST Drivers
app.post('/drivers', (req, res) => {
    database['drivers'].push(req.body);
    res.send({
        'message': 'success'
    });
});

// GET Patients 
app.get('/drivers/:id', (req, res) => {
    if (database['drivers'].find(item => {
            return item.id === parseInt(req.params.id);
        })) {
        res.send(database['drivers'].find(item => {
            return item.id === parseInt(req.params.id);
        }));
    } else {
        res.send({
            'message': 'Not Found'
        });
    }
});

// PUT Patients 
app.put('/drivers/:id', (req, res) => {
    if (database['drivers'].find(item => {
            return item.id === parseInt(req.params.id);
        })) {
        for (let i = 0; i < database['drivers'].length; i++) {
            if (database['drivers'][i].id === parseInt(req.params.id)) {
                database['drivers'][i] = req.body;
            }

        }
        res.send({
            'Message': 'Success'
        });
    } else {
        res.send({
            'message': 'error'
        });
    }
});

// DELETE Patients 
app.delete('/drivers/:id', (req, res) => {
    if (database['drivers'].find(item => {
            return item.id === parseInt(req.params.id);
        })) {
        for (let i = 0; i < database['drivers'].length; i++) {
            if (database['drivers'][i].id === parseInt(req.params.id)) {
                delete database['drivers'][i];
            }

        }
        res.send({
            'Message': 'Success'
        });
    } else {
        res.send({
            'message': 'error'
        });
    }
});



// PUT Patients 
app.put('/hospitals/:id', (req, res) => {
    if (database['hospitals'].find(item => {
            return item.id === parseInt(req.params.id);
        })) {
        for (let i = 0; i < database['hospitals'].length; i++) {
            if (database['hospitals'][i].id === parseInt(req.params.id)) {
                database['hospitals'][i] = req.body;
            }

        }
        res.send({
            'Message': 'Success'
        });
    } else {
        res.send({
            'message': 'error'
        });
    }
});




function generateFakeData() {

    for (let i = 0; i < 10; i++) {

        const patientjson = {
            id: Math.floor(Math.random() * (1000000000000000000000) + 1),
            name: {
                first: faker.name.firstName(),
                last: faker.name.lastName(),
            },
            age: Math.floor(Math.random() * (99) + 1),
            phone: faker.phone.phoneNumber('#########'),
            emergency: faker.phone.phoneNumber('#########'),
            email: faker.internet.email(),
            address: faker.address.streetAddress(),
            pickup: 'Door C',
            driver: Math.floor(Math.random() * (1000000000000000000000) + 1),
            status: 'waiting'
        };

        database['patients'].push(patientjson);

        const driverjson = {
            id: Math.floor(Math.random() * (1000000000000000000000) + 1),
            name: {
                first: faker.name.firstName(),
                last: faker.name.lastName(),
            },
            age: Math.floor(Math.random() * (99) + 1),
            phone: faker.phone.phoneNumber('#########'),
            email: faker.internet.email(),
            car: {
                make: faker.vehicle.manufacturer(),
                model: faker.vehicle.model(),
                color: faker.vehicle.color(),
                plate: faker.vehicle.vin()
            },
            patients: [Math.floor(Math.random() * (1000000000000000000000) + 1), Math.floor(Math.random() * (1000000000000000000000) + 1)],
            verified: Math.random() >= 0.5
        };

        database['drivers'].push(driverjson);

        const hospitaljson = {
            id: Math.floor(Math.random() * (1000000000000000000000) + 1),
            name: faker.address.city() + ' Medical Center'

        };

        database['hospitals'].push(hospitaljson);

    }

    console.log(database);

}

generateFakeData();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});