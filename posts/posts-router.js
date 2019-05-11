const express = require('express');
const Posts = require('./posts-model.js');
const router = express.Router();

router.post('/', async (req, res) => {
   const newPost = req.body
   const {title, contents} = req.body;

   try {
      const post = await Posts.insert(newPost)
      if(!title || !contents) {
         res.status(400).json({errorMessage: "Please provide title and contents for the post"})
      }
      else {
         res.status(201).json(post);
      }
   }
   catch(error) {
      res.status(500).json({error: "There was an error while saving the post to the database!"})
   }
})

module.exports = router;