//include middleware
const { authenticationJwt } = require('../middlewares');

//include controller
const controller = require('../controllers/collection.controller');

module.exports = function (application) {

    //set headers
    application.use(function (request, response, next) {

        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    //api (GET) collections
    application.get('/api/collections', [authenticationJwt.validateToken], controller.getCollections)

    // //api (POST) create collection
    application.post("/api/collections/create", [authenticationJwt.validateToken], controller.createCollection)

    // //api (DELETE) delete collection
    application.delete('/api/collections/delete', [authenticationJwt.validateToken], controller.deleteCollection)

}