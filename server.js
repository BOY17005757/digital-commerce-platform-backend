//include packages
const express = require('express');
const cors = require('cors');
const application = express();

//set cors hostname & port
var corsParams = {

    // origin: process.env.NODE_ENV === 'production' ? "https://social-link-frontend.herokuapp.com" : "http://localhost:3000"
    origin: "http://localhost:3000"

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

    const orderTypeArray = ['collection', 'delivery'];

    OrderType.estimatedDocumentCount(function (error, count) {

        //no order types exist in mongodb
        if (!error && count === 0) {
        
            //loop order type array
            orderTypeArray.forEach(function(element) {

                //create order type
                new OrderType({

                    name: element

                }).save(function (error) {

                    //handle error
                    if (error) {

                        console.log("error", error);

                    } else {

                        console.log(element," added to order type collection.");

                    }
                });
            });

        }

    });

}

// //define api routes
require('./src/routes/authentication.routes')(application);
require('./src/routes/user.routes')(application);
require('./src/routes/product.routes')(application);
require('./src/routes/shoppingcart.routes')(application);
// require('./src/routes/friends.routes')(application);
// require('./src/routes/posts.routes')(application);