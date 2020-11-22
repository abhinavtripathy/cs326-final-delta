/*
const patients = [{
    name: {
      first: "John",
      last: "Doe"
    },
    age: 29,
    phone: 1234567890,
    emergency: 1234098765,
    email: "john@example.com",
    address: "1600 Pennsylvania Avenue",
    pickup: "Door C",
    driver: 93205912492513350566463886604965037953,
    status: "waiting"
  },
  {
    name: {
      first: "Jane",
      last: "Doe"
    },
    age: 27,
    phone: 1234567890,
    emergency: 1234098765,
    email: "jane@example.com",
    address: "1600 Pennsylvania Avenue",
    pickup: "Door C",
    driver: 93205912492513350566463886604965037953,
    status: "confirmed"
  }
  
];
*/

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
</ul>`;
    text.className = 'card-text';

    const select = document.createElement('a');
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


function getPatientId() {
  let patientIds = []
  let mainDiv = document.getElementById("container");

    //Reference all the CheckBoxes.
    let buttons = mainDiv.getElementsByTagName("a");

    // Loop and push the checked CheckBox value in Array.
    for (let i = 0; i < buttons.length; i++) {
          patientIds.push(parseInt(buttons[i].id));
          //selected.push(returnVal);
    }
    return patientIds;
}

function getDriverId() {
  let id;
  fetch('/currentUser')
    // Converting received data to JSON 
        .then(response => response.json())
        .then(users => {
            users.forEach((user) => {
                if(user['isPatient'] === false) {
                  id = user.id;
                }
                else {
                  id = 0;
                }
            });
        });
  return parseInt(id);
}

function selectPatients() {
  let patientIds = getPatientId();
  patientIds.forEach((id) => {
    document.getElementById(id.toString()).addEventListener('click', () => {
      const driver_id = getDriverId();
      if (driver_id === 0) {
        alert("Only Drivers can select Patients");
      }
      else {
        fetch(`/patients/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
              "driver_id": driver_id
          }),
          headers: {
              'Content-type': 'application/json; charset=UTF-8'
          }
      });
      }
    })
  });
}
selectPatients();
