import express from 'express';
import pgPromise from 'pg-promise';
import expressSession from 'express-session';
import passp from 'passport';
import passportLocal from 'passport-local';
import mc from './miniCrypt.js';
const miniCrypt = new mc();
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
const username = 'postgres';
const password = 'postgres';

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

// Table initialization

(async () => {
    await connectAndRun(db => db.none('create table if not exists driver (id serial primary key,password varchar (255),first_name varchar(255),last_name varchar (255),age integer,phone varchar (20),email varchar (255),car_make varchar (255),car_type varchar(255),car_model varchar (255),car_color varchar (255),car_plate varchar (255),verified boolean);'));

    await connectAndRun(db => db.none('create table if not exists patient (id serial primary key,password varchar (255),first_name varchar(255),last_name varchar (255),age integer,phone varchar (20),email varchar (255),emergency_phone varchar (20),home_address varchar (255),pickup varchar (255),driver_id integer,current_status varchar (30), pickup_time varchar (50) foreign key (driver_id) references driver(id) on delete set null);'));

    await connectAndRun(db => db.none('create table if not exists hospital (id serial primary key,name varchar(255),driver_id int,foreign key (driver_id) references driver(id) on delete set null);'));
})();

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

const getSaltHashOf = async (email, isPatient) => {
    try {
        const passwordString = await connectAndRun(db => db.one('SELECT password FROM $1:alias WHERE email = $2', [isPatient ? 'patient' : 'driver', email]));
        return passwordString.password.split(','); // returns an array with element 0 as the the salt and element 1 as the hash
    } catch(e) {
        return undefined;
    }
};

const strategy = new LocalStrat({usernameField: 'email', passwordField: 'password'},
    async (email, pass, done) => {
        if (await getSaltHashOf(email, true) === undefined && await getSaltHashOf(email, false) === undefined) {
	    return done(null, false, { 'message' : 'No user with that email exists' });
        }
        if (!(await checkPass(email, pass))) {
	    await new Promise((r) => setTimeout(r, 2000)); // This does not stop parallel requests from being sent. A more secure method might be an account-wide retry counter but this implementation was not covered in the scope of the class
	    return done(null, false, { 'message' : 'Incorrect password' });
        }
        return done(null, email);
    });

const mustBeAuthenticated = async(req, res, next) => req.isAuthenticated() ? next() : res.redirect('/login.html');

const mustBeDriver = [mustBeAuthenticated, async (req, res, next) => !(await userInfo(req.user)).isPatient ? next() : res.redirect('/mustBeDriver.html')];

const mustBePatient = [mustBeAuthenticated, async (req, res, next) => await userInfo(req.user).isPatient ? next() : res.redirect('/mustBePatient.html')];

const userExists = async email => await getSaltHashOf(email, false) !== undefined || await getSaltHashOf(email, true) !== undefined;


const userInfo = async email => {
    if(!(await userExists(email))) {
        return undefined;
    }
    const isPatient = await getSaltHashOf(email, true) !== undefined;
    const saltHash = await getSaltHashOf(email, isPatient);
    return {
        salt: saltHash[0],
        hash: saltHash[1],
        isPatient: isPatient
    };
};

const checkPass = async (email, pass) => {
    const credInfo = await userInfo(email);
    if(credInfo === undefined) {
        return false;
    }
    return miniCrypt.check(pass, credInfo.salt, credInfo.hash);
};

passp.serializeUser((usr, done) => {
    done(null, usr);
});

passp.deserializeUser((usr, done) => {
    done(null, usr);
});

app.use(expressSession(session));
passp.use(strategy);
app.use(passp.initialize());
app.use(passp.session());
app.use(express.urlencoded({'extended' : true}));

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login.html');
});

app.post('/login', passp.authenticate('local', { 'successRedirect': '/profileView.html', 'failureRedirect': '/login.html' }));

// API Endpoints

// Get Current User
app.get('/currentUser', mustBeAuthenticated, async (req, res) => {
    let patientBool;
    try {
        await connectAndRun(db => db.one('SELECT id FROM $1:alias WHERE email = $2', ['patient', req.user]));
        patientBool = true;
    }
    catch(err) {
    }
    try {
        await connectAndRun(db => db.one('SELECT id FROM $1:alias WHERE email = $2', ['driver', req.user]));
        patientBool = false;
    }
    catch(err) {
    }
    const id = await connectAndRun(db => db.one('SELECT id FROM $1:alias WHERE email = $2', [patientBool ? 'patient' : 'driver', req.user]));
    res.send(JSON.stringify([{
        'isPatient': patientBool,
        'id': id
    }]));
});


// POST Patients
app.post('/patients', async (req, res) => {
    const data = req.body;
    console.log(data);
    await connectAndRun(db => db.none('INSERT INTO patient(first_name, last_name, phone, email, age, emergency_phone, home_address, pickup, password, current_status, pickup_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);', [data.first_name, data.last_name, data.phone, data.email, data.age, data.emergency_phone, data.home_address, data.pickup, miniCrypt.hash(data.password).join(','), data.current_status, data.pickup_time]));
    res.send({
        'message': 'success'
    });
});

// GET All Patients
app.get('/patients', mustBeDriver, async (req, res) => {
    const patients = await connectAndRun(db => db.any('SELECT * FROM patient;'));
    res.send(JSON.stringify(patients));
});

// GET Patients
app.get('/patients/:id', async (req, res) => {
    const patients = await connectAndRun(db => db.any('SELECT * FROM patient where id = $1;', [parseInt(req.params.id)]));
    res.send(JSON.stringify(patients));
});

// PUT Patients
app.put('/patients/:id', async (req, res) => {
    const data = req.body;
    await connectAndRun(db => db.none('update patient set first_name = $1, last_name = $2, phone = $3, email = $4, age = $5, emergency_phone = $6, home_address = $7, pickup = $8, password = $9, driver_id = $10, current_status = $11, pickup_time = $12 where id = $13', [data.first_name, data.last_name, data.phone, data.email, data.age, data.emergency_phone, data.home_address, data.pickup, miniCrypt.hash(data.password).join(','), data.driver_id, data.current_status, data.pickup_time, parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});

// PUT Patients - update status
app.put('/patients/status/:id', async (req, res) => {
    const data = req.body;
    await connectAndRun(db => db.none('update patient set driver_id = $1, current_status = $2 where id = $3', [data.driver_id, data.current_status, parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});

// DELETE Patients
app.delete('/patients/:id', async (req, res) => {
    await connectAndRun(db => db.none('delete from patient where id = $1', [parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});

// GET driver Info for the current patient
app.get('/patients/driver/:id', async (req, res) => {
    try {
        const driver = await connectAndRun(db => db.one('SELECT d.first_name, d.last_name, d.car_color, d.car_plate FROM patient p, driver d where p.driver_id = d.id and p.id = $1;', [parseInt(req.params.id)]));
        res.send(JSON.stringify(driver));
    }
    catch(err) {
        console.log('none found in DB');
        res.send(JSON.stringify('None'))
    }
   
});



// POST Drivers
app.post('/drivers', async (req, res) => {
    const data = req.body;
    console.log(data);
    await connectAndRun(db => db.none('INSERT INTO driver(first_name, last_name, phone, email, age, car_make, car_model, car_color, car_plate, password, car_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);', [data.first_name, data.last_name, data.phone, data.email, data.age, data.car_make, data.car_model, data.car_color, data.car_plate, miniCrypt.hash(data.password).join(','), data.car_type]));
    res.send({
        'message': 'success'
    });
});

// GET Drivers
app.get('/drivers/:id', async (req, res) => {
    const drivers = await connectAndRun(db => db.any('SELECT * FROM driver where id = $1;', [parseInt(req.params.id)]));
    res.send(JSON.stringify(drivers));
});

// Get All Drivers
app.get('/drivers', async (req, res) => {
    const drivers = await connectAndRun(db => db.any('SELECT * FROM driver;'));
    res.send(JSON.stringify(drivers));
});

// PUT Drivers
app.put('/drivers/:id', async (req, res) => {
    const data = req.body;
    await connectAndRun(db => db.none('update driver set first_name = $1, last_name = $2, phone = $3, email = $4, age = $5, car_make = $6, car_model = $7, car_color = $8, car_plate = $9, password = $10, car_type = $11 where id = $12', [data.first_name, data.last_name, data.phone, data.email, data.age, data.car_make, data.car_model, data.car_color, data.car_plate, miniCrypt.hash(data.password).join(','), data.car_type, parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});


// PUT Driver for Verification
app.put('/drivers/verify/:id', async (req, res) => {
    const data = req.body;
    await connectAndRun(db => db.none('update driver set verified = $1 where id = $2', [data.verified, parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});

// DELETE Drivers
app.delete('/drivers/:id', mustBeDriver, async (req, res) => {
    await connectAndRun(db => db.none('delete from driver where id = $1', [parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});

// GET Patient Info for the current driver
app.get('/drivers/pickup/:id', async (req, res) => {
    try {
        const patients = await connectAndRun(db => db.any('SELECT first_name, last_name, pickup  FROM patient where driver_id = $1;', [parseInt(req.params.id)]));
        res.send(JSON.stringify(patients));
    }
    catch(err) {
        console.log('none found in DB');
        res.send(JSON.stringify('None'));
    }

    
});

// PUT Hospitals
app.put('/hospitals/:id', async (req, res) => {
    const data = req.body;
    await connectAndRun(db => db.none('update hospital set name = $1 where id = $2', [data.name, parseInt(req.params.id)]));
    res.send({
        'message': 'success'
    });
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
