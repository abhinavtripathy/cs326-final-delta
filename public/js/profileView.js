/*
 * If patient is viewing profile, then do a fetch with ID to the patient DB and generate html to add volunteer driver to the existing profile view
 * If driver is viewing profile, add details like car details to existing data.
 */

//const { response } = require("express");

// Function to create HTML elements for this page
function createHTMLElements(row_name, col_name, label_name, p_id, para) {
    const home = document.getElementById('home');
    const row = document.createElement('div');
    row.className = row_name;
    const col1 = document.createElement('div');
    col1.className = col_name;
    const label = document.createElement('label');
    label.innerHTML = label_name;
    const col2 = document.createElement('div');
    col2.className = col_name;
    const p = document.createElement('p');
    p.id = p_id;
    p.innerHTML = para;

    col1.appendChild(label);
    col2.appendChild(p);
    row.appendChild(col1);
    row.appendChild(col2);
    home.appendChild(row);
}

window.addEventListener('load', async () => {

    async function showPatientOrDriver() {
        const response = await fetch('/currentUser');
        if(response.ok) {
            const currUser = await response.json();
            currUser.forEach(async (user) => {
                if (user.isPatient === true) { // check this line, isParient not showing up
                    const response1 = await fetch(`/patients/${user.id.id}`);
                    // Converting received data to JSON 
                    if(response1.ok) {
                        const patients = await response1.json();
                        patients.forEach((patient) => {
                            document.getElementById('name').innerHTML = patient.first_name + ' ' + patient.last_name;
                            document.getElementById('user_id').innerHTML = patient.id;
                            document.getElementById('full_name').innerHTML = patient.first_name + ' ' + patient.last_name;
                            document.getElementById('age').innerHTML = patient.age;
                            document.getElementById('email_id').innerHTML = patient.email;
                            document.getElementById('phone_num').innerHTML = patient.phone;
                            document.getElementById('user_role').innerHTML = 'Patient';
                            document.getElementById('edit-profile').href = 'patientProfile.html';
                            createHTMLElements('row', 'col-md-6', 'Emergency Contact', 'emergency', patient.emergency_phone);
                            createHTMLElements('row', 'col-md-6', 'Home Address', 'address', patient.home_address);
                        });
                    }
                } // end of if user is patient
                else {
                    const response2 = await fetch(`/drivers/${user.id.id}`);
                    // Converting received data to JSON 
                    if(response2.ok) {
                        const drivers = await response2.json();
                        drivers.forEach(async (driver) => {
                            document.getElementById('name').innerHTML = driver.first_name + ' ' + driver.last_name;
                            document.getElementById('user_id').innerHTML = driver.id;
                            document.getElementById('full_name').innerHTML = driver.first_name + ' ' + driver.last_name;
                            document.getElementById('age').innerHTML = driver.age;
                            document.getElementById('email_id').innerHTML = driver.email;
                            document.getElementById('phone_num').innerHTML = driver.phone;
                            document.getElementById('user_role').innerHTML = 'Driver';
                            document.getElementById('edit-profile').href = 'driverProfile.html';
                            const resp = await fetch('/drivers/pickup');
                            if(resp.ok) {
                                const patientPickups = await resp.json();
                                patientPickups.forEach((patientPickup) => {
                                    createHTMLElements('row', 'col-md-6', 'Patient for Pickup', 'patient_ride', (patientPickup.first_name + patientPickup.last_name));
                                    createHTMLElements('row', 'col-md-6', 'Pickup Address', 'pickup_address', patientPickup.pickup);
                                });
                            }
                            createHTMLElements('row', 'col-md-6', 'Car Model', 'car_model', driver.car_model);
                            createHTMLElements('row', 'col-md-6', 'Car Type', 'car_type', driver.car_type);
                            createHTMLElements('row', 'col-md-6', 'Car Make', 'car_make', driver.car_make);
                            createHTMLElements('row', 'col-md-6', 'Car Color', 'car_color', driver.car_color);
                            createHTMLElements('row', 'col-md-6', 'Car License Plate', 'car_plate', driver.car_plate);
                        });
                    }
                }
            });
        }
    }
    await showPatientOrDriver();

    async function deleteUser() {
        document.getElementById('delete-profile').addEventListener('click', async () => {

            const response = await fetch('/currentUser');
            // Converting received data to JSON 
            if(response.ok) {
                const users = await response.json();
                users.forEach(async (user) => {
                    if (user.isPatient) { //check this
                        const deletePatient = await fetch(`/patients/${user.id.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        });
                        if(deletePatient.ok) {
                            alert('Deleted successfully.');
                        } else {
                            alert('Error signing up.');
                        }
                    } else {
                        const deleteDriver = await fetch(`/drivers/${user.id.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8'
                            }
                        });
                        if(deleteDriver.ok) {
                            alert('Deleted successfully.');
                        } else {
                            alert('Error signing up.');
                        }
                    }

                });
            }
        });
    }

    await deleteUser();

});