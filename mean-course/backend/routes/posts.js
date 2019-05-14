const express = require("express");
const Post = require('../models/post');

const router = express.Router();

router.post("", (req,res,next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // mongoose create entry into database
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
    });
  });
});

router.get("/:id",(req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post){
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found!'});
    }
  })
});

router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Update successful!"});
  })
});

router.get('', (req, res, next) => {
  // console.log("first middleware");
  // // if it is executed here, the request will continue its journey
  // // if there is no next when enter a infinite loop
  // next();
  // const posts = [
  //   {
  //     id: '123',
  //     title: "First server-side post",
  //     content: "This is coming from the server"
  //   },
  //   {
  //     id: '234',
  //     title: "Second server-side post",
  //     content: "This is coming from the server"
  //   }
  // ];
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

router.delete("/:id", (req, res, next) =>{
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
  });
  res.status(200).json({message: 'Post deleted!'});
});

module.exports = router;
