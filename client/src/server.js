const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001; // Ensure this port is free or choose another one

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint for registration
app.post('/api/register', (req, res) => {
  const { firstName, email, password } = req.body;
  // insert the data into a database and perform any necessary validation and error handling

  // right now just returning data receive
  res.json({
    message: 'User registered successfully',
    data: req.body
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the API server');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
