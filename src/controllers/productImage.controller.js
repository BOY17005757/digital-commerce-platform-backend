//require database models
const database = require('../models');
const Post = database.post;
const Product = database.product;
const ProductImage = database.productImage;
const multer  = require('multer')
const fs = require('fs');

exports.getProductImage = (request, response) => {

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

        //no product found
        if (!product) {

            return response.status(404).send({

                message: "Product Image Not found."

            });
        }

        response.contentType('image/jpeg');

        response.status(200).send(product.base64Image.image.buffer);

    });

};

//handle product image upload
exports.uploadProductImage = (request, response) => {

    var img = fs.readFileSync(request.file.path);
    var encode_image = img.toString('base64');
    
    var finalImg = {

        contentType: request.file.mimetype,
        image:  Buffer.from(encode_image, 'base64')
        
    };

    new ProductImage({
        productId: request.query.productId,
        base64Image: finalImg
    })
    .save(function (error, product) {

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

}