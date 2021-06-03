//require database models
const database = require('../models');
const Post = database.post;
const Product = database.product;
const Contact = database.contact;

//
exports.getContactMessages = (request, response) => {

    Contact.find({
    })
    //populate document references
    .populate('userId', 'username firstName lastName')
    .sort({
        createdAt: 'descending'
    })
    .exec(function (error, contacts) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //no contacts found
        if (!contacts) {

            return response.status(404).send({

                message: "Contacts Not found."

            });
        }

        response.status(200).send(contacts);

    });

};

//handle new new contact message
exports.newContactMessage = (request, response) => {

    new Contact({
        name: request.body.name,
        emailAddress: request.body.emailAddress,
        message: request.body.message,
        userId: request.body.userId
    })
    .save(function (error, contact) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;

        } else {

            response.status(200).send(contact);
        }
    });

}

//handle remove contact message
exports.removeContactMessage = (request, response) => {

    Contact.deleteOne({
        _id: request.query.contactId
    })
    .exec(function (error, contact) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //contact not found
        if (!contact) {

            return response.status(404).send({

                message: "Contact not found."

            });
        }

        response.status(200).send("Contact message successfully removed.");

    });

}