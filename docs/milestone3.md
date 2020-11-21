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