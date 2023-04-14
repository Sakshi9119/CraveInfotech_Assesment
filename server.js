const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


//JSON Array where car entities are stored
let cars = [
  { id: 1, make: 'Toyota', colour: 'Blue', price: 15000 }
  // { id: 2, make: 'Honda', colour: 'Red', price: 20000 },
  // { id: 3, make: 'Ford', colour: 'Green', price: 18000 }
];

//Middlewares

app.use(express.json()); //To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); //Used to parse JSON request bodies
app.use(express.static('public')); //To serve static files like JS


//Routes 

app.get('/', (req, res) => {
  res.sendFile("./public/index.html" + 'car-management-system/index.html');
});  //serves index.html rom public

app.get('/cars', (req, res) => {f
  res.json(cars);
}); //Returns array of car entities as JSON 

app.post('/cars', (req, res) => {
  const newCar = {
    id: cars.length + 1,
    make: req.body.make,
    colour: req.body.colour,
    price: req.body.price
  };
  cars.push(newCar);
  res.json(newCar);
}); //To add new car

app.put('/cars/:id', (req, res) => {
  const id = Number(req.params.id);
  const carToUpdate = cars.find(car => car.id === id);
  if (carToUpdate) {
    carToUpdate.make = req.body.make;
    carToUpdate.colour = req.body.colour;
    carToUpdate.price = req.body.price;
    res.json(carToUpdate);
  } else {
    res.status(404).send('Car not found');
  }
});   //To update existing car

app.delete('/cars/:id', (req, res) => {
  const id = Number(req.params.id);
  cars = cars.filter(car => car.id !== id);
  res.sendStatus(200);
}); //To delete cars

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});