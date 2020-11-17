import express from 'express';
import pgPromise from 'pg-promise';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public/'));
app.use(express.json());


const pgp = pgPromise({
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },
    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }

});

// Local PostgreSQL credentials
const username = "postgres";
const password = "postgres";

const url = process.env.DATABASE_URL || `postgres://${username}:${password}@localhost/`;
const db = pgp(url);


async function connectAndRun(task) {
    let connection = null;

    try {
        connection = await db.connect();
        return await task(connection);
    } catch (e) {
        throw e;
    } finally {
        try {
            connection.done();
        } catch (ignored) {

        }
    }
}


// Print Database  
app.get('/database', async (req, res) => {
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
                database['patients'].splice(i, 1);
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
                database['drivers'].splice(i, 1);
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




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});