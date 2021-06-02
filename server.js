//include packages
const express = require('express');
const cors = require('cors');
const application = express();

//set cors hostname & port
var corsParams = {

    origin: process.env.NODE_ENV === 'production' ? "https://digital-commerce-platform.herokuapp.com" : "http://localhost:3000"

};

//set listening port based on production or development environment
// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;
const port = 8080;

//use cors parameters
application.use(cors(corsParams));

/*parse requests*/
//content-type - application/json
application.use(express.json());

//content-type - application/x-www-form-urlencoded
application.use(express.urlencoded({

    extended: true

}));

//listen for requests
application.listen(port, function () {

    console.log(`Sever running on port ${port}`);

});

application.get("/", function(request, response) {

    response.json({ message: "digital-commerce-platform-backend." });

});


//require database configuration
const databaseConfig = require('./src/config/database.config');

//require database models
const database = require('./src/models');
const Role = database.role;
const OrderType = database.ordertype;
const Manifest = database.manifest;

//connect to mongodb
database.mongoose.connect(databaseConfig.mongoAtlasUri, {

        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false

    })
    .then(function () {

        console.log("Successfully connected to MongoDB.");
        initialise();

    })
    .catch(function (error) {

        console.log("Connection error.", error);
        process.exit();

    });

//called on successful connection to mongodb - create collections
function initialise() {

    const roleArray = ['customer', 'administrator'];

    Role.estimatedDocumentCount(function (error, count) {

        //no roles exist in mongodb
        if (!error && count === 0) {

            //loop role array
            roleArray.forEach(function(element) {

                //create user role
                new Role({

                    roleName: element

                }).save(function (error) {

                    //handle error
                    if (error) {

                        console.log("error", error);

                    } else {

                        console.log(element," added to role collection.");

                    }
                });
            });
        }

    });

    Manifest.estimatedDocumentCount(function (error, count) {

        const ManifestJson = {
            "theme_color": "#4f46e5",
            "background_color": "#1f2937",
            "display": "standalone",
            "scope": `${corsParams.origin}/`,
            "start_url": `${corsParams.origin}/index.html`,
            "name": "Digital Commerce Platform",
            "short_name": "Digital Commerce Platform",
            "icons": [
                {
                    "src": `${corsParams.origin}/icon-192x192.png`,
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": `${corsParams.origin}/icon-256x256.png`,
                    "sizes": "256x256",
                    "type": "image/png"
                },
                {
                    "src": `${corsParams.origin}/icon-384x384.png`,
                    "sizes": "384x384",
                    "type": "image/png"
                },
                {
                    "src": `${corsParams.origin}/icon-512x512.png`,
                    "sizes": "512x512",
                    "type": "image/png"
                }
            ]
        };

        //manifest does not exist in mongodb
        if (!error && count === 0) {

            //create manifest
            new Manifest({
                fileName: 'manifest.json',
                content: ManifestJson
            }).save(function (error) {

                //handle error
                if (error) {

                    console.log("error", error);

                } else {

                    console.log("Manifest added to collection.");

                }
            });

        }

    });

}

// //define api routes
require('./src/routes/authentication.routes')(application);
require('./src/routes/user.routes')(application);
require('./src/routes/product.routes')(application);
require('./src/routes/shoppingcart.routes')(application);
require('./src/routes/order.routes')(application);
require('./src/routes/collection.routes')(application);
require('./src/routes/manifest.routes')(application);