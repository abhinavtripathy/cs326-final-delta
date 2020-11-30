window.addEventListener('load', async function () {

    document.getElementById('submit-profile').addEventListener('click', async () => {
        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const age = document.getElementById('age').value;
        const phone = document.getElementById('phone').value;
        const emergency = document.getElementById('emergency').value;
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const pickUpLocation = document.getElementById('pickup').value;
        const pickUpTime = document.getElementById('pcikup-time').value;
        const resp = await fetch('/currentUser');
        if(resp.ok) {
            const users = await resp.json();
            users.forEach(async (user) => {
                const response = await fetch(`/patients/${user.id.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        first_name: firstName,
                        last_name: lastName,
                        age: age,
                        phone: phone,
                        emergency_phone: emergency,
                        home_address: address,
                        email: email,
                        pickup: pickUpLocation,
                        pickup_time: pickUpTime
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                if(response.ok) {
                    alert('Signed up successfully.');
                } else {
                    alert('Error signing up.');
                }
            });
        }
    });
});
