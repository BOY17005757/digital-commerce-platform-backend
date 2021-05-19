//include middlewares
const { validateSignUp } = require('../middlewares');
const { authenticationJwt } = require('../middlewares');

//include controller
const controller = require('../controllers/authentication.controller');

module.exports = function (application) {

    //set headers
    application.use(function (request, response, next) {

        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    //api (POST) SignUp
    application.post("/api/authentication/signup", [validateSignUp.validateDuplicateUsernameEmail, validateSignUp.validateRoles], controller.signUp);

    //api (POST) login
    application.post('/api/authentication/signin', controller.login);

    //api (DELETE) user
    // application.delete('/api/authentication/remove', [authenticationJwt.validateToken], controller.removeUser);

};