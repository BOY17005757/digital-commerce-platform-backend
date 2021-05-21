//include middleware
const { authenticationJwt } = require('../middlewares');

//include controller
const controller = require('../controllers/user.controller');

module.exports = function (application) {

    //set headers
    application.use(function (request, response, next) {

        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    //api (GET) public content
    application.get("/api/access/public", controller.publicAccess);

    //api (GET) user content
    // application.get("/api/access/user", [authenticationJwt.validateToken], controller.userFeed);

    //api (GET) profile content
    application.get("/api/access/profile", [authenticationJwt.validateToken], controller.profile);

    //api (GET) user via search
    // application.get("/api/access/search", [authenticationJwt.validateToken], controller.getSearch);

    //api (GET) moderator content
    // application.get("/api/access/moderator", [authenticationJwt.validateToken, authenticationJwt.validateModerator], controller.moderatorAccess);

    //api (GET) administrator content
    application.get("/api/access/administrator", [authenticationJwt.validateToken, authenticationJwt.validateAdministrator], controller.administratorAccess);

}