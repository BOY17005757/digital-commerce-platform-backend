//require database models
const database = require('../models');
const User = database.user;

//fetch profile content
exports.profile = (request, response) => {

    //get user info
    User.findOne({
            _id: {
                $in: request.query.userid
            }
        })
        //populate document references
        .populate('roleNames', 'roleName')
        .exec(function (error, profile) {

            //handle error and send 500 response
            if (error) {

                response.status(500).send({

                    message: error

                });

                return;
            }

            //no posts found
            if (!profile) {

                return response.status(404).send({

                    message: "Profile not found."

                });
            }

            response.status(200).send(profile);

        });

}

//administrator access - return users
exports.administratorAccess = (request, response) => {

    //find all users
    User.find({})
        //populate document references
        .populate('roleNames', 'roleName')
        .sort({
            createdAt: 'descending'
        })
        .exec(function (error, user) {

            //handle error and send 500 response
            if (error) {

                response.status(500).send({

                    message: error

                });

                return;
            }

            //no users found
            if (!user) {

                return response.status(404).send({

                    message: "Users Not found."

                });
            }

            response.status(200).send(user);

        });

};