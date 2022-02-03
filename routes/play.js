var express = require('express');
var router = express.Router();

// Require controller modules
var space_controller = require('../controllers/spaceController');
var game_controller = require('../controllers/gameController');
var card_controller = require('../controllers/cardController');

// GET play home page
router.get('/', (req, res) => {
  res.render('index', { title: 'iserBINGO Home' });
});

// space_controller.index);

// SPACE ROUTES

// GET request for creating a Space. NOTE this must come before routes that display Space (uses id).
router.get('/space/create', space_controller.space_create_get);

// POST request for creating a Space
router.post('/space/create', space_controller.space_create_post);

// GET request to delete a Space
router.get('/space/:id/delete', space_controller.space_delete_get);

// POST request to delete a Space
router.post('/space/:id/delete', space_controller.space_delete_post);

// GET request to update a Space
router.get('/space/:id/update', space_controller.space_update_get);

// POST request to update a Space
router.post('/space/:id/update', space_controller.space_update_post);

// GET request for one Space
router.get('/space/:id', space_controller.space_detail);

// GET request for list of all Space items for a particular game
router.get('/spaces', space_controller.space_list);

// POST request to generate some spaces
router.post('/generate_spaces', space_controller.generate_spaces);

/// GAME ROUTES ///

// GET request for creating Game. NOTE this must come before route for id (i.e. display game)
router.get('/game/create', game_controller.game_create_get);

// POST request for creating Game
router.post('/game/create', game_controller.game_create_post);

// GET request to delete Game
router.get('/game/:id/delete', game_controller.game_delete_get);

// POST request to delete Game
router.post('/game/:id/delete', game_controller.game_delete_post);

// GET request to update Game
router.get('/game/:id/update', game_controller.game_update_get);

// POST request to update Game
router.post('/game/:id/update', game_controller.game_update_post);

// GET request for one Game
router.get('/game/:id', game_controller.game_detail);

// GET request for list of all Games
router.get('/games', game_controller.game_list);

// POST request to join a game
router.post('/game/join', game_controller.game_join);

/// CARD ROUTES ///

router.get('/card_request', card_controller.card_request_get);

router.post('/card_request', card_controller.card_send_post);

router.get('/card/:hashedId', card_controller.card_display);

router.post('/card/:cardId', card_controller.card_update);

module.exports = router;
