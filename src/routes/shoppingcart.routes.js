//include middleware
const { authenticationJwt } = require('../middlewares');

//include controller
const controller = require('../controllers/product.controller');

module.exports = function (application) {

    //set headers
    application.use(function (request, response, next) {

        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    //api (POST) create shoppingcart item
    application.post("/api/shoppingcart/add", [authenticationJwt.validateToken], controller.addProduct)

}