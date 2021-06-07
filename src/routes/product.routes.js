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

    //api (GET) products
    application.get('/api/products', controller.getProducts)

    //api (GET) product
    application.get('/api/products/detail/', controller.getProduct)

    //api (POST) create individual product
    application.post("/api/products/new", [authenticationJwt.validateToken], controller.newProduct)

    //api (DELETE) remove product
    application.delete('/api/products/remove', [authenticationJwt.validateToken], controller.removeProduct)

    //api (POST) edit product
    application.post("/api/products/edit", [authenticationJwt.validateToken], controller.editProduct)

}