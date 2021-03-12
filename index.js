// importing dotenv & server
require('dotenv').config()

const server = require('./api/server')

// setting up the port & having the server listen for the port
// from the enviroment or a default 1237  
const port = process.env.PORT || 1237;

server.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})
