const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock user data
const users = [{ id: 1, name: "John Doe", email: "john@example.com", password: "123456" }];

// Authentication middleware
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).send("Invalid credentials");
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Dummy API for fetching projects
app.get('/projects', (req, res) => {
  const projects = [
    { id: 1, title: "Logo Redesign", status: "In Progress" },
    { id: 2, title: "Social Media Campaign", status: "Completed" },
  ];
  res.json(projects);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
