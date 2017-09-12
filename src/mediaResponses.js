const fs = require('fs'); // Require the file system module

const sponge = fs.readFileSync(`${__dirname}/../client/spongegar.png`);

// Respond to any requests
const getSponge = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(sponge);
  response.end();
};

// Make exports
module.exports.getSponge = getSponge;
