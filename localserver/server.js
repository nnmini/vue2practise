const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
const fs = require('fs');
app.use(cors());

// Define the array of apparels
const apparels = require('./data/styles.json');

// Define the array of Bill of Materials (BoM) for apparels
const billsOfMaterialsApparel =  require('./data/billsOfMaterials.json');

// Define a route to return the array of apparels
app.get('/apparels', (req, res) => {
res.json(apparels);
});

app.get('/apparels/:id', (req, res) => {
  const apparelId = parseInt(req.params.id);
  const apparel = apparels.find(apparel => apparel.id === apparelId);

  if (apparel) {
    res.json(apparel);
  } else {
    res.status(404).json({ message: 'Styles not found for the provided apparel ID.' });
  }
});

// Define a route to return the Bill of Materials (BoM) for a specific apparel
app.get('/billofmaterials/apparel/:apparelId', (req, res) => {
 
  const apparelId = parseInt(req.params.apparelId);
  console.log("billsOfMaterialsApparel....",apparelId)
  const billOfMaterialApparel = billsOfMaterialsApparel.find(bom => bom.apparelId === apparelId);

  if (billOfMaterialApparel) {
    res.json(billOfMaterialApparel);
  } else {
    res.status(404).json({ message: 'Bill of materials not found for the provided apparel ID.' });
  }
});




// Define a route to update the Bill of Materials (BoM) for a specific apparel
app.post('/billofmaterials/apparel/:apparelId', (req, res) => {
  const newBoM = req.body;
  const apparelId = parseInt(req.params.apparelId);
  const billsOfMaterialsApparelPath = './data/billsOfMaterials.json';
  // Check if there's an existing BoM with the same apparelId
  const existingBoMIndex = billsOfMaterialsApparel.findIndex(bom => bom.apparelId === apparelId);
  console.log("existingBoMIndex...",existingBoMIndex)
  if (existingBoMIndex !== -1) {
    // Update existing BoM
    billsOfMaterialsApparel[existingBoMIndex] = newBoM;
    console.log('Updated bill of materials for apparel:', newBoM);
  } else {
    // If no match found, add new BoM
    billsOfMaterialsApparel.push(newBoM);
    console.log('Added new bill of materials for apparel:', newBoM);
  }

  // Write updated data back to the file
  fs.writeFile(billsOfMaterialsApparelPath, JSON.stringify(billsOfMaterialsApparel, null, 2), (err) => {
    if (err) {
      console.error('Error writing bill of materials data:', err);
      return res.status(500).json({ message: 'Error writing bill of materials data.' });
    }
    console.log('Bill of materials for apparel updated successfully.');
    res.status(201).json({ message: 'Bill of materials for the apparel saved successfully.' });
  });
});



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
