//include packages
const jsonWebToken = require('jsonwebtoken');
const configuration = require('../config/authentication.config');
const database = require('../models');

//include database models
const User = database.user;
const Role = database.role;

var roleCheck;

//validate jwt
function validateToken(request, response, next) {

    //get x-access-token from request header
    var token = request.headers["x-access-token"];

    //no x-access-token provided in header
    if (!token) {

        //throw 403 access forbidden response
        response.status(403).send({
            message: "No token provided."
        });
        return;

    }

    //verify token using secret key
    jsonWebToken.verify(token, configuration.secret, (error, decoded) => {

        if (error) {

            //throw 401 unauthorised response
            response.status(401).send({
                message: "Unauthorised."
            });
            return;

        }

        //decoded userid
        request.userId = decoded.id;

        next();
    });
};

//validate administrator
function validateAdministrator(request, response, next) {

    //check valid userid
    User.findById(request.userId).exec(function (error, user) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({
                message: error
            });
            return;

        }

        //find all documents in a collection that match query
        Role.find({
                //$in - matches any of the values specified in an array
                _id: {
                    $in: user.roleNames
                }
            },
            (error, roleNames) => {

                //handle error and send 500 response
                if (error) {
                    response.status(500).send({
                        message: error
                    });
                    return;

                }

                //loop through user roleNames
                roleNames.forEach(function (currentValue, currentIndex, listObj) {

                    roleCheck = false;

                    //check for administrator role
                    if (currentValue.roleName === "administrator") {

                        roleCheck = false;
                        next();
                        return;

                    } else {

                        roleCheck = true;

                    }
                });

                //administrator role not found
                if (roleCheck) {

                    //throw 403 access forbidden response
                    response.status(403).send({
                        message: "Administrator role required."
                    });
                    return;

                }

            });

    });
}

//validate moderator
function validateModerator(request, response, next) {

    //check valid userid
    User.findById(request.userId).exec(function (error, user) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({
                message: error
            });
            return;

        }

        //find all documents in a collection that match query
        Role.find({
                //$in - matches any of the values specified in an array
                _id: {
                    $in: user.roleNames
                }
            },
            (error, roleNames) => {

                //handle error and send 500 response
                if (error) {

                    response.status(500).send({
                        message: error
                    });
                    return;

                }

                //loop through user roleNames
                roleNames.forEach(function (currentValue, currentIndex, listObj) {

                    roleCheck = false;

                    //check for administrator role
                    if (currentValue.roleName === "moderator") {

                        roleCheck = false;
                        next();
                        return;

                    } else {

                        roleCheck = true;

                    }
                });

                //administrator role not found
                if (roleCheck) {

                    //throw 403 access forbidden response
                    response.status(403).send({
                        message: "Moderator role required."
                    });
                    return;

                }

            });

    });
}

const authenticationJwt = {

    validateToken,
    validateAdministrator,
    validateModerator

};

module.exports = authenticationJwt;