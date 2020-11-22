/*
 * If patient is viewing profile, then do a fetch with ID to the patient DB and generate html to add volunteer driver to the existing profile view
 * If driver is viewing profile, add details like car details to existing data.
 */

 // Function to create HTML elements for this page
function createHTMLElements(row_name, col_name, label_name, p_id, para) {
    const home = document.getElementById("home");
    const row = document.createElement("div");
    row.className = row_name;
    const col1 = document.createElement("div");
    col1.className = col_name;
    const label = document.createElement("label");
    label.innerHTML = label_name;
    const col2 = document.createElement("div");
    col2.className = col_name;
    const p = document.createElement("p");
    p.id = p_id;
    p.innerHTML = para;

    col1.appendChild(label);
    col2.appendChild(p);
    row.appendChild(col1);
    row.appendChild(col2);
    home.appendChild(row);
}

function getPatientOrDriver() {
    fetch('/currentUser')
        // Converting received data to JSON 
        .then(response => response.json())
        .then(users => {
            users.forEach((user) => {
                if (user.isPatient === true) {
                    fetch(`/patients/${user.id}`)
                        // Converting received data to JSON 
                        .then(response => response.json())
                        .then(patients => {
                            patients.forEach((patient) => {
                                document.getElementById('name').innerHTML = patient.first_name + " " + patient.last_name;
                                document.getElementById('user_id').innerHTML = patient.id;
                                document.getElementById('full_name').innerHTML = patient.first_name + " " + patient.last_name;
                                document.getElementById('age').innerHTML = patient.age;
                                document.getElementById('email_id').innerHTML = patient.email;
                                document.getElementById('phone_num').innerHTML = patient.phone;
                                document.getElementById('user_role').innerHTML = "Patient";
                                createHTMLElements("row", "col-md-6", "Emergency Contact", "emergency", patient.emergency_phone);
                                createHTMLElements("row", "col-md-6", "Home Address", "address", patient.home_address);
                            });
                        });
                } // end of if user is patient
                else {
                    fetch(`/drivers/${user.id}`)
                        // Converting received data to JSON 
                        .then(response => response.json())
                        .then(drivers => {
                            drivers.forEach((driver) => {
                                document.getElementById('name').innerHTML = driver.first_name + " " + driver.last_name;
                                document.getElementById('user_id').innerHTML = driver.id;
                                document.getElementById('full_name').innerHTML = driver.first_name + " " + driver.last_name;
                                document.getElementById('age').innerHTML = driver.age;
                                document.getElementById('email_id').innerHTML = driver.email;
                                document.getElementById('phone_num').innerHTML = driver.phone;
                                document.getElementById('user_role').innerHTML = "Driver";
                                createHTMLElements("row", "col-md-6", "Car Model", "car_model", driver.car_model);
                                createHTMLElements("row", "col-md-6", "Car Type", "car_type", driver.car_type);
                                createHTMLElements("row", "col-md-6", "Car Make", "car_make", driver.car_make);
                                createHTMLElements("row", "col-md-6", "Car Color", "car_color", driver.car_color);
                                createHTMLElements("row", "col-md-6", "Car License Plate", "car_plate", driver.car_plate);
                            });
                        });
                }

            });
        });
}