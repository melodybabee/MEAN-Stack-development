const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requeated-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Controol-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// middleware

app.post("/api/posts", (req,res,next) => {
  const post = req.body;
  console.log(post);
  // return json type
  res.status(201).json({
    message: 'Post added successfully'
  });
  next();
});

app.get('/api/posts', (req, res, next) => {
  // console.log("first middleware");
  // // if it is executed here, the request will continue its journey
  // // if there is no next when enter a infinite loop
  // next();
  const posts = [
    {
      id: '123',
      title: "First server-side post",
      content: "This is coming from the server"
    },
    {
      id: '234',
      title: "Second server-side post",
      content: "This is coming from the server"
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

app.use( (req,res,next) => {
 res.send('Hello from express!');
});


module.exports = app;
