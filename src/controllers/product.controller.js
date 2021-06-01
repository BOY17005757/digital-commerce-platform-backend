//require database models
const database = require('../models');
const Post = database.post;
const Product = database.product;

//
exports.getProducts = (request, response) => {

    //TODO: get only active, search query?

    //true return only active
    if(request.query.active === 'true') {

        //find active products
        Product.find({
            status: request.query.active
        })
        //populate document references
        // .populate('roleNames', 'roleName')
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

                    message: "Products Not found."

                });
            }

            response.status(200).send(products);

        });

    } else {

        //find all products
        Product.find({})
        //populate document references
        // .populate('roleNames', 'roleName')
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

                    message: "Products Not found."

                });
            }

            response.status(200).send(products);

        });
        
    }

};

//
exports.getProduct = (request, response) => {

    //true return only active
    if(request.query.active === 'true') {

        //find active product
        Product.findOne({
            _id: request.query.productId,
            status: true
        })
        //populate document references
        // .populate('roleNames', 'roleName')
        // .sort({
        //     createdAt: 'descending'
        // })
        .exec(function (error, product) {

            //handle error and send 500 response
            if (error) {

                response.status(500).send({

                    message: error

                });

                return;
            }

            //no product found
            if (!product) {

                return response.status(404).send({

                    message: "Product Not found."

                });
            }

            response.status(200).send(product);

        });

    } else {

        //TODO: check admin access

        //find product
        Product.findOne({
            _id: request.query.productId
        })
        //populate document references
        // .populate('roleNames', 'roleName')
        // .sort({
        //     createdAt: 'descending'
        // })
        .exec(function (error, product) {

            //handle error and send 500 response
            if (error) {

                response.status(500).send({

                    message: error

                });

                return;
            }

            //no product found
            if (!product) {

                return response.status(404).send({

                    message: "Product Not found."

                });
            }

            response.status(200).send(product);

        });

    }

};

//handle new product
exports.newProduct = (request, response) => {

    new Product({
        name: request.body.name,
        description: request.body.description,
        price: request.body.price,
        status: request.body.status
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

}

//handle remove product
exports.removeProduct = (request, response) => {

    //TODO: validate administrator

    Product.deleteOne({
        _id: request.query.productId
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

                message: "Product not found."

            });
        }

        response.status(200).send("Product successfully removed.");

    });

}

//handle edit product
exports.editProduct = (request, response) => {

    Product.findOneAndUpdate({
            _id: request.body.productId
        }, {
            name: request.body.name,
            description: request.body.description,
            price: request.body.price,
            status: request.body.status
        })
        .exec(function (error, product) {

            //handle error and send 500 response
            if (error) {

                response.status(500).send({

                    message: `Product not found. ${error}`

                });

                return;
                
            } else {

                response.status(200).send(`Product edited. _id: ${request.body.productId}`);

            }
        });

}