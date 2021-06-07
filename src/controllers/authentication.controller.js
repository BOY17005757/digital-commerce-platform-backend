//require jwt secret key
const configuration = require('../config/authentication.config');

//require database models
const database = require('../models');
const User = database.user;
const Role = database.role;
const Friend = database.friend;

//java web token & bcrypt password-hashing
var jsonWebToken = require('jsonwebtoken');
var bcryptHash = require('bcryptjs');
// const Post = require('../models/mongoose.post.model');

//handle signup
exports.signUp = (request, response) => {

    const user = new User({

        firstName: request.body.firstName,
        lastName: request.body.lastName,
        username: request.body.username,
        emailAddress: request.body.emailAddress,
        password: bcryptHash.hashSync(request.body.password, 8)

    });

    //save user to mongodb
    user.save(function (error, user) {

        //handle error and send 500 response
        if (error) {

            response.status(500).send({
                message: error
            });

            return;
        }

        if (request.body.roleNames) {

            //find all documents in a collection that match query
            Role.find(
                    //$in - matches any of the values specified in an array
                    {
                        roleName: {
                            $in: request.body.roleNames
                        }
                    })
                .exec(function (error, roleNames) {

                    //handle error and send 500 response
                    if (error) {

                        response.status(500).send({
                            message: error
                        });

                        return;
                    }

                    user.roleNames = roleNames.map(role => role._id);
                    user.save(function (error) {

                        //handle error and send 500 response
                        if (error) {

                            response.status(500).send({
                                message: error
                            });

                            return;
                        }

                        //send successful response
                        response.status(200).send({

                            username: user.username,
                            message: "User signed up successfully."

                        });
                    });

                });

        } else {

            //no roleName passed in request header - set default user
            Role.findOne({
                    roleName: "customer"
                })
                .exec(function (error, roleName) {

                    if (error) {

                        response.status(500).send({
                            message: error
                        });

                        return;
                    }

                    user.roleNames = [roleName._id];

                    user.save(error => {

                        if (error) {

                            response.status(500).send({
                                message: error
                            });

                            return;
                        }

                        response.status(200).send({

                            username: user.username,
                            message: "User signed up successfully."

                        });
                    });
                });

        }

    });

};

//handle sign in
exports.signIn = (request, response) => {

    //find one document in a collection that matches query
    User.findOne({
            emailAddress: request.body.emailAddress
        })
        //allow access to password field
        .select('+password')
        //populate document references
        .populate('roleNames', 'roleName')
        .exec(function (error, user) {

            //handle error and send 500 response
            if (error) {

                response.status(500).send({
                    message: error
                });

                return;
            }

            //not a valid user
            if (!user) {

                return response.status(404).send({
                    message: "User Not found."
                });

            }

            //validate password
            var passwordValid = validatePassword(request.body.password, user.password);

            if (!passwordValid) {

                //throw 401 unauthorised response
                return response.status(401).send({

                    accessToken: null,
                    message: "Invalid Password."

                });
            }

            //get JSON Web Token
            var token = generateJWT(user);

            var authorities = [];

            //loop through roles and append authorities
            user.roleNames.forEach(function (currentValue, currentIndex, listObj) {

                authorities.push(currentValue.roleName);

            });

            //return 200 OK response
            response.status(200).send({

                id: user._id,
                username: user.username,
                emailAddress: user.emailAddress,
                roleNames: authorities.toString(),
                accessToken: token

            });

        });
};

//handle deletion of user, posts and friends
exports.removeUser = (request, response) => {

    User.deleteOne({
            _id: request.query.userId
        })
        .exec(function (error, user) {

            //handle error and send 500 response
            if (error) {

                response.status(500).send({

                    message: error

                });

                return;
            }

            //user not found
            if (!user) {

                return response.status(404).send({

                    message: "User not found."

                });
            }

            response.status(200).send("User successfully removed.");

            //TODO: remove all associated orders & shopping cart

        });

}

//validate password using bcrypt
function validatePassword(requestPassword, password) {

    passwordValid = bcryptHash.compareSync(requestPassword, password);

    return passwordValid;
}

//generate JWT
function generateJWT(user) {

    token = jsonWebToken.sign({
        id: user.id,
        username: user.username
    }, configuration.secret, {

        expiresIn: 14400 //4 hours

    });

    return token;
}