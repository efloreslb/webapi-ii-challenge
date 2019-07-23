const express = require('express');

const PostsRouter = require('./posts/posts-router.js');

const server = express();

server.use(express.json());
server.use('/api/posts', PostsRouter)

server.get('/', (req, res) => {
   res.send(`
      <h1>Web API Posts</h1>
   `)
})

module.exports = server;