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
         res.status(404).json({message: "The post with the specified ID does not exist!"})
      }
   } catch {
      res.status(500).json({error: "The post information could not be retrieved!"})
   }
})

router.delete('/:id', async (req, res) => {
   const { id } = req.params;
   try {
      const post = await Posts.remove(id);
      if (post > 0) {
         res.status(200).json(await Posts.findById(id)); //Need to return deleted object
      } else {
         res.status(404).json({message: "The post with the specified ID does not exist!"})
      }
   } catch {
      res.status(500).json({error: "The post could not be removed!"})
   }
})

router.put('/:id', async (req, res) => {
   const { id } = req.params;
   const { title, contents } = req.body;
   const body = req.body;

   try {
      const post = await Posts.update(id, body)
      if (post) {
         if (!title || !contents) {
            res.status(400).json({errorMessage: "Please provide title and contents for the post"})
         } else { 
            res.status(200).json(post);
         }
      } else {
         res.status(404).json({message: "The post with specified ID does not exist!"})
      }
   } catch {
      res.status(500).json({error: "The post information could not be modified!"})
   }
})

module.exports = router;