window.addEventListener('load', async function () {

    document.getElementById('submit-profile').addEventListener('click', () => {
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const age = document.getElementById('age').value;
        const phone = document.getElementById('phone').value;
        const emergency = document.getElementById('emergency').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const pickUpLocation = document.getElementById('pickup').value;

        /*
        Skeleton code to do a POST request of the user data to server
        */
        fetch('/patients', {
            method: 'POST',
            body: JSON.stringify({
                name: {
                    first: firstName,
                    last: lastName
                },
                age: age,
                phone: phone,
                emergency: emergency,
                address: address,
                email: email,
                pickup: pickUpLocation,
                image: image
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

    });
});
