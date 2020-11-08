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
<li>Address: ${patient.address}</li>
<li>Phone: ${patient.phone}</li>
<li>Emergency Number: ${patient.emergency}</li>
<li>Pick Up: ${patient.pickup}</li>
</ul>`;
    text.className = 'card-text';

    const select = document.createElement('a');
    select.className = 'btn btn-primary';
    select.innerText = 'Select Patient';

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