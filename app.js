const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Middleware to check JWT
app.use((req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, '', (err, decoded) => { // Empty secret is the vulnerability
      if (err) {
        res.status(401).send('Invalid token');
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the vulnerable JWT application!');
});

app.get('/protected', (req, res) => {
  if (req.decoded) {
    res.send('Access granted to protected resource!');
  } else {
    res.status(401).send('Access denied');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
