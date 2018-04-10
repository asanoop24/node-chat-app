const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '..', 'public');
console.log(publicPath);

var port = process.env.PORT || 3000;


// Initiating the App
var app = express();

// Declaring the Static Middleware for HTML files
app.use(express.static(publicPath));

// Starting the app server on the port 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
