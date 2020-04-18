var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models0/user');

router.get('/login', function(req, res) {
  res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  User.register(new User({ username : req.body.username }), req.body.password, req.body.email, function(err, user) {
    if (err) {
      console.log(err);
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

module.exports = router;
