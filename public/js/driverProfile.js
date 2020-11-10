window.addEventListener('load', async function () {

    document.getElementById('submit-profile').addEventListener('click', () => {
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const age = document.getElementById('age').value;
        const phone = document.getElementById('phone').value;
        const carModel = document.getElementById('car-model').value;
        const carType = document.getElementById('car-type').value;
        const carMake = document.getElementById('car-make').value;
        const license = document.getElementById('license').value;
        const email = document.getElementById('email').value;
        const carColor = document.getElementById('car-color');
        // TODO implement password

        fetch('/drivers', {
            method: 'POST',
            body: JSON.stringify({
                name: {
                    first: firstName,
                    last: lastName
                },
                age: age,
                phone: phone,
                car: {
                    model: carModel,
                    make: carMake,
                    color: carColor,
                    type: carType
                },
                email: email
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

    });
});
