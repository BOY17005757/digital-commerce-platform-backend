//require database models
const database = require('../models');
const ShoppingCart = database.shoppingcart;
const OrderHeader = database.orderheader;
const OrderLine = database.orderline;

//handle returning order headers
exports.getOrderHeaders = (request, response) => {

    //return orders for a specific user
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

    //return all orders
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

//handle returning order lines
exports.getOrderLines = (request, response) => {

    OrderLine.find({
        headerId: {
            $in: request.query.headerId
        }
    })
    //populate document references
    .populate('productId', 'name description')
    .sort({
        createdAt: 'descending'
    })
    .exec(function (error, orderLines) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //no order lines found
        if (!orderLines) {

            return response.status(404).send({

                message: "Order Lines Not found."

            });
        }

        response.status(200).send(orderLines);

    });

}

//handle creating new order headers and lines
exports.createOrder = (request, response) => {

    //create order header
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

            //delete users shopping cart
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

//handle updating existing order
exports.updateOrder = (request, response) => {

    //not completed

}

//handle deleting an order header and associated lines
exports.deleteOrder = (request, response) => {

    //delete order header
    OrderHeader.deleteOne({
        _id: request.query.headerId
    })
    .exec(function (error, orderHeader) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //order header not found
        if (!orderHeader) {

            return response.status(404).send({

                message: "orderHeader not found."

            });
        }

        //delete associated order lines
        OrderLine.deleteMany({
            headerId: {
                $in: request.query.headerId
            }
        })
        .exec(function (error, orderLine) {
    
            //handle error and send 500 response
            if (error) {
    
                response.status(500).send({
    
                    message: error
    
                });
    
                return;
            }
    
            //order line not found
            if (!orderLine) {
    
                return response.status(404).send({
    
                    message: "order line not found."
    
                });
            }
    
            response.status(200).send("order header and lines successfully removed.");
    
        });

    });

}

//handle deleting order line
exports.deleteOrderLine = (request, response) => {

    //delete order line
    OrderLine.deleteOne({
        _id: request.query.lineId
    })
    .exec(function (error, orderLine) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //order line not found
        if (!orderLine) {

            return response.status(404).send({

                message: "order line not found."

            });
        }

        response.status(200).send("order line successfully removed.");

    });

}