const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parse JSON data

// Connect to MongoDB
// 'mongodb+srv://dharanishwar2006:Nagoor@123@cluster0.wlsds.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect('mongodb://localhost/mydatabase',{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Define a Schema for the user details
const userSchema = new mongoose.Schema({
  role: String,
  name: String,
  phoneNumber: String,
  aadharNumber: String,
  address: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/submit', (req, res) => {
  const { role, name, phoneNumber, aadharNumber, address } = req.body;

  const newUser = new User({
    role,
    name,
    phoneNumber,
    aadharNumber,
    address
  });

  newUser.save()
    .then(() => {
      res.status(200).send('Details saved successfully!');
    })
    .catch(err => {
      res.status(400).send('Error saving details: ' + err);
    });
});

// Start Server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
