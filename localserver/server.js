const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Define the array of cars
const cars = [
    { 
      "id": 1, 
      "make": "Toyota", 
      "model": "Camry", 
      "year": 2022, 
      "color": "Red", 
      "price": 25000,
      "description": "A reliable sedan with good fuel efficiency."
    },
    { 
      "id": 2, 
      "make": "Honda", 
      "model": "Accord", 
      "year": 2023, 
      "color": "Blue", 
      "price": 27000,
      "description": "A stylish and comfortable sedan."
    },
    { 
      "id": 3, 
      "make": "Ford", 
      "model": "Mustang", 
      "year": 2022, 
      "color": "Yellow", 
      "price": 35000,
      "description": "A classic American muscle car."
    },
    { 
      "id": 4, 
      "make": "Chevrolet", 
      "model": "Camaro", 
      "year": 2023, 
      "color": "Black", 
      "price": 32000,
      "description": "An iconic sports car with a powerful engine."
    },
    { 
      "id": 5, 
      "make": "Tesla", 
      "model": "Model 3", 
      "year": 2023, 
      "color": "Silver", 
      "price": 45000,
      "description": "An electric sedan with cutting-edge technology."
    },
    { 
      "id": 6, 
      "make": "BMW", 
      "model": "3 Series", 
      "year": 2022, 
      "color": "White", 
      "price": 38000,
      "description": "A luxury compact sedan known for its performance."
    },
    { 
      "id": 7, 
      "make": "Mercedes-Benz", 
      "model": "C-Class", 
      "year": 2022, 
      "color": "Gray", 
      "price": 42000,
      "description": "A refined and elegant sedan with advanced features."
    },
    { 
      "id": 8, 
      "make": "Audi", 
      "model": "A4", 
      "year": 2023, 
      "color": "Green", 
      "price": 40000,
      "description": "A premium compact sedan known for its comfort and style."
    },
    { 
      "id": 9, 
      "make": "Nissan", 
      "model": "Altima", 
      "year": 2022, 
      "color": "Brown", 
      "price": 27000,
      "description": "A reliable midsize sedan with a spacious interior."
    },
    { 
      "id": 10, 
      "make": "Subaru", 
      "model": "Legacy", 
      "year": 2022, 
      "color": "Purple", 
      "price": 26000,
      "description": "An all-wheel-drive sedan known for its safety and durability."
    }
  ];
  
  const billsOfMaterials = [
    {
      carId: 1,
      model: 'Camry',
      components: [
        { name: 'Engine', quantity: 1, price: 8000 },
        { name: 'Transmission', quantity: 1, price: 5000 },
        { name: 'Body Frame', quantity: 1, price: 7000 },
        { name: 'Interior Upholstery', quantity: 1, price: 3000 },
        { name: 'Electronics System', quantity: 1, price: 4000 },
      ],
    },
    {
      carId: 2,
      model: 'Accord',
      components: [
        { name: 'Engine', quantity: 1, price: 8500 },
        { name: 'Transmission', quantity: 1, price: 5200 },
        { name: 'Body Frame', quantity: 1, price: 7200 },
        { name: 'Interior Upholstery', quantity: 1, price: 3200 },
        { name: 'Electronics System', quantity: 1, price: 4200 },
      ],
    },
    {
      carId: 3,
      model: 'Mustang',
      components: [
        { name: 'Engine', quantity: 1, price: 9000 },
        { name: 'Transmission', quantity: 1, price: 5500 },
        { name: 'Body Frame', quantity: 1, price: 7500 },
        { name: 'Interior Upholstery', quantity: 1, price: 3500 },
        { name: 'Electronics System', quantity: 1, price: 4500 },
      ],
    },
    {
      carId: 4,
      model:'Chevrolet',
      components: [
        { name: 'Engine', quantity: 1, price: 9500 },
        { name: 'Transmission', quantity: 1, price: 5800 },
        { name: 'Body Frame', quantity: 1, price: 7700 },
        { name: 'Interior Upholstery', quantity: 1, price: 3700 },
        { name: 'Electronics System', quantity: 1, price: 4800 },
      ],
    },
    {
      carId: 5,
      model:'Tesla',
      components: [
        { name: 'Engine', quantity: 1, price: 10000 },
        { name: 'Transmission', quantity: 1, price: 6000 },
        { name: 'Body Frame', quantity: 1, price: 8000 },
        { name: 'Interior Upholstery', quantity: 1, price: 4000 },
        { name: 'Electronics System', quantity: 1, price: 5000 },
      ],
    },
    {
      carId: 6,
      model:'BMW',
      components: [
        { name: 'Engine', quantity: 1, price: 10500 },
        { name: 'Transmission', quantity: 1, price: 6200 },
        { name: 'Body Frame', quantity: 1, price: 8200 },
        { name: 'Interior Upholstery', quantity: 1, price: 4200 },
        { name: 'Electronics System', quantity: 1, price: 5500 },
      ],
    },
    {
      carId: 7,
      model:'Mercedes-Benz',
      components: [
        { name: 'Engine', quantity: 1, price: 11000 },
        { name: 'Transmission', quantity: 1, price: 6400 },
        { name: 'Body Frame', quantity: 1, price: 8700 },
        { name: 'Interior Upholstery', quantity: 1, price: 4400 },
        { name: 'Electronics System', quantity: 1, price: 6000 },
      ],
    },
    {
      carId: 8,
      model:'Audi',
      components: [
        { name: 'Engine', quantity: 1, price: 11500 },
        { name: 'Transmission', quantity: 1, price: 6600 },
        { name: 'Body Frame', quantity: 1, price: 9200 },
        { name: 'Interior Upholstery', quantity: 1, price: 4600 },
        { name: 'Electronics System', quantity: 1, price: 6500 },
      ],
    },
    {
      carId: 9,
      model:'Altima',
      components: [
        { name: 'Engine', quantity: 1, price: 12000 },
        { name: 'Transmission', quantity: 1, price: 6800 },
        { name: 'Body Frame', quantity: 1, price: 9700 },
        { name: 'Interior Upholstery', quantity: 1, price: 4800 },
        { name: 'Electronics System', quantity: 1, price: 7000 },
      ],
    },
    {
      carId: 10,
      model:'Legacy',
      components: [
        { name: 'Engine', quantity: 1, price: 12500 },
        { name: 'Transmission', quantity: 1, price: 7000 },
        { name: 'Body Frame', quantity: 1, price: 10200 },
        { name: 'Interior Upholstery', quantity: 1, price: 5000 },
        { name: 'Electronics System', quantity: 1, price: 7500 },
      ],
    },
  ];

  
  app.use(cors());

// Define a route to return the array of cars
app.get('/cars', (req, res) => {
  res.json(cars);
});

app.get('/billofmaterials/:carId', (req, res) => {
    const carId = parseInt(req.params.carId);
    const billOfMaterial = billsOfMaterials.find(bom => bom.carId === carId);
  
    if (billOfMaterial) {
      res.json(billOfMaterial);
    } else {
      res.status(404).json({ message: 'Bill of materials not found for the provided car ID.' });
    }
  });


  // Define the array of apparels
const apparels = [
  { 
    "id": 1, 
    "name": "T-Shirt", 
    "description": "A basic cotton T-shirt.",
    "price": 15
  },
  { 
    "id": 2, 
    "name": "Jeans", 
    "description": "A pair of denim jeans.",
    "price": 40
  },
  { 
    "id": 3, 
    "name": "Hoodie", 
    "description": "A warm hoodie made of fleece material.",
    "price": 30
  }
];

// Define the array of Bill of Materials (BoM) for apparels
const billsOfMaterialsApparel = [
  {
    "apparelId": 1,
    "name": "T-Shirt",
    "components": [
      { "material": "Cotton Fabric", "quantity": 2, "unitPrice": 5 },
      { "material": "Thread", "quantity": 1, "unitPrice": 2 },
      { "material": "Tag Label", "quantity": 1, "unitPrice": 0.5 },
      { "material": "Labor", "quantity": 1, "unitPrice": 10 }
    ]
  },
  {
    "apparelId": 2,
    "name": "Jeans",
    "components": [
      { "material": "Denim Fabric", "quantity": 3, "unitPrice": 8 },
      { "material": "Thread", "quantity": 1, "unitPrice": 2 },
      { "material": "Zipper", "quantity": 1, "unitPrice": 3 },
      { "material": "Button", "quantity": 4, "unitPrice": 0.5 },
      { "material": "Labor", "quantity": 1.5, "unitPrice": 15 }
    ]
  },
  {
    "apparelId": 3,
    "name": "Hoodie",
    "components": [
      { "material": "Fleece Fabric", "quantity": 2.5, "unitPrice": 7 },
      { "material": "Thread", "quantity": 1, "unitPrice": 2 },
      { "material": "Zipper", "quantity": 1, "unitPrice": 3 },
      { "material": "Pocket Fabric", "quantity": 0.5, "unitPrice": 4 },
      { "material": "Labor", "quantity": 2, "unitPrice": 12 }
    ]
  }
];



// Define a route to return the array of apparels
app.get('/apparels', (req, res) => {
res.json(apparels);
});

// Define a route to return the Bill of Materials (BoM) for a specific apparel
app.get('/billofmaterials/apparel/:apparelId', (req, res) => {
  const apparelId = parseInt(req.params.apparelId);
  const billOfMaterialApparel = billsOfMaterialsApparel.find(bom => bom.apparelId === apparelId);

  if (billOfMaterialApparel) {
    res.json(billOfMaterialApparel);
  } else {
    res.status(404).json({ message: 'Bill of materials not found for the provided apparel ID.' });
  }
});

app.post('/billofmaterials/apparel/:apparelId', (req, res) => {
  console.log("req....",req.body)
  const newBoM = req.body;
  billsOfMaterialsApparel.push(newBoM);
 

  const newRecord = {
    "id": newBoM.apparelId, 
    "name": newBoM.name,
    "description": "",
    "price": 15
  }
  console.log("req....",newRecord)
  apparels.push(newRecord)
  res.status(201).json({ message: 'Bill of materials for the apparel saved successfully.' });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
