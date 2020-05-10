const Router = require('express')();

const QuestionsController = require('../questions/controllers.js');
const UsersController = require('../users/controllers.js');
const DressesController = require('../dresses/controllers.js');

Router.use('/questions', QuestionsController);
Router.use('/users', UsersController);
Router.use('/dresses', DressesController);

module.exports = Router;