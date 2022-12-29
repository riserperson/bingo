'use strict';
var async = require('async');
var models = require('../models');
const querystring = require('querystring');
const Hashids = require('hashids/cjs');
const hashids = new Hashids('hokey smokes');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Serve up a form for requesting a card from a GET request
exports.card_request_get = function(req, res, next) {
  models.Game.findOne({where: { id: parseInt(req.query.gameId) } }).then(function (game) {
   res.render('card_request', { game: game });
  });
};

// Handle a POST request for a new card

exports.card_send_post = function(req, res, next) {
  console.log('****************************');

}

// Display an existing card from a GET request

exports.card_display = function(req, res, next) {
  models.Card.findOne({where: { hashedId: req.params.hashedId } }).then(function (card) {
    models.Card_Space.findAll({ 
      where:
        {
          CardId: card.id
        },
      order: [
        ['position', 'ASC']
      ],
      include: {
        model: models.Space
      }
    })
    .then( (result) => {
      //res.send(result);
      models.Game.findOne( {where: { id: card.GameId } }).then(function (game) {
        res.render('card_display', { card: result, code: game.code, player: card.phoneNumber });
      });
    });
  });
}

// Handle a POST request to handle updates to card contents

exports.card_update = function(req, res, next) {
  models.Card_Space.findOne({where: {CardId: req.body.cardId, position: req.body.position} }).then(function (cardSpace) {
    cardSpace.checked = req.body.checked;
    cardSpace.save().then( (cardSpace) => {
      res.send(cardSpace);
    })
  });
}
