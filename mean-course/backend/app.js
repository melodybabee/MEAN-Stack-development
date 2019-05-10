const express = require('express');

const app = express();

// middleware
app.use( (req,res,next) => {
  console.log("first middleware");
  // if it is executed here, the request will continue its journey
  // if there is no next when enter a infinite loop
  next();
});

app.use( (req,res,next) => {
 res.send('Hello from express!');
});


module.exports = app;
