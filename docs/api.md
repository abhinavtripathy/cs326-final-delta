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
  first_name: "Juan",
  last_name: "Tanamera",
  age: 29,
  phone: 1234567890,
  emergency_phone: 1234098765,
  email: "juan@example.com",
  home_address: "1600 Pennsylvania Avenue",
  pickup: "Door C",
  pickup_time: "December 14th 12:00pm",
  password: "$omethings3cure",
  current_status: "Not selected"
}
            ```

        *   Example data received:

            ```
{
  id: 1
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
  first_name: "Joseph",
  last_name: "Black",
  age: 19,
  phone: 19876543210,
  email: "joseph@example.com",
  car_make: "Ferrari",
  car_model: "F8 Spider",
  car_color: "Blue",
  car_plate: "31337ST",
  car_type: "Sports Car",
  password: "n0treallymyc4r"
}
```

        *   Example data received:

            ```
{
  id: 2
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
* `/currentUser`
    * `GET` returns the current user
        * Example data received:
        ```
        {
          id: 1,
          isPatient: true
        }
        ```
