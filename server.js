//include packages
import sslRedirect from 'heroku-ssl-redirect';
const express = require('express');
const cors = require('cors');
const application = express();

//set cors hostname & port
var corsParams = {

    origin: process.env.NODE_ENV === 'production' ? "https://digital-commerce-platform.herokuapp.com" : "http://localhost:3000"

};

//set listening port based on production or development environment
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8080;

// enable ssl redirect
application.use(sslRedirect());

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
                "src": `${corsParams.origin}/icon-512x512.png`,
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any maskable"
              },
              {
                "src": `${corsParams.origin}/favicon.ico`,
                "sizes": "64x64 32x32 24x24 16x16",
                "type": "image/x-icon"
              },
              {
                "src": `${corsParams.origin}/android-icon-192x192.png`,
                "type": "image/png",
                "sizes": "192x192"
              },
              {
                "src": `${corsParams.origin}/apple-icon-180x180.png`,
                "type": "image/png",
                "sizes": "180x180"
              },
              {
                "src": `${corsParams.origin}/apple-icon-152x152.png`,
                "type": "image/png",
                "sizes": "152x152"
              },
              {
                "src": `${corsParams.origin}/apple-icon-144x144.png`,
                "type": "image/png",
                "sizes": "144x144"
              },
              {
                "src": `${corsParams.origin}/apple-icon-120x120.png`,
                "type": "image/png",
                "sizes": "120x120"
              },
              {
                "src": `${corsParams.origin}/apple-icon-114x114.png`,
                "type": "image/png",
                "sizes": "114x114"
              },
              {
                "src": `${corsParams.origin}/favicon-96x96.png`,
                "type": "image/png",
                "sizes": "96x96"
              },
              {
                "src": `${corsParams.origin}/apple-icon-76x76.png`,
                "type": "image/png",
                "sizes": "76x76"
              },
              {
                "src": `${corsParams.origin}/apple-icon-72x72.png`,
                "type": "image/png",
                "sizes": "72x72"
              },
              {
                "src": `${corsParams.origin}/apple-icon-60x60.png`,
                "type": "image/png",
                "sizes": "60x60"
              },
              {
                "src": `${corsParams.origin}/apple-icon-57x57.png`,
                "type": "image/png",
                "sizes": "57x57"
              },
              {
                "src": `${corsParams.origin}/favicon-32x32.png`,
                "type": "image/png",
                "sizes": "32x32"
              },
              {
                "src": `${corsParams.origin}/favicon-16x16.png`,
                "type": "image/png",
                "sizes": "16x16"
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