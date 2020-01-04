# bingo
Iserman family crowdsourced bingo game

Built using express, sequelize, and pug for view engine. Currently in development.
sequelize is currently set to destroy existing db and recreate at startup, using sqlite for now as db backend for convenience
during early development, but sequelize will make it easy to switch to mysql when we get to production.

Pull requests welcome from all interested siblings :)

Database currently has two tables: Spaces (i.e. bingo space suggestions from users) and Games, which have a one to many rel with Spaces.

TODO:

-User management and application of permissions to visibility of Games and Spaces

-Games controller (Space one is done)

