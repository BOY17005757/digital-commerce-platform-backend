//include packages
const database = require('../models');
const roleNames = database.roleNames;

//include database models
const User = database.user;
const Role = database.role;

var roleCheck;

//validate duplicates on signup request
function validateDuplicateUsernameEmail(request, response, next) {

    //validate username
    //return a single document from a collection
    User.findOne({
        username: request.body.username
    }).exec(function (error, user) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({
                message: error
            });
            return;

        }

        //username exists
        if (user) {

            response.status(500).send({
                message: "Username already exists."
            });
            return;

        }

        //validate email address
        User.findOne({
            emailAddress: request.body.emailAddress
        }).exec(function (error, emailAddress) {

            //handle error and send 500 response
            if (error) {

                response.status(500).send({
                    message: error
                });
                return;

            }

            //username exists
            if (emailAddress) {

                response.status(500).send({
                    message: "Email Address already exists."
                });
                return;

            }

            next();
        });

    });

};

//validate existing roles
function validateRoles(request, response, next) {

    //reset roleCheck variable
    roleCheck = null;

    if (request.body.roleNames) {

        //loop through roleNames passed in request
        request.body.roleNames.forEach(function (currentValue, currentIndex, listObj) {

            //check roleNames against predefined roles
            if (!roleNames.includes(currentValue)) {

                roleCheck = currentValue;

            }
        });
    }

    //roleCheck value populated - throw 400 error
    if (roleCheck) {

        response.status(400).send({

            message: `Role '${roleCheck}' does not exist.`

        });

        return;
    }

    next();

};

const validateSignUp = {

    validateDuplicateUsernameEmail,
    validateRoles

}

module.exports = validateSignUp;