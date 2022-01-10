const validator = require('express-validator');
var async = require('async');
var models = require('../models');

// Display list of all games
exports.game_list = function(req, res, next) {
  models.Game.findAll().then(function (list_games) {
    res.render('game_list', { title: 'Game List', game_list: list_games });
  });
};

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
  validator.body('group_name').isLength({ min: 1 }).trim().withMessage('You must enter a group name'),
  // Sanitize fields
  validator.check('group_name').escape(),

  // Process request after validation and sanitization
  (req, res, next) => {

    // Extract the validation errors from a request
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages
      res.render('game_form', { title: 'Create Game', game: req.body, errors: errors.array() });
      return;
    }
    else {
      // Data from form is valid

      // Create a Game object with escaped and trimmed data
      function createNewGame() {
        const game = models.Game.create(
          {
            group_name: req.body.group_name
          });
        return game;
      }
      async function loadNew() {
        var game = await createNewGame();
        res.redirect(game.url);
      }
      loadNew();
    }
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

// Display game update form on GET
exports.game_update_get = function(req, res, next) {
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
    // Game exists, so render update form.
    res.render('game_form', { title: 'Update Game', game: results.get() });
  });

};

// Handle game update on POST
exports.game_update_post = [
  // Validate fields
  validator.body('group_name').isLength({ min: 1 }).trim().withMessage('You must enter a group name'),
  // Sanitize fields
  validator.check('group_name').escape(),

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
        game.group_name = req.body.group_name;
        game.save().then(() => {
          res.redirect(game.url);
        });
      });
    }
  }
];
