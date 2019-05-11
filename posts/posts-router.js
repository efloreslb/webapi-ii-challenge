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
      } else {
         res.status(201).json(post);
      }
   } catch(error) {
      res.status(500).json({error: "There was an error while saving the post to the database!"})
   }
})

router.get('/', async (req, res) => {
   try {
      const posts = await Posts.find(req.query);
      res.status(200).json(posts);
   } catch {
      res.status(500).json({error: "The posts information could not be retrieved!"})
   }
})

router.get('/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const post = await Posts.findById(id);
      if (post.length) {
         res.status(200).json(post);
      } else {
         res.status(404).json({message: "The post with the specified ID does not exist"})
      }
   } catch {
      res.status(500).json({error: "The post information could not be retrieved"})
   }
})

module.exports = router;