//require database models
const database = require('../models');
const Post = database.post;
const Product = database.product;
const ShoppingCart = database.shoppingcart;
const OrderHeader = database.orderheader;
const OrderLine = database.orderline;

exports.getOrderHeader = (request, response) => {



}

exports.getOrderHeaders = (request, response) => {

    if(request.query.userId) {

        OrderHeader.find({
            userId: {
                $in: request.query.userId
            }
        })
        //populate document references
        .populate('userId', 'username firstName lastName emailAddress')
        .populate('collectionId', 'dateTimeFrom dateTimeTo')
        .sort({
            createdAt: 'descending'
        })
        .exec(function (error, orderHeaders) {

            //handle error and send 500 response
            if (error) {

                response.status(500).send({

                    message: error

                });

                return;
            }

            //no order headers found
            if (!orderHeaders) {

                return response.status(404).send({

                    message: "Order Headers Not found."

                });
            }

            response.status(200).send(orderHeaders);

        });

    } else {

        OrderHeader.find()
        //populate document references
        .populate('userId', 'username firstName lastName emailAddress')
        .populate('collectionId', 'dateTimeFrom dateTimeTo')
        .sort({
            createdAt: 'descending'
        })
        .exec(function (error, orderHeaders) {

            //handle error and send 500 response
            if (error) {

                response.status(500).send({

                    message: error

                });

                return;
            }

            //no order headers found
            if (!orderHeaders) {

                return response.status(404).send({

                    message: "Order Headers Not found."

                });
            }

            response.status(200).send(orderHeaders);

        });
    
    }

}

exports.getOrderLines = (request, response) => {



}

exports.createOrder = (request, response) => {

    new OrderHeader({
        userId: request.body.userId,
        collectionId: request.body.collectionId,
        delivery: request.body.delivery,
        instructions: request.body.instructions,
        type: request.body.type,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        emailAddress: request.body.emailAddress,
        country: request.body.country,
        streetAddress: request.body.streetAddress,
        city: request.body.city,
        county: request.body.county,
        postalCode: request.body.postalCode,
        total: request.body.total,
        status: "Pending"
    })
    .save(function (error, orderHeader) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;

        } else {

            //loop products and create order lines
            request.body.products.forEach(function(product){

                new OrderLine({
                    headerId: orderHeader._id,
                    productId: product.productId,
                    quantity: product.quantity,
                    price: product.productId[0].price,
                    total: product.quantity * product.productId[0].price
                })
                .save(function (error, orderLine) {
            
                    //handle error and send 500 response
                    if (error) {
            
                        response.status(500).send({
            
                            message: error
            
                        });
            
                        return;
            
                    }

                });

            });

            ShoppingCart.deleteMany({
                userId: {
                    $in: request.body.userId
                }
            })
            .exec(function (error, shoppingcart) {

                //handle error and send 500 response
                if (error) {

                    response.status(500).send({

                        message: error

                    });

                    return;
                }

                response.status(200).send(orderHeader);

            });

        }
    });

}

exports.updateOrder = (request, response) => {

    

}

exports.deleteOrder = (request, response) => {

    

}