const express = require('express');

const PostsRouter = require();

const server = express();

server.use(express.json());
server.use('/api/posts', PostsRouter)

server.get('/', (req, res) => {
   res.send(`
      <h1>Web API Posts</h1>
   `)
})
