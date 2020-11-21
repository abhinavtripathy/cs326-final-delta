
let container;
const col = document.createElement('div');
col.className = 'col';
col.id = 'checked';

const h2 = document.createElement('h2');
h2.className = "h2 text-secondary";
h2.innerHTML = "Verified Drivers";
col.appendChild(h2);

function addDriver(driverProfile) {

    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group mb-3';

    const prepend = document.createElement('div');
    prepend.className = 'input-group-prepend';
    
    const selection = document.createElement('div');
    selection.className = 'input-group-text';

    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = driverProfile.id;

    selection.appendChild(checkbox);
    prepend.appendChild(selection);

    const driver = document.createElement('input');
    driver.type = "text";
    driver.className = "form-control";
    driver.value = driverProfile.first_name + " " + driverProfile.last_name;

    inputGroup.appendChild(prepend);
    inputGroup.appendChild(driver);

    col.appendChild(inputGroup);
}

function initDrivers() {
    if (container) {
        document.getElementById('verified').replaceWith(container);
        return;
    }

    container = document.getElementById('verified');
    fetch('/drivers')
    // Converting received data to JSON 
        .then(response => response.json())
        .then(drivers => {
            drivers.forEach((driverProfile) => {
                addDriver(driverProfile);
            });
        });
    container.appendChild(col);
}

let returnVal = {};
function getCheckedBoxes() {
    //let selected = [];

    // Reference divs with checkboxes.
    let mainDiv = document.getElementById("checked");

    //Reference all the CheckBoxes.
    let checks = mainDiv.getElementsByTagName("input");

    // Loop and push the checked CheckBox value in Array.
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked) {
            
            returnVal[parseInt(checks[i].id)] = checks[i].checked;
            //selected.push(returnVal);
        }
    }

    //Display the selected CheckBox values.
    if (Object.keys(returnVal).length > 0) {
        for (const id in returnVal) {
            fetch(`/drivers/verify/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    "verified": returnVal[id]
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            });
        }
    }
}

initDrivers();
const update = document.getElementById('update')
update.addEventListener('click', () => {
    getCheckedBoxes();
    alert("Driver verification complete!")
});