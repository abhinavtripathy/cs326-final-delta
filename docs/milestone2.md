# Milestone 2
## Deployment Link
Our app is deployed [here](http://healthpool.herokuapp.com)
## API Planning

**Application Structure**

*   Patients - First name, last name, age, phone, emergency contact, email address, address, pick up location, password
  * `patientProfile.js`: This file sends a POST request to the server of the user data collected in the sign up form.
  * `patientSelection.js`: This file renders the bootstrap cards of active patients. This is a result of a GET request.
  * `patientProfile.html`: A HTML file that has the sign up information for patients
  * `patientSelelctionPage.html`: HTML page which contains the active patients.

*   Driver - First name, last name, age, phone, email address, car type, car model, license plate number, password
  * `driverProfile.html`: A HTML file that has the sign up information for drivers.

*   Hospital - Hospital Name, Verified drivers
  * `hospitalAdmin.html`: An admin page for hosptials.

For our API, we will need CRUD operations for each of these 3 objects. Some example endpoints might look like:



*   `/patients`
    *   `POST` *creates* a new patient profile
        *   Example data sent:

```
{
  name: {
    first: "Juan",
    last: "Tanamera"
  },
  age: 29,
  phone: 1234567890,
  emergency: 1234098765,
  email: "juan@example.com",
  address: "1600 Pennsylvania Avenue",
  pickup: "Door C",
  driver: 93205912492513350566463886604965037953,
  status: "waiting"
}
```

*   Example data received:

```
{
  id: 166426039573329213731786786340393070639
}
```

*   `GET `lists an array of all patients
    *   `/patients/{id}`
        *   `PUT` updates the profile of patient with id `{id}`
            *   Example data: [same as POST]
        *   `GET` views the information of patient with id `{id}`
        *   `DELETE` removes the profile of patient with id `{id}`
*   `/drivers`
    *   `POST` *creates* a new driver profile
        *   Example data sent:

```
{
  name: {
    first: "Joseph",
    last: "Black"
  },
  age: 19,
  phone: 19876543210,
  email: "joseph@example.com",
  car: {
    make: "Ferrari",
    model: "F8 Spider",
    color: "Blue",
    plate: "31337ST"
  },
  patients: [166426039573329213731786786340393070639],
  verified: true
}
```

*   Example data received:

```
{
  id: 93205912492513350566463886604965037953
}
```

*   `GET `lists an array of all drivers
    *   `/drivers/{id}`
        *   `PUT` updates the profile of driver with id `{id}`
            *   Example data: [same as POST]
        *   `GET` views the information of driver with id `{id}`
        *   `DELETE` removes the profile of driver with id `{id}`
*   `/hospital`
    *   `PUT` *updates* the hospital information
        *   Example data sent:

```
{
  name: "Los Santos Medical Center",
}
```


## Screenshots of CRUD operations

All operations have been done for the page that allows drivers to select patients.
### Create/Read

This page is the first page where we created a user called Euna Luettgen (fake name). The details like Address, phone number, emergency number and pick up location are randomly generated.

![Create Users](images/create_user.png?raw=true)

### Update/Read

This page is the page where we updated our user Euna Luettgen's phone number and address. We used /patients/:id PUT endpoint to update user information.

![Update Users](images/update_users.png?raw=true)

### Delete/Read

This page is the page where we deleted our user Euna Luettgen's user from active patients. We used the /patients:id DELETE endpoint to delete this user.

![Delete Users](images/delete_users.png?raw=true)

### Create a driver profile

This form page uses `POST` to the `drivers/` endpoint.

![Post Driver](images/driverProfile.png?raw=true)

### Create a patient profile

This form page uses `POST` to the `patients/` endpoint.

![Post Driver](images/patientProfile.png?raw=true)


## Contributions

1. Abhinav Tripathy: Created all the endpoints in `server.js` for Create, Read, Update and Delete for Patients, Drivers and Hospitals utilizing the API spec. Used faker to generate fake data for the endpoints. Connected the repo to heroku auto deploy pipeline for deployment.

2. Aditya Narayanan: Built out the front end for patientSelectionPage.html using `patientSelelction.js`; this file displays all active patients. Utilized Javascript to populate bootstrap cards with user information from the server. Also wrote the code to POST data from the patient sign up form to the server in `patientprofile.js`. Designed the navigation bar for the application. Added the screenshots to the milestone2 document.

3. Joseph Black: Wrote the API specification and documentation including endpoints, HTTP methods, and JSON request/response structure to follow the RESTful style. Implemented front end logic for the driver profile and added additional fields to the signup form for car manufacturer and color. Updated CSS to support dynamic content in the *Active Patients* page. Created a homepage. Investigated automated testing for the backend. Performed linter fixes on both the server and frontend JavaScript. Added screenshots of the form pages.
