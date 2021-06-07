//include middleware
const { authenticationJwt } = require('../middlewares');

const multer  = require('multer');
const upload = multer({ dest: 'public/images/products' });

//include controller
const controller = require('../controllers/productImage.controller');

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
    application.get('/api/productimage', controller.getProductImage)

    //api (POST) upload product image
    application.post("/api/productimage/upload",upload.single('image'), [authenticationJwt.validateToken, authenticationJwt.validateAdministrator], controller.uploadProductImage)

}