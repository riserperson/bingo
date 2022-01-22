const models = require('./models');
var async = require('async');

function createNewSpace(gameId, i) {
  const space = models.Space.create(
    {
      desc: 'Space ' + i,
      GameId: parseInt(gameId)
    });
  return space;
}

async function loadNew(gameId, i) {
  var space = await createNewSpace(gameId, i);
  return space;
}
 
exports.generate = function (gameId) {
  for (i=0; i<25; i++) {
    loadNew(gameId, i).then( (space) => {console.log('Created space: ' + JSON.stringify(space))});
  }
}
