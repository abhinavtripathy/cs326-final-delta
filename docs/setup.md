## Setting up Healthpool Project


### Setting up local dependencies

1. Open your terminal and type the following commands to clone the repo and install dependencies.
```
git clone https://github.com/abhinavtripathy/cs326-final-delta.git
```

2. 
```
cd cs326-final-delta
npm i
```
### Setting up the local Postgres database

1. Install Postgres from the official [website](https://www.postgresql.org/download/).

2. Open your terminal and type the following commands.

```
psql postgres postgres 
```

Copy paste these create table statements into the terminal to create the tables. 

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
    foreign key (driver_id) REFERENCES driver(id)
);
```


### Running the local server 

1. Use the following command to run the server.
```
cd cs326-final-delta

npm start
```

2. Open your browser and access the website on [http://localhost:8080/](http://localhost:8080/)
