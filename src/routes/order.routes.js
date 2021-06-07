//include middleware
const { authenticationJwt } = require('../middlewares');

//include controller
const controller = require('../controllers/order.controller');

module.exports = function (application) {

    //set headers
    application.use(function (request, response, next) {

        response.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    //api (GET) order headers
    application.get('/api/orders/headers', [authenticationJwt.validateToken], controller.getOrderHeaders)

    //api (GET) order lines
    application.get('/api/orders/lines', [authenticationJwt.validateToken], controller.getOrderLines)

    //api (POST) create order
    application.post("/api/orders/create", [authenticationJwt.validateToken], controller.createOrder)

    //api (POST) update order
    application.post("/api/orders/update", [authenticationJwt.validateToken], controller.updateOrder)

    //api (DELETE) delete order
    application.delete('/api/orders/delete', [authenticationJwt.validateToken], controller.deleteOrder)

    //api (DELETE) delete order line
    application.delete('/api/orders/lines/delete', [authenticationJwt.validateToken], controller.deleteOrderLine)

}