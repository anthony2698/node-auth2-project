const server = require('./server');

const port = 5000;

server.listen(port, () => {
    console.log(`\n <=== Server is running HOT on port ${port}! ==> \n`);
});