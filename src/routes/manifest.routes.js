//include middleware
const { authenticationJwt } = require('../middlewares');

//include controller
const controller = require('../controllers/manifest.controller');

module.exports = function (application) {

    //set headers
    application.use(function (request, response, next) {

        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    //api (GET) manifest
    application.get('/api/manifest', controller.getManifest)

    //api (POST) edit manifest
    application.post("/api/manifest/edit", [authenticationJwt.validateToken], controller.editManifest)

}