'use strict'
 
const hapi = require('hapi')
const loki = require('lokijs')
var data = null;

var db = new loki('mood1.json', {
	autoload: true,
	autoloadCallback : databaseInitialize,
	autosave: true, 
	autosaveInterval: 4000
});
 
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
    data.insert(body);
    db.saveDatabase();
    console.log("-------- NEW ENTRY -------");
    console.log(body);
    console.log("User Data Length : " + data.length);
    return(`success`)
  }
})


function databaseInitialize() {
  data = db.getCollection("userEntries");
  if (data === null) {
    data = db.addCollection("userEntries");
  }
}

server.route({
  method:'GET',
  path:'/getAllItemsForUser',
  handler: (request,h) => {
    const userId = request.query.userId;
    console.log("------ FETCH DATA ------- ");
    console.log("UserId : " + userId);
    databaseInitialize();

    if(data) {
      const userData = { userData : data.where(item => +item.userId === +userId) };
      userData.userData.forEach(item => {
        item.id = item.$loki;
      });

      console.log(userData);
      return userData;
    }
  }
});

server.route({
  method:'GET',
  path:'/getFilteredItemsByDate',
  handler: (request, h) => {
    console.log("------ FETCH FILTERED DATA ------- ");
    const fromDate = request.query.dateFrom;
    const toDate = request.query.toDate;
    const userId = request.query.userId;
    console.log(request.query);
    databaseInitialize();
    
    console.log(convertToUnix(fromDate));
    console.log(data.where(item => +item.userId === +userId));

    const userData = { userData : data.where(item => +item.userId === +userId 
      && (convertToUnix(item.dateTime) >= convertToUnix(fromDate) 
      && convertToUnix(item.dateTime) <= convertToUnix(toDate))) };

    userData.userData.forEach(item => {
      item.id = item.$loki;
    });

    console.log(userData);
    return userData;

  }
});
 
function convertToUnix(date) {
  return new Date(date).getTime() / 1000 ;
}

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