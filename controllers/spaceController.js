const validator = require('express-validator');
const models = require('../models');
var async = require('async');
const querystring = require('querystring');


/*
exports.index = function(req, res) {
  models.Space.count().then(function (space_count) {
    res.render('index', { 
      title: 'iserBINGO Home',
      space_count: space_count,
      user: req.user
     });
  });
};
*/

// Display list of all spaces for a particular game
exports.space_list = function(req, res) {
  models.Space.findAll({where: { gameId: parseInt(req.query.gameId) } }).then(function (list_spaces) {
    // Doing away with rendering, returning objects instead for our API implementation.
    // res.render('space_list', { title: 'Space List', space_list: list_spaces });
    res.send(list_spaces);
  });
};

// Display detail page for a specific space
exports.space_detail = function(req, res, next) {
  async.parallel({
    space: function(callback) {
      models.Space.findOne({
        where: {
          id: req.params.id
        }
      }).then(callback);
    },
  }, function(results) {
    if (results.get()==null) { // No results
      var err = new Error('Space not found');
      err.status = 404;
      return next(err);
    }
    // Successful, so render
    res.render('space_detail', { title: 'Space Detail', space: results.get() });
  });
};


// Display space create form on GET
exports.space_create_get = function(req, res, next) {
  res.render('space_form', { title: 'Create Space' });
};

//Handle space create on POST
exports.space_create_post = [
  // Validate fields - REVISE THESE LINES
  // validator.body('desc').isLength({ min: 1 }).trim().withMessage('You must enter a description'),
  // Sanitize fields
  // validator.check('desc').escape(),

  // Process request after validation and sanitization
  (req, res, next) => {

    // Extract the validation errors from a request
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages
      // res.render('space_form', { title: 'Create Space', space: req.body, errors: errors.array() });
      return;
    }
    else {
      // Data from request is valid
      // Create a Space object with escaped and trimmed data
      function createNewSpace() {
        const space = models.Space.create(
          {
            desc: req.body.desc,
            GameId: parseInt(req.body.gameId)
          });
        return space;
      }
      async function loadNew() {
        var space = await createNewSpace();
        // Rather than loading a new page we will now use this as an API and just need to return a 
        // status showing the space was created.
        //res.redirect(space.url);
        
        // Everything worked. Return 200.

        res.sendStatus(200);
      }
      loadNew();
    }
  }
];

// Display space delete form on GET
exports.space_delete_get = function(req, res, next) {
  async.parallel({
    space: function(callback) {
      models.Space.findOne({
        where: {
          id: req.params.id
        }
      }).then(callback);
    },
  }, function(results) {
    if (results.get()==null) { // No results
      var err = new Error('Space not found');
      err.status = 404;
      return next(err);
    }
    // Successful, so send success signal
    res.sendStatus(200);
  });

};

// Handle space delete on POST
exports.space_delete_post = function(req, res) {
  async.parallel({
    space: function(callback) {
      models.Space.findOne({
        where: {
          id: req.params.id
        }
      }).then(callback);
    },
  }, function(results) {
    /* if (results.get()==null) { // No results
      var err = new Error('Space not found');
      err.status = 404;
      return next(err);
    }*/
    // Space exists, so delete and redirect
    results.destroy();
    res.sendStatus(200);
  });
};

// Display space update form on GET
exports.space_update_get = function(req, res, next) {
  async.parallel({
    space: function(callback) {
      models.Space.findOne({
        where: {
          id: req.params.id
        }
      }).then(callback);
    },
  }, function(results) {
    if (results.get()==null) { // No results
      var err = new Error('Space not found');
      err.status = 404;
      return next(err);
    }
    // Space exists, so render update form.
    res.render('space_form', { title: 'Update Space', space: results.get() });
  });
};

// Handle space update on POST
exports.space_update_post = [
  // Validate fields
  validator.body('desc').isLength({ min: 1 }).trim().withMessage('You must enter a description'),
  // Sanitize fields
  validator.check('desc').escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages
      res.render('space_form', { title: 'Update Space', space: req.body, errors: errors.array() });
      return;
    }
    else {
      // Data from form is valid

      // Find and update with validated and sanitized data
      models.Space.findOne({
        where: {
          id: req.params.id
        }
      }).then(space => {
        space.desc = req.body.desc;
        space.save().then(() => {
          res.send(space);
          //res.redirect(space.url);
        });
      });
    }
  }
];
