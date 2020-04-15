var models = require('../models');
var express = require('express');
var router = express.Router();

const Game = require('../models/index');


/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/play');
});

module.exports = router;
