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

### URL Routes/Mappings

### Authentication/Authorization

*Note: in a true production-ready implementation of HealthPool, security through obscurity is not an acceptable way to protect the Hospital admin interface. Our existing authentication system, however, relies on the existence of exactly two user groups so implementing a Hospital user type is not feasible in this timeframe.*

### Division of Labor

1. Abhinav Tripathy:

2. Aditya Narayanan:

3. Joseph Black

### Conclusion
