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
    select.type = 'submit';

    cardBody.appendChild(img);
    cardBody.appendChild(title);
    cardBody.appendChild(text);
    cardBody.appendChild(select);
    card.appendChild(cardBody);
    row.appendChild(card);

}
window.addEventListener('load', async () => {
    async function initCards() {
        if (container) {
            document.getElementById('container').replaceWith(container);
            return;
        }

        container = document.getElementById('container');
        const resp = process(await fetch('/patients'));
        if(resp.ok) {
            const patients = await resp.json();
            patients.forEach((patient) => {
                patientCard(patient);
            });
        }
        container.appendChild(row);
    }
    await initCards();

    async function getPatients() {
        const patientIds = [];
        const response = process(await fetch('/patients'));
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
        const response = process(await fetch('/patients'));
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
        return parseInt(id.id);
    }

    async function selectPatients() {
        const patientIds = await getPatients();
        patientIds.forEach((id) => {
            document.getElementById(id.toString()).addEventListener('click', async () => {
                const driver_id = await getDrivers();
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
    await initCards();
});


function process(response) {
  if(response.redirected) {
    window.location.replace(response.url);
  }
  return response;
}
