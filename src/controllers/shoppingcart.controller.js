//require database models
const database = require('../models');
const ShoppingCart = database.shoppingcart;

//handle returning users shopping cart
exports.getShoppingCartProducts = (request, response) => {

    //find shopping cart
    ShoppingCart.find({
        userId: {
            $in: request.query.userId
        }
    })
    //populate document references
    .populate('productId', 'name price')
    .sort({
        createdAt: 'descending'
    })
    .exec(function (error, products) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //no products found
        if (!products) {

            return response.status(404).send({

                message: "Shopping Cart Products Not found."

            });
        }

        response.status(200).send(products);

    });

}

//handle add shopping cart product
exports.addShoppingCartProduct = (request, response) => {

    //find shopping cart product
    ShoppingCart.find({
        productId: {
            $in: request.body.productId
        }
    })
    .exec(function (error, existingProduct) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //product not already in shopping cart
        if (Object.keys(existingProduct).length === 0) {

            //create new shopping cart product
            new ShoppingCart({
                userId: request.body.userId,
                productId: request.body.productId,
                quantity: request.body.quantity
            })
            .save(function (error, product) {
        
                //handle error and send 500 response
                if (error) {
        
                    response.status(500).send({
        
                        message: error
        
                    });
        
                    return;
        
                } else {
        
                    response.status(200).send(product);
                }
            });

        } else {

            //update existing shopping cart product quantity
            ShoppingCart.findOneAndUpdate({
                _id: {
                    $in: existingProduct[0]._id
                }

            }, {
                quantity: existingProduct[0].quantity + request.body.quantity
            },
            function (error, product) {

                //handle error and send 500 response
                if (error) {
        
                    response.status(500).send({
        
                        message: error
        
                    });
        
                    return;
        
                } else {
        
                    response.status(200).send(product);
                }

            });

        }

    });

}

//handle remove shopping cart product
exports.decrementShoppingCartProduct = (request, response) => {

    //find shopping cart
    ShoppingCart.find({
        productId: {
            $in: request.body.productId
        }
    })
    .exec(function (error, existingProduct) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }
        
        //update existing shopping cart product quantity
        ShoppingCart.findOneAndUpdate({
            _id: {
                $in: existingProduct[0]._id
            }

        }, {
            quantity: existingProduct[0].quantity - request.body.quantity
        },
        function (error, product) {

            //handle error and send 500 response
            if (error) {
    
                response.status(500).send({
    
                    message: error
    
                });
    
                return;
    
            } else {
    
                response.status(200).send(product);
            }

        });

    });

}

//handle shopping cart remove product
exports.removeShoppingCartProduct = (request, response) => {

    ShoppingCart.deleteOne({
        userId: {
            $in: request.body.userId
        },
        productId: {
            $in: request.body.productId
        }
    })
    .exec(function (error, product) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //product not found
        if (!product) {

            return response.status(404).send({

                message: "Shopping cart product not found."

            });
        }

        response.status(200).send("Shopping cart product successfully removed.");

    });

}