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

let container;
let row = document.createElement('div');
row.className = 'row';
let patientCard = (patients) => {


// let col = document.createElement('div');
// col.className = 'col-md-4';
let card = document.createElement('div');
card.className = 'card col-md-3';

let img = document.createElement('img')
img.className = 'card-img-top';
img.src = 'https://via.placeholder.com/150';

let cardBody = document.createElement('div');
cardBody.className = 'card-body';

let title = document.createElement('h5');
title.innerText = patients.name.first + " " + patients.name.last;
title.className = 'card-title';

let text = document.createElement('div');
text.innerHTML = `<ul>
<li>Address: ${patients.address}</li>
<li>Phone: ${patients.phone}
<li>Pick Up: ${patients.pickup}
</ul>`;
text.className = 'card-text';

let select = document.createElement('a');
select.className = 'btn btn-primary'
select.innerText = 'Select Patient'

cardBody.appendChild(img);
cardBody.appendChild(title);
cardBody.appendChild(text);
cardBody.appendChild(select);
card.appendChild(cardBody);
row.appendChild(card)

}

let initCards = () => {
if (container) {
    document.getElementById('container').replaceWith(container);
    return;
}

container = document.getElementById('container');
patients.forEach((patient) => {
    patientCard(patient);
});
container.appendChild(row);

};
initCards();