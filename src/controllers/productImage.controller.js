//require database models
const database = require('../models');
const ProductImage = database.productImage;
const multer  = require('multer');
const fs = require('fs');

//handle returning product image
exports.getProductImage = (request, response) => {

    //find product image
    ProductImage.findOne({
        productId: {
            $in: request.query.productId
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

        //no product image found
        if (!product) {

            return response.status(404).send({

                message: "Product Image Not found."

            });
        }

        //set response content type for image
        response.contentType('image/jpeg');

        response.status(200).send(product.base64Image.image.buffer);

    });

};

//handle product image upload
exports.uploadProductImage = (request, response) => {

    //encode image in base64 binary
    var img = fs.readFileSync(request.file.path);
    var encode_image = img.toString('base64');
    
    var finalImg = {

        contentType: request.file.mimetype,
        image:  Buffer.from(encode_image, 'base64')
        
    };

    //check if image exists, if so then update otherwise create new
    ProductImage.findOne({
        productId: {
            $in: request.query.productId
        }
    })
    .exec(function (error, productimage) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({

                message: error

            });

            return;
        }

        //no product image found
        if (!productimage) {

            //create new product image
            new ProductImage({
                productId: request.query.productId,
                base64Image: finalImg
            })
            .save(function (error, productimage) {

                //handle error and send 500 response
                if (error) {

                    response.status(500).send({

                        message: error

                    });

                    return;
                    
                } else {

                    response.status(200).send(`Product image uploaded. _id: ${request.query.productId}`);

                }
            });

        } else {

            //update existing product image
            ProductImage.findOneAndUpdate({
                productId: {
                    $in: request.query.productId
                }

            }, {
                base64Image: finalImg
            },
            function (error, product) {

                //handle error and send 500 response
                if (error) {
        
                    response.status(500).send({
        
                        message: error
        
                    });
        
                    return;
        
                } else {
        
                    response.status(200).send(`Product image updated. _id: ${request.query.productId}`);

                }

            });

        }

    });

}