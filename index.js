require('dotenv').config();

const server = require('./server.js');
const PORT = process.env.PORT || 3050;

server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})