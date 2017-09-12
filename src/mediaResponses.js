const fs = require('fs'); // Require the file system module
const path = require('path');

// const sponge = fs.readFileSync(`${__dirname}/../client/spongegar.png`);

// Respond to any requests
const getParty = (request, response) => {
  const file = path.resolve(__dirname, '../client/party.mp4'); // Find the file

  // Check file status
  fs.stat(file, (err, stats) => {
    // If the file produces some kind of error
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }

    let range = request.headers.range; // Get the range header, contains media start poing

    // If no range header is specified, assume the start point is 0
    // No end point was specified
    if (!range) {
      range = 'bytes=0-';
    }

    // Get the start position from the header, and end if there is one
    const positions = range.replace(/bytes=/, '').split('-');

    let start = parseInt(positions[0], 10);

    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    // Catch any dingusy stuff goin' on
    if (start > end) {
      start = end - 1;
    }

    // Determine how big of a chunk we are sending to the browser
    const chunksize = (end - start) + 1;

    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    });

    // Create a stream
    const stream = fs.createReadStream(file, { start, end });

    // Opening the stream
    stream.on('open', () => {
      stream.pipe(response);
    });

    // Stream error
    stream.on('error', () => {
      response.end(); // Removed streamErr because it caused an error
    });

    return stream;
  });
};

// Make exports
module.exports.getParty = getParty;
