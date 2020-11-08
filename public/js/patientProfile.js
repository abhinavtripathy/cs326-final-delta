let image;
document.addEventListener('DOMContentLoaded', function() {
    const readURL = function(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById('avatar').src = e.target.result;
                image = e.target.result;
            };

            reader.readAsDataURL(input.files[0]);
        }
    };
    const anchors = document.getElementById('file-upload');
    anchors.addEventListener('change', function () {
        readURL(this);
    });
});

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