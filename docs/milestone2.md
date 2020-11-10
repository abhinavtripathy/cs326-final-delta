## API Planning



## Screenshots of CRUD operations

#### Create/Read

This page is the first page where we created a user called Euna Luettgen (fake name). The details like Address, phone number, emergency number and pick up location are randomly generated. 

![Create Users](images/create_user.png?raw=true)

#### Update/Read

This page is the page where we updated our user Euna Luettgen's phone number and address. We used /patients/:id PUT endpoint to update user information.

![Update Users](images/update_users.png?raw=true)

#### Delete/Read

This page is the page where we deleted our user Euna Luettgen's user from active patients. We used the /patients:id DELETE endpoint to delete this user.

![Delete Users](images/delete_users.png?raw=true)


## Contributions

1. Abhinav Tripathy: Created all the endpoints in `server.js` for Create, Read, Update and Delete for Patients, Drivers and Hospitals utilizing the API spec. Used faker to generate fake data for the endpoints. Connected the repo to heroku auto deploy pipeline for deployment. 

2. Aditya Narayanan: Built out the front end for patientSelectionPage.html using `patientSelelction.js`; this file displays all active patients. Utilized Javascript to populate bootstrap cards with user information from the server. Also wrote the code to POST data from the patient sign up form to the server in `patientprofile.js`. Designed the navigation bar for the application. Added the screenshots to the milestone2 document. 

3. Joseph Black