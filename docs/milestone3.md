# Milestone 3

## Database Implementation 

Healthpool uses a PostgreSQL database hosted on Heroku.
We have three tables defined in our database:

1. ***Driver***: This table contains information about the user who creates a profile to volunteer as a driver. It contains information like their name, age, contact number, email, details about their vehicle, and whether they have been verified by the hospital or not. 

2. ***Patient***: This table contains information about the patient. It contains information like their name, age, contact and emergency number, email, address, hospital pickup location, current status of whether they are ready to be picked up or not, and a foreign key which refers to the driver id. Once a driver selects a patient, their ID will be reflected against the patient's pickup detail. 

3. ***Hospital***: This table contains the name of the hosptial and the driver id. The driver id is a foreign key which helps a hospital admin verify a driver. 

#### Database Schema

```sql
create table driver (
    id serial primary key, 
    password varchar (255),
    first_name varchar(255), 
    last_name varchar (255),
    age integer, 
    phone varchar (20),
    email varchar (255), 
    car_make varchar (255),
    car_type varchar(255),
    car_model varchar (255),
    car_color varchar (255),
    car_plate varchar (255),
    verified boolean
);

create table patient (
    id serial primary key, 
    password varchar (255),
    first_name varchar(255), 
    last_name varchar (255),
    age integer, 
    phone varchar (20),
    email varchar (255), 
    emergency_phone varchar (20), 
    home_address varchar (255),
    pickup varchar (255),
    driver_id integer, 
    current_status varchar (30),
    foreign key (driver_id) references driver(id)
);

create table hospital (
    id serial primary key, 
    name varchar(255),
    driver_id int, 
    foreign key (driver_id) references driver(id)
);
```

*Note that the Node.js server will enforce that the same email cannot be used for both a driver and a patient.*

## Contributions:

1. Abhinav Tripathy: Wrote all the API endpoints for handling data from the server and database for all the CRUD operations. Wrote all the queries for all the endpoints. Designed all the 3 SQL table schemas to allow for a relational database. Managed deployment issues with heroku specifically with the database. Helped debug client side errors in JavaScript. Added instructions on setup.md to setup a local instance of the repo. 

2. Aditya Narayanan: Wrote and handled all the client side logic. The implementation first includes functionality for when a driver selects a patient. Second, when a user wants to view their profile, it will show differently according to their user role, that is driver or patient. Created profile view page using HTML, CSS, JS and Bootstrap. Wrote the logic for driver verification from the hospital Admin page. Customized navbar for each page to show important redirects from that particular page. Utilized endpoints from the server to achieve GET, POST, PUT and DELETE requests. Implemented a feature to show current status of a patient on their card which updates when a driver selects them. 

3. Joseph Black: Wrote MiniCrypt logic so that hashed passwords and salts are saved to the database instead of plaintext passwords, and applied it to the existing POST routes in the server. Created frontend logic to allow users' passwords to get sent to the appropriate POST endpoint from the existing driver and patient signup forms, and display a response depending on whether the signup was successful. Adapted passport to read salts/hashes from the Postgres database and create a login session for the user if it matches the sent password. Created a login HTML form so that users or drivers can log in in the same place, and wrote SQL queries so that the server will match the email to the correct role. Created functions that allow accessing certain endpoints only if the user is in the correct role (driver or patient). Removed outdated instructions for creating Postgres tables manually, and added code so that the server will create the tables automatically if they do not exist. Fixed bugs with asynchronous code on both the client and the server. Researched the appropriate Bootstrap classes to use for styling. Created notification pages for when users have insufficient permissions.