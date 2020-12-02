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
![Home Page](final_images/main.png?raw=true)

#### Login Page

This page is served to users as `login.html` and allows users to login to their profile after signing up.  
![Login Page](final_images/login.png?raw=true)

#### Patient Profile Page

This page is served to users as `patientProfile.html` and serves as the page for users to create their patient profile adding data such as name, phone number, emergency number, address, age, etc. When patients want to opt into this program, they would go to this page to register. Their details and credentials will get registered in our `patient` database.  
![Patient Profile](final_images/patient_signup.png?raw=true)

#### Patient Display Page

This page is served to users as `patientSelectionPage.html` and serves as the page for drivers to select patients who they volunteer to pick up. When drivers select patients, it will register the driver as a volunteer driver. This page can only be accessed by Drivers. Once they select a patient, their ID gets registered into the patientDB. One driver can pick up multiple patients.  
![Active Patient Profiles](final_images/active_patients.png?raw=true)

#### Driver Profile Page

This page is served to users as `driverProfile.html` and serves as the page for users to create their volunteer driver profile adding data such as name, phone number, car model, car license plate number, car type, etc. When drivers want to volunteer for this program, they would go to this page to register. Their details and credentials get stores in our `driver` database.
![Driver Profile](final_images/driver_signup.png?raw=true)

#### View Profile

This page is served to users as `profileView.html` and serves as the page for the current user on the platform to view their profile. If the current user is a driver, they can see all their profile information from when they signed up. If a driver selects a patient, they can see the details for the patient who they have to pick up which includes name and pickup address. If the current user is a patient, they can view their inforamtion from when they signed up, and can view the name car license plate of the driver picking them up.  
![View Patient](final_images/view_patient.png?raw=true)
![View Driver](final_images/driver_signup.png?raw=true)

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

*Note: in a true production-ready implementation of HealthPool, security through obscurity is not an acceptable way to protect the Hospital admin interface. Our existing authentication system, however, relies on the existence of exactly two user groups so implementing a Hospital user type is not feasible in this timeframe.*

### Division of Labor

1. Abhinav Tripathy:

Designed a wireframe for the driver profile page. Implemented and styled the driver profile design using grid elements and other Bootstrap components. Initialized the GitHub repository. Created all the endpoints in `server.js` for Create, Read, Update and Delete for Patients, Drivers and Hospitals utilizing the API spec. Used faker to generate fake data for the endpoints. Connected the repo to heroku auto deploy pipeline for deployment. Wrote all the API endpoints for handling data from the server and database for all the CRUD operations. Wrote all the queries for all the endpoints. Designed all the 3 SQL table schemas to allow for a relational database. Managed deployment issues with heroku specifically with the database. Helped debug client side errors in JavaScript specifically related to sending requests to the endpoints from the driverProfile and active patient pages. Added instructions on setup.md to setup a local instance of the repo. Did a final code cleanup for the entire repo that included adding final endpoints to the server, simplifying some database queries (specifically using inner joins), resolving linter issues such as use of const, try/catch block and beatified all the code files in the repo. 

2. Aditya Narayanan: Created wireframe for patient registration page and patient selelction page (where drivers select patients). Developed and designed the patient profile page using a two column grid and bootstrap, and developed the patient selection page with Bootstrap cards. Implemented the JavaScript code to add an image in the registration page, and added content to `milestone1.md`. Created a sample navigation bar for the HTML pages which can be viewed in branch HP-14 under `patientProfile.html`. Built out the front end for patientSelectionPage.html using `patientSelelction.js`; this file displays all active patients. Utilized Javascript to populate bootstrap cards with user information from the server. Also wrote the code to POST data from the patient sign up form to the server in `patientprofile.js`. Designed the navigation bar for the application. Added the screenshots to the milestone2 document. Wrote and handled all the client side logic. The implementation first includes functionality for when a driver selects a patient. Second, when a user wants to view their profile, it will show differently according to their user role, that is driver or patient. Created profile view page using HTML, CSS, JS and Bootstrap. Wrote the logic for driver verification from the hospital Admin page. Customized navbar for each page to show important redirects from that particular page. Utilized endpoints from the server to achieve GET, POST, PUT and DELETE requests. Implemented a feature to show current status of a patient on their card which updates when a driver selects them. For the final milestone, I debugged the client side of the platform and fixed all the bugs to make a fully working application. Also added client side content for the final document.

3. Joseph Black

### Conclusion
