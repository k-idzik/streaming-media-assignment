// Import required files
const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

// Chose which port to use
const PORT = process.env.PORT || process.env.NODE_PORT || 3000;

// Start server and listen for HTTP traffic
const onRequest = (request, response) => {
  console.log(request.url);

  switch (request.url) {
    case '/':
      htmlHandler.getIndex(request, response);
      break;
    case '/party.mp4':
      mediaHandler.getParty(request, response);
      break;
    default:
      htmlHandler.getIndex(request, response);
      break;
   /* case '/page2':
     htmlHandler.getPage2(request, response);
     break;
   case '/hello':
     textHandler.getHello(request, response);
     break;
   case '/time':
     textHandler.getTime(request, response);
     break;
   case '/helloJSON':
     jsonHandler.getHelloJSON(request, response);
     break;
   case '/timeJSON':
     jsonHandler.getTimeJSON(request, response);
     break;
   case '/dankmemes':
     imageHandler.getSponge(request, response);
     break; */
  }
};

http.createServer(onRequest).listen(PORT);

console.log(`Listening on 127.0.0.1: ${PORT}`);
