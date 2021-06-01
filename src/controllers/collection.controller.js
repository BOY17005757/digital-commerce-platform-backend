//require database models
const database = require('../models');
const Post = database.post;
const Product = database.product;
const ShoppingCart = database.shoppingcart;
const OrderHeader = database.orderheader;
const OrderLine = database.orderline;
const Collection = database.collection;

exports.getCollections = (request, response) => {

    Collection.find({
    })
    .sort({
        createdAt: 'ascending'
    })
    .exec(function (error, collections) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //no collections found
        if (!collections) {

            return response.status(404).send({

                message: "Collections Not found."

            });
        }

        response.status(200).send(collections);

    });

}

exports.createCollection = (request, response) => {

    new Collection({
        dateTimeFrom: request.body.dateTimeFrom,
        dateTimeTo: request.body.dateTimeTo
    })
    .save(function (error, collection) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;

        } else {

            response.status(200).send(collection);

        }
    });

}

exports.deleteCollection = (request, response) => {

    Collection.deleteOne({
        _id: request.query.collectionId
    })
    .exec(function (error, collection) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //collection not found
        if (!collection) {

            return response.status(404).send({

                message: "Collection not found."

            });
        }

        response.status(200).send("Collection successfully removed.");

    });

}