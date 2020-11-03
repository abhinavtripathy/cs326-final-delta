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

        fetch("URL", {
            method: "POST",
            body: JSON.stringify({
                name: firstName + " " + lastName,
                age: age,
                phone_number: phone,
                emergency_number: emergency,
                address: address,
                email_id: email,
                pickup_location: pickUpLocation
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

    });
});