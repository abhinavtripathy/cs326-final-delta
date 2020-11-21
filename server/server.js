import express from 'express';
import pgPromise from 'pg-promise';
import expressSession from 'express-session';
import passp from 'passport';
import passportLocal from 'passport-local';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public/'));
app.use(express.json());

// Postgres Setup
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

// Passport Setup
const LocalStrat = passportLocal.Strategy;
const session = (() => {
  if(!process.env.SECRET) {
    throw 'The SECRET environment variable is not set in Heroku';
  }
  return {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  };
})();

const emailExists = (async (email, isPatient) => {
  const userWithEmail = await connectAndRun(db => db.any('SELECT COUNT(*) FROM $1 WHERE email = $2', [isPatient ? 'Patient' : 'driver', email]));
})();

const addUser = (email, pass, isPatient) => {
  const data = req.body;
  await connectAndRun(db => db.none('INSERT INTO $1 VALUES('
};

const strategy = new LocalStrat({usernameField: "email", passwordField: "password"},
    async (email, pass, done) => {
    if (!(emailExists(email, true) || emailExists(email, false))) {
	    return done(null, false, { 'message' : 'No user with that email exists' });
    }
	if (!checkPass(email, pass)) {
	    await new Promise((r) => setTimeout(r, 2000)); // This does not stop parallel requests from being sent. A more secure method might be an account-wide retry counter but this implementation was not covered in the scope of the class
	    return done(null, false, { 'message' : 'Incorrect password' });
	}
	return done(null, username);
    });
    
const checkAuthentication = (req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login');

passp.serializeUser((usr, done) => {
  done(null, usr);
});

passp.deserializeUser((usr, done) => {
  done(null, usr);
});

const getDriverValues = data => [data.first_name, data.last_name, data.phone, data.email, data.age, data.car_make, data.car_model, data.car_color, data.car_plate, data.password, data.car_type];
    
app.use(expressSession(session));
passp.use(strategy);
app.use(passp.initialize());
app.use(passp.session());

// API Endpoints

// POST Patients 
app.post('/patients', async (req, res) => {
    const data = req.body;
    console.log(data);
    await connectAndRun(db => db.none("INSERT INTO patient(first_name, last_name, phone, email, age, emergency_phone, home_address, pickup, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);", [data.first_name, data.last_name, data.phone, data.email, data.age, data.emergency_phone, data.home_address, data.pickup, data.password]));
    res.send({
        'message': 'success'
    });
});

// GET All Patients 
app.get('/patients', async (req, res) => {
    const patients = await connectAndRun(db => db.any("SELECT * FROM patient;"));
    res.send(JSON.stringify(patients));
});

// GET Patients 
app.get('/patients/:id', async (req, res) => {
    const patients = await connectAndRun(db => db.any("SELECT * FROM patient where id = $1;", [parseInt(req.params.id)]));
    res.send(JSON.stringify(patients));
});

// PUT Patients 
app.put('/patients/:id', async (req, res) => {
    const data = req.body;
    await connectAndRun(db => db.none("update patient set first_name = $1, last_name = $2, phone = $3, email = $4, age = $5, emergency_phone = $6, home_address = $7, pickup = $8, password = $9 where id = $10", [data.first_name, data.last_name, data.phone, data.email, data.age, data.emergency_phone, data.home_address, data.pickup, data.password, parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});

// DELETE Patients 
app.delete('/patients/:id', async (req, res) => {
    await connectAndRun(db => db.none("delete from patient where id = $1", [parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});



// POST Drivers
app.post('/drivers', async (req, res) => {
    const data = req.body;
    console.log(data);
    await connectAndRun(db => db.none("INSERT INTO driver(first_name, last_name, phone, email, age, car_make, car_model, car_color, car_plate, password, car_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);", getDriverValues(req.body)));
    res.send({
        'message': 'success'
    });
});

// GET Drivers
app.get('/drivers/:id', async (req, res) => {
    const drivers = await connectAndRun(db => db.any("SELECT * FROM driver where id = $1;", [parseInt(req.params.id)]));
    res.send(JSON.stringify(drivers));
});

// Get All Drivers
app.get('/drivers', async (req, res) => {
    const drivers = await connectAndRun(db => db.any("SELECT * FROM driver;"));
    res.send(JSON.stringify(drivers));
});

// PUT Drivers
app.put('/drivers/:id', async (req, res) => {
    const data = req.body;
    await connectAndRun(db => db.none("update driver set first_name = $1, last_name = $2, phone = $3, email = $4, age = $5, car_make = $6, car_model = $7, car_color = $8, car_plate = $9, password = $10, car_type = $11 where id = $12", [data.first_name, data.last_name, data.phone, data.email, data.age, data.car_make, data.car_model, data.car_color, data.car_plate, data.password, data.car_type, parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});


// PUT Driver for Verification 
app.put('/drivers/verify/:id', async (req, res) => {
    const data = req.body;
    await connectAndRun(db => db.none("update driver set verified = $1 where id = $2", [data.verified, parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});

// DELETE Drivers
app.delete('/drivers/:id', async (req, res) => {
    await connectAndRun(db => db.none("delete from driver where id = $1", [parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});



// PUT Hospitals
app.put('/hospitals/:id', async (req, res) => {
    const data = req.body;
    await connectAndRun(db => db.none("update hospital set name = $1 where id = $2", [data.name, parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});