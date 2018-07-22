'use strict'
 
const hapi = require('hapi')
const data = [];
 
const server = new hapi.Server({
  port: 3000,
  routes: {
      cors: true
  }})
 
server.route({
  method: 'POST',
  path: '/add',
  handler: function (request, reply) {
    const body = request.payload;
    
    console.log(body)
    return(`success`)
  }
})

server.route({
  method:'GET',
  path:'/getAllItemsForUser',
  handler:function(request,h) {
    const userId = request.query.userId;

    return data.filter(item => item.userId === userId);
  }
});
 
// Start the server
async function start() {

  try {
      await server.start();
  }
  catch (err) {
      console.log(err);
      process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
};

start();