'use strict';
var async = require('async');
var models = require('../models');
const querystring = require('querystring');
const Hashids = require('hashids/cjs');
const hashids = new Hashids('hokey smokes');
const nodemailer = require('nodemailer');

// Serve up a form for requesting a card from a GET request
exports.card_request_get = function(req, res, next) {
  models.Game.findOne({where: { id: parseInt(req.query.gameId) } }).then(function (game) {
   res.render('card_request', { game: game });
  });
};

// Handle a POST request for a new card

exports.card_send_post = function(req, res, next) {
  // Define our mailer
  async function sendEmail(email, hashedId) {
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_URL,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD
      },
      tls: {
        ciphers:'SSLv3'
      }
    });
    let info = await transporter.sendMail({
      from: 'richard.iserman@gmail.com',
      to: email,
      subject: 'Here\'s your card',
      text: 'http://iserbingo.herokuapp.com/play/card/'+hashedId
    });
  }

  // Define the shuffle function (thanks Fisher and Yates!)
  function shuffle(array) {
    var m = array.length, t, i;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  }

  // Have to define an async function to use promises
  async function main() {
    // Get the spaces for our game
    var allSpaces = await models.Space.findAll({where: { GameId: req.body.gameId } });

    // Check to make sure we have enough
    if (allSpaces.length < 24) {
      let err = new Error('Too few spaces');
      return next(err);
    } else {
      // Shuffle the spaces
      allSpaces = shuffle(allSpaces);

      // Create a new card 
      function createNewCard() {
        const card = models.Card.create(
          {
            email: req.body.email,
            GameId: parseInt(req.body.gameId)
          });
        return card;
      }
      let card = await createNewCard();
      // Add the spaces to the junction table for spaces and cards

      var selectedSpaces = [];
      
      async function addSpace(spaceId, position) {
        const cardSpace = models.Card_Space.create(
          {
            checked: false,
            position: position,
            SpaceId: spaceId,
            CardId: card.id
          });
        return cardSpace;
      }

      for (let i = 0; i < 25; i++) {
        selectedSpaces.push(await addSpace(allSpaces[i].id, i));
      }

      // New card created, but now that it has an ID we need to update it with a hashed ID
      models.Card.findOne({where: { id: card.id } }).then( (updatedCard) => {
        updatedCard.hashedId = hashids.encode(card.id);
        updatedCard.save().then(() => {
          // Everything worked. Email the new card out.
          if (process.env.NODE_ENV == 'production') {
            sendEmail(updatedCard.email, updatedCard.hashedId).catch(console.error);
          }

          // Send the new card in the response
          res.send(updatedCard);

        }).catch(console.error);
      });
    }  
  }
  main();
}

// Display an existing card from a GET request

exports.card_display = function(req, res, next) {
  models.Card.findOne({where: { hashedId: req.params.hashedId } }).then(function (card) {
    models.Card_Space.findAll({ 
      where:
        {
          CardId: card.id
        },
      include: {
        model: models.Space
      }
    })
    .then( (result) => {
      //res.send(result);
      res.render('card_display', { card: result });
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
