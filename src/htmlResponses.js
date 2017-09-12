const fs = require('fs'); // Require the file system module

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

// Respond to any requests
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

// Make exports
module.exports.getIndex = getIndex;
