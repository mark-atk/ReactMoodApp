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
  handler: (request, reply) => {
    const body = request.payload;
    
    body.id = data.length;
    data.push(body);
    console.log(body)
    console.log("User Data Length : " + data.length);
    return(`success`)
  }
})

server.route({
  method:'GET',
  path:'/getAllItemsForUser',
  handler: (request,h) => {
    const userId = request.query.userId;

    console.log("Fetch User With Id : " + userId);

    if(data) {
      const userData = { userData : data.filter(item => +item.userId === +userId) };
      console.log("User Data " + JSON.stringify(userData));
      return userData;
    }
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