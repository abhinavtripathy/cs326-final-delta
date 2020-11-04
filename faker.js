let restaurants = 
  [
    {"restaurant" : { "name" : "McDonald's", "food" : "burger" }},
    {"restaurant" : { "name" : "KFC",        "food" : "chicken" }},
    {"restaurant" : { "name" : "Pizza Hut",  "food" : "pizza" }}
  ];


if(restaurants.find(item => {
    return item.restaurant.food == 'chicken'
 })) {
     console.log()
 }
 
 