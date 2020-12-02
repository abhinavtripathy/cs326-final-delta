# Team Delta

## HealthPool

### Semester - Fall 2020

### Overview of the Application

Our idea is an app that helps coordinate carpools for people who've just had surgery and therefore cannot drive. This would help people who don't have friends/family in the area or couldn't afford an Uber. There could be entries for different hospitals, and profiles for both volunteer drivers (who must be verified by the hospital in the app) and the people who need rides.

A user can sign up as a Patient or a Driver. If a user signs up as a patient, they naviagte to `Patient Sign Up`, where they enter their details like Name, phone number, email, emergency number, address, password and pick up location. They will get naviagted to their profile page where they can view all their details. If a user signs up as a driver, they navigate to `Driver Sign Up`, where they enter all their user information like Name, phone number, email, and password; they also enter their vehicle information. Once they sign up, they will be navigated to their profile page from where they can view all their inforamtion.

A driver can navigate to `Active Patients` which will show them all the patients that have signed up for the application. From there, they can select a patient who they want to pick up. Once they click `Select Patient`, they can view all the relevant information of the patient they are picking up, in their `View Profile` page.

Similarly, once a driver selects a patient, the patient can go to their `View Profile` page and see the vehicle and user information of the driver.

### Team Members

* Abhinav Tripathy - abhinavtripathy
* Aditya Narayanan - AdiNar1106
* Joseph Black - jbinvnt

### User Interface

#### Home Page

This page is served to users as `index.html` and serves as the page to allow users to naviagte to sign up or login pages.  
![Home Page]()

#### Login Page

This page is served to users as `login.html` and allows users to login to their profile after signing up.  
![Login Page]()

#### Patient Profile Page

This page is served to users as `patientProfile.html` and serves as the page for users to create their patient profile adding data such as name, phone number, emergency number, address, age, etc. When patients want to opt into this program, they would go to this page to register. Their details and credentials will get registered in our `patient` database.  
![Patient Profile]()

#### Patient Display Page

This page is served to users as `patientSelectionPage.html` and serves as the page for drivers to select patients who they volunteer to pick up. When drivers select patients, it will register the driver as a volunteer driver. This page can only be accessed by Drivers. Once they select a patient, their ID gets registered into the patientDB. One driver can pick up multiple patients.  
![Active Patient Profiles]()

#### Driver Profile Page

This page is served to users as `driverProfile.html` and serves as the page for users to create their volunteer driver profile adding data such as name, phone number, car model, car license plate number, car type, etc. When drivers want to volunteer for this program, they would go to this page to register. Their details and credentials get stores in our `driver` database.
![Driver Profile](wireframes/driverProfile.png?raw=true)

#### Edit Patient Profile Page

This page is served to users as `editPatientProfile.html` and serves as the page for patients to edit their profile. Changes after edit reflect in the database.  
![Edit Patient Profile]()

#### Edit Driver Profile Page

This page is served to users as `editDriverProfile.html` and serves as the page for drivers to edit their profiles. Changes after edit reflect in the database.  
![Edit Driver Profile]()

#### View Profile

This page is served to users as `profileView.html` and serves as the page for the current user on the platform to view their profile. If the current user is a driver, they can see all their profile information from when they signed up. If a driver selects a patient, they can see the details for the patient who they have to pick up which includes name and pickup address. If the current user is a patient, they can view their inforamtion from when they signed up, and can view the name car license plate of the driver picking them up.  
![View Profile]()

#### Hospital Admin Page

This page would be served to users as "hospitalAdmin.html" and would serve as the page for hospitals to manage their driver-patient volunteer program adding data such as hospital name, verified drivers, number of rides completed at the hospital, etc. Hospitals can even update their data from this page.  
![Hospital Admin Profile]()

### APIs

### Database

The final database schema looks like the following.

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
    pickup_time varchar(50),
    foreign key (driver_id) references driver(id) on delete set null
);

create table hospital (
    id serial primary key,
    name varchar(255),
    driver_id int,
    foreign key (driver_id) references driver(id) on delete set null
);
```

Each table has a pimary key field as id which is automatically created by postgres and is incremented serially to ensure unique ids for every record. Patients and Drivers both have informations about their name, age phone, email. The driver table specifically has information about the type of car they have, the plate number, the color and other details. There is a boolean to determine whether they are verified or not. The patient table has a home address, an emergency phone number, a pickup location and a pickup time along with a current status which determines whether a driver has been assigned to them or not. The hospital table has a name.

The patient and hospital tables have a foreign key (driver_id column) that refer to the driver. There is also constraint which sets them to null in the case that the driver is deleted.

### URL Routes/Mappings

### Authentication/Authorization
Passport reads salts and hashes from the Postgres database and creates a login session for the user if it matches the sent password. Additionally, functions search through the database to see if the user's current session matches an email which is either in the driver or patient table. This determines the user's access permissions, and these functions are used in middleware for each route to ensure that only the correct type of user has access.

The hospital admin page which controls the name of the hospital and verified drivers is not publicly visible on the website. It exists as a separate hidden/unlinked page. *Note: in a true production-ready implementation of HealthPool, security through obscurity is not an acceptable way to protect the Hospital admin interface. Our existing authentication system, however, relies on the existence of exactly two user groups so implementing a Hospital user type is not feasible in this timeframe.*

### Division of Labor

1. Abhinav Tripathy:

Designed a wireframe for the driver profile page. Implemented and styled the driver profile design using grid elements and other Bootstrap components. Initialized the GitHub repository. Created all the endpoints in `server.js` for Create, Read, Update and Delete for Patients, Drivers and Hospitals utilizing the API spec. Used faker to generate fake data for the endpoints. Connected the repo to heroku auto deploy pipeline for deployment. Wrote all the API endpoints for handling data from the server and database for all the CRUD operations. Wrote all the queries for all the endpoints. Designed all the 3 SQL table schemas to allow for a relational database. Managed deployment issues with heroku specifically with the database. Helped debug client side errors in JavaScript specifically related to sending requests to the endpoints from the driverProfile and active patient pages. Added instructions on setup.md to setup a local instance of the repo. Did a final code cleanup for the entire repo that included adding final endpoints to the server, simplifying some database queries (specifically using inner joins), resolving linter issues such as use of const, try/catch block and beatified all the code files in the repo.

2. Aditya Narayanan:

3. Joseph Black:

Created the Bootstrap page template with viewport, stylesheet, and container. Customized the Bootstrap theme using Sass. Designed the Hospital Admin Page wireframe and created the layout using Bootstrap grid elements. Set up the agile board and pull request workflow. Performed HTML validation.
Wrote the API specification and documentation including endpoints, HTTP methods, and JSON request/response structure to follow the RESTful style. Implemented front end logic for the driver profile and added additional fields to the signup form for car manufacturer and color. Updated CSS to support dynamic content in the *Active Patients* page. Created a homepage. Investigated automated testing for the backend. Performed linter fixes on both the server and frontend JavaScript. Added screenshots of the form pages.
Wrote MiniCrypt logic so that hashed passwords and salts are saved to the database instead of plaintext passwords. Created frontend logic to allow users' passwords to get sent to the appropriate POST endpoints, and display a response depending on whether the signup was successful. Created a login HTML form so that users or drivers can log in in the same place, and wrote SQL queries so that the server will match the email to the correct role. Added code so that the server will create the tables automatically if they do not exist.
Researched the appropriate Bootstrap classes to use for styling. Created notification pages for when users have insufficient permissions.
Documented the server routes and API spec. Configured frontend to follow redirects from the API through a special wrapper function. Protected endpoints that require authentication such as the view profile page. Edited and published the demo video.

### Conclusion
