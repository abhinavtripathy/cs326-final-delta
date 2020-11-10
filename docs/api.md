**Application Structure**



*   Patients - First name, last name, age, phone, emergency contact, email address, address, pick up location, password
*   Driver - First name, last name, age, phone, email address, car type, car model, license plate number, password
*   Hospital - Hospital Name, Verified drivers

For our API, we will need CRUD operations for each of these 3 objects. Some example endpoints might look like:



*   `/patients`
    *   `POST` *creates* a new patient profile
        *   Example data sent:

            ```
{
  name: {
    first: "Juan",
    last: "Tanamera"
  },
  age: 29,
  phone: 1234567890,
  emergency: 1234098765,
  email: "juan@example.com",
  address: "1600 Pennsylvania Avenue",
  pickup: "Door C",
  driver: 93205912492513350566463886604965037953,
  status: "waiting"
}
            ```

        *   Example data received:

            ```
{
  id: 166426039573329213731786786340393070639
}
```

    *   `GET `lists an array of all patients
    *   `/patients/{id}`
        *   `PUT` updates the profile of patient with id `{id}`
            *   Example data: [same as POST]
        *   `GET` views the information of patient with id `{id}`
        *   `DELETE` removes the profile of patient with id `{id}`
*   `/drivers`
    *   `POST` *creates* a new driver profile
        *   Example data sent:

            ```
{
  name: {
    first: "Joseph",
    last: "Black"
  },
  age: 19,
  phone: 19876543210,
  email: "joseph@example.com",
  car: {
    make: "Ferrari",
    model: "F8 Spider",
    color: "Blue",
    plate: "31337ST"
  },
  patients: [166426039573329213731786786340393070639],
  verified: true
}
```

        *   Example data received:

            ```
{
  id: 93205912492513350566463886604965037953
}
```

    *   `GET `lists an array of all drivers
    *   `/drivers/{id}`
        *   `PUT` updates the profile of driver with id `{id}`
            *   Example data: [same as POST]
        *   `GET` views the information of driver with id `{id}`
        *   `DELETE` removes the profile of driver with id `{id}`
*   `/hospital`
    *   `PUT` *updates* the hospital information
        *   Example data sent:

            ```
{
  name: "Los Santos Medical Center",
}
```
