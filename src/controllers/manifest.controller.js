//require database models
const database = require('../models');
const Manifest = database.manifest;

//handle returning manifest
exports.getManifest = (request, response) => {

    Manifest.findOne({
    },'-_id content')
    .exec(function (error, manifest) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //no manifest found
        if (!manifest) {

            return response.status(404).send({

                message: "Manifest Not found."

            });
        }

        response.status(200).send(manifest.content);

    });

}

//handle edit manifest
exports.editManifest = (request, response) => {

    //check manifest exists
    Manifest.findOne({
    })
    .exec(function (error, manifest) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //no manifest found
        if (!manifest) {

            return response.status(404).send({

                message: "Manifest Not found."

            });
        }

        //update manifest
        Manifest.updateOne({
            _id: manifest._id
        }, {
            content: request.body.content
        })
        .exec(function (error, product) {
    
            //handle error and send 500 response
            if (error) {
    
                response.status(500).send({
    
                    message: `Manifest not found. ${error}`
    
                });
    
                return;
                
            } else {
    
                response.status(200).send("Manifest edited successfully.");
    
            }
        });

    });

}