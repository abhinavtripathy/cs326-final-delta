let container;
const row = document.createElement('div');
row.className = 'row';

function patientCard(patient) {

    const card = document.createElement('div');
    card.className = 'card col-md-3 m-3';

    const img = document.createElement('img');
    img.className = 'card-img-top';
    img.src = 'https://via.placeholder.com/150';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.innerText = patient.first_name + ' ' + patient.last_name;
    title.className = 'card-title';

    const text = document.createElement('div');
    text.innerHTML = `<ul>
<li>Address: ${patient.home_address}</li>
<li>Phone: ${patient.phone}</li>
<li>Emergency Number: ${patient.emergency_phone}</li>
<li>Pick Up: ${patient.pickup}</li>
<li>Current Status: ${patient.current_status}</li>
</ul>`;
    text.className = 'card-text';

    const select = document.createElement('button');
    select.className = 'btn btn-primary';
    select.innerText = 'Select Patient';
    select.id = patient.id;

    cardBody.appendChild(img);
    cardBody.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(select);
    card.appendChild(cardBody);
    row.appendChild(card);

}

function initCards() {
    if (container) {
        document.getElementById('container').replaceWith(container);
        return;
    }

    container = document.getElementById('container');
    fetch('/patients')
    // Converting received data to JSON 
        .then(response => response.json())
        .then(patients => {
            patients.forEach((patient) => {
                patientCard(patient);
            });
        });
    container.appendChild(row);
}
initCards();

window.addEventListener('load', async () => {

    async function getPatients() {
        const patientIds = [];
        const response = await fetch('/patients');
        if(response.ok) {
            const patients = await response.json();
            patients.forEach((patient) => {
                patientIds.push(patient.id);
            });
        }
        console.log(patientIds);
        return patientIds;
    }

    async function getDrivers() {
        let id;
        const response = await fetch('/currentUser');
        if(response.ok) {
            const users = await response.json();
            users.forEach((user) => {
                if(user.isPatient) {
                    id=0;
                }
                else {
                    id = user.id;
                }
            });
        }
        console.log(id.id);
        return parseInt(id.id);
    }

    // function getDriverId() {
    //     let id;
    //     fetch('/currentUser')
    //     // Converting received data to JSON 
    //         .then(response => response.json())
    //         .then(users => {
    //             users.forEach((user) => {
    //                 if (user.isPatient === false) {
    //                     id = user.id;
    //                 } else {
    //                     id = 0;
    //                 }
    //             });
    //         });
    //     return parseInt(id);
    // }
    // console.log(getDriverId());

    async function selectPatients() {
        const patientIds = await getPatients();
        console.log(patientIds);
        patientIds.forEach((id) => {
            document.getElementById(id.toString()).addEventListener('click', async () => {
                const driver_id = await getDrivers();
                console.log(driver_id);
                console.log(id);
                
                const putDriver = await fetch(`/patients/status/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        'driver_id': driver_id,
                        'current_status': 'Selected'
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                if(putDriver.ok) {
                    alert('Patient has been selected');
                } else {
                    alert('Error selecting patient.');
                }
                
            });
        });
    }
    await selectPatients();
});