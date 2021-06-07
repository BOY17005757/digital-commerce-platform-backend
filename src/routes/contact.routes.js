//include middleware
const { authenticationJwt } = require('../middlewares');

//include controller
const controller = require('../controllers/contact.controller');

module.exports = function (application) {

    //set headers
    application.use(function (request, response, next) {

        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    //api (GET) contact messages
    application.get('/api/contact', [authenticationJwt.validateToken], [authenticationJwt.validateAdministrator], controller.getContactMessages)

    //api (POST) create contact message
    application.post("/api/contact/new", controller.newContactMessage)

    //api (DELETE) remove contact message
    application.delete('/api/contact/remove', [authenticationJwt.validateToken], [authenticationJwt.validateAdministrator], controller.removeContactMessage)

}