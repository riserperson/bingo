const validator = require('express-validator');
var async = require('async');
var models = require('../models');
const Hashids = require('hashids/cjs');
const hashids = new Hashids('hokier smokes', 4, 'ABCDEFGHIJKLMNOPQRSTUV');

// Display list of all games
exports.game_list = function(req, res, next) {
  models.Game.findAll().then(function (list_games) {
    res.render('game_list', { title: 'Game List', game_list: list_games });
  });
};

// TO DELETE
// Display detail page for a specific game
exports.game_detail = function(req, res, next) {
  async.parallel({
    game: function(callback) {
      models.Game.findOne({
        where: {
          id: req.params.id
        }
      }).then(callback);
    },
  }, function(results) {
    if (results.get()==null) { // No results
      var err = new Error('Game not found');
      err.status = 404;
      return next(err);
    }
    // Successful, so render
    res.render('game_detail', { title: 'Game Detail', game: results.get() });
  });

};

// Display game create form on GET
exports.game_create_get = function(req, res, next) {
  res.render('game_form', { title: 'Create Game' });
};

//Handle game create on POST
exports.game_create_post = [
  // Validate fields
  //  validator.body('group_name').isLength({ min: 1 }).trim().withMessage('You must enter a group name'),
  // Sanitize fields
  // validator.check('group_name').escape(),

  (req, res, next) => {

    // Extract the validation errors from a request
    // const errors = validator.validationResult(req);

    // if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages
      // res.render('game_form', { title: 'Create Game', game: req.body, errors: errors.array() });
      // return;
    // }
    // else {
      // Data from form is valid

    // Create a Game object with escaped and trimmed data
    models.Game.create( { status: false } ).then(function (game) {
      game.code = hashids.encode(game.id);
      game.save().then((game) => {
        res.redirect(game.url + '/update');
      })
    });
    }
];

// Display game delete form on GET
exports.game_delete_get = function(req, res, next) {
  async.parallel({
    game: function(callback) {
      models.Game.findOne({
        where: {
          id: req.params.id
        }
      }).then(callback);
    },
  }, function(results) {
    if (results.get()==null) { // No results
      var err = new Error('Game not found');
      err.status = 404;
      return next(err);
    }
    // Successful, so render
    res.render('game_delete', { title: 'Delete Game', game: results.get() });
  });

};

// Handle game delete on POST
exports.game_delete_post = function(req, res, next) {
  async.parallel({
    game: function(callback) {
      models.Game.findOne({
        where: {
          id: req.body.gameid
        }
      }).then(callback);
    },
  }, function(results) {
    if (results.get()==null) { // No results
      var err = new Error('Game not found');
      err.status = 404;
      return next(err);
    }
    // Game exists, so delete and redirect
    results.destroy();
    res.redirect('/play/games');
  });

};

// Handle GET requests to update game 
// This doubles as the new game form
exports.game_update_get = function(req, res, next) {
  models.Game.findOne({where: { id: parseInt(req.params.id) } }).then(function (game) {
    let title = '';
    if (game.status == 0) {
      title = 'New Game';
    } else {
      title = 'Update Game';
    }
    res.render('game_form', {title: title, game: game });
  });
}

// Handle game update on POST #7
exports.game_update_post = [
  // Validate fields
  // validator.body('group_name').isLength({ min: 1 }).trim().withMessage('You must enter a group name'),
  // Sanitize fields
  // validator.check('group_name').escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages
      res.render('game_form', { title: 'Update Game', game: req.body, errors: errors.array() });
      return;
    }
    else {
      // Data from form is valid

      // Find and update with validated and sanitized data
      models.Game.findOne({
        where: {
          id: req.params.id
        }
      }).then(game => {
        game.name = req.body.gameName;
        let gameStatusBool = (req.body.gameStatus === 'true');
        game.status = gameStatusBool;
        game.save().then(() => {
          res.send(game);
        });
      });
    }
  }
];

exports.game_join = [
   (req, res, next) => {
    // Validate fields (eventually)
    // Extract the validation errors from a request
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages
      res.render('game_form', { title: 'Update Game', game: req.body, errors: errors.array() });
      return;
    }
    else {
      // Data from form is valid

      // Find the game based on the code provided
      models.Game.findOne({
        where: {
          code: req.body.gameCode
        }
      }).then(game => {
        if (game===null) {
          res.render('index', { error: 'Game not found' });
        } else {
          res.redirect(game.url + '/update');
        }
        
      })
      .catch(err => {
        // Game not found
        res.render('index', { error: 'Game not found' });
      });
    }
  }
] 
