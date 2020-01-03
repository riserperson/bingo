const validator = require('express-validator');
var sequelize = require('../sequelize');
var async = require('async');

exports.index = function(req, res) {
  async.parallel({
    space_count: function(callback) {
      sequelize.Space.count().then(callback);
    }
  }, function(err, results) {
      res.render('index', { title: 'iserBINGO Home', error: err, data: results });
  });
};

// Display list of all spaces
exports.space_list = function(req, res) {
  sequelize.Space.findAll().then(function (list_spaces) {
    res.render('space_list', { title: 'Space List', space_list: list_spaces });
  });
};

// Display detail page for a specific space
exports.space_detail = function(req, res, next) {
  async.parallel({
    space: function(callback) {
      sequelize.Space.findOne({
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
  // Validate fields
  validator.body('user_created').isLength({ min: 1 }).trim().withMessage('You must select a user'),
  validator.body('desc').isLength({ min: 1 }).trim().withMessage('You must enter a description'),
  // Sanitize fields
  validator.sanitizeBody('user_created').escape(),
  validator.sanitizeBody('desc').escape(),

  // Process request after validation and sanitization
  (req, res, next) => {

    // Extract the validation errors from a request
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values and error messages
      res.render('space_form', { title: 'Create Space', space: req.body, errors: errors.array() });
      return;
    }
    else {
      // Data from form is valid

      // Create a Space object with escaped and trimmed data
      var space = new sequelize.Space(
        {
          user_created: req.body.user_created,
          desc: req.body.desc
        });
      console.log(space);
      space.save().then(() => {
        res.redirect(space.url);
      });

      space.save().catch(error => {
        return next(error); 
      });
    }
  }
];

// Display space delete form on GET
exports.space_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Space delete GET');
};

// Handle space delete on POST
exports.space_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Space delete POST');
};

// Display space update form on GET
exports.space_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Space update GET');
};

// Handle space update on POST
exports.space_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Space update POST');
};
