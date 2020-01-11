var express = require('express');
var router = express.Router();

const { Space, Game } = require('../sequelize');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/play');
});

module.exports = router;
