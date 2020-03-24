const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

routes.put('/devsUpdate/:github_username', DevController.update);
routes.delete('/devsDelete/:github_username', DevController.destroy);

module.exports = routes;