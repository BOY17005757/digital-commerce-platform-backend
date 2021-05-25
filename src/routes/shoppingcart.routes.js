//include middleware
const { authenticationJwt } = require('../middlewares');

//include controller
const controller = require('../controllers/shoppingcart.controller');

module.exports = function (application) {

    //set headers
    application.use(function (request, response, next) {

        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    //api (GET) shopping cart products
    application.get('/api/shoppingcart', [authenticationJwt.validateToken], controller.getShoppingCartProducts)

    //api (POST) add shopping cart product
    application.post("/api/shoppingcart/add", [authenticationJwt.validateToken], controller.addShoppingCartProduct)

    //api (POST) decrement shopping cart prodyuct
    application.post("/api/shoppingcart/decrement", [authenticationJwt.validateToken], controller.decrementShoppingCartProduct)

    //api (DELETE) remove shopping cart product
    application.delete('/api/shoppingcart/remove', [authenticationJwt.validateToken], controller.removeShoppingCartProduct)

}