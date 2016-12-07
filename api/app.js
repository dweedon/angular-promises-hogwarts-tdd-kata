const { Server } = require('hapi');

const server = new Server();

server.connection({port: process.env.PORT || 5001, routes: { cors: true }});
server.route(require('./routes'));

server.start((err) => {
  if (err) { throw err; }
  console.log(`Server running at: ${server.info.uri}`);
});
