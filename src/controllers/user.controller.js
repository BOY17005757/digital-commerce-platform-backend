//require database models
const database = require('../models');
const Post = database.post;
const User = database.user;
const Friend = database.friend;

//public access - return 200 OK response
exports.publicAccess = (request, response) => {

    response.status(200).send("Public Content.");

};

//user feed (posts)
// exports.userFeed = (request, response) => {

//     //get current users feed only
//     if (request.query.friends == 0) {

//         Post.find({
//                 userId: request.query.userId
//             })
//             //populate document references
//             .populate('userId', 'username')
//             .sort({
//                 createdAt: 'descending'
//             })
//             .exec(function (error, post) {

//                 //handle error and send 500 response
//                 if (error) {

//                     response.status(500).send({
//                         message: error
//                     });
//                     return;

//                 }

//                 //no posts found
//                 if (!post) {

//                     return response.status(404).send({
//                         message: "Posts Not found."
//                     });

//                 }

//                 response.status(200).send(post);

//             });

//         //get friends feed
//     } else {

//         //get friends
//         Friend.find(
//                 //$or - performs a logical OR operation
//                 //$in - matches any of the values specified in an array
//                 {
//                     status: 1,
//                     $or: [
//                         //query parameter passed in request
//                         {
//                             sourceUserId: {
//                                 $in: request.query.userId
//                             }
//                         },
//                         {
//                             targetUserId: {
//                                 $in: request.query.userId
//                             }
//                         }
//                     ]
//                 })
//             .exec(function (error, friendRequests) {

//                 //handle error and send 500 response
//                 if (error) {

//                     response.status(500).send({

//                         message: error

//                     });

//                     return;
//                 }

//                 var actualFriends = [];

//                 //no friends found
//                 if (Object.keys(friendRequests).length === 0) {

//                     //push current user to array - ensures current users posts are fetched
//                     actualFriends.push(request.query.userId);

//                     //friends found
//                 } else {

//                     //loop friends and push to array - check source and target
//                     friendRequests.forEach(function (element) {

//                         if (element.sourceUserId.toString() === request.query.userId) {

//                             actualFriends.push(element.targetUserId.toString());

//                         }

//                         if (element.targetUserId.toString() === request.query.userId) {

//                             actualFriends.push(element.sourceUserId.toString());

//                         }
//                     });

//                     //push current userid to array - ensures current users posts are fetched
//                     actualFriends.push(request.query.userId);

//                 }

//                 //find posts from friend array
//                 Post.find({})
//                     .where('userId').in(actualFriends)
//                     //populate document references
//                     .populate('userId', 'username')
//                     .sort({
//                         createdAt: 'descending'
//                     })
//                     .exec(function (error, post) {
//                         //handle error and send 500 response
//                         if (error) {

//                             response.status(500).send({

//                                 message: error

//                             });

//                             return;
//                         }

//                         //no posts found
//                         if (!post) {

//                             return response.status(404).send({

//                                 message: "Posts Not found."

//                             });
//                         }

//                         response.status(200).send(post);

//                     });

//             });

//     }

// };

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

// exports.getSearch = (request, response) => {

//     //user search via username query param
//     if (request.query.username) {

//         User.find({
//                 //regex to find username matching
//                 username: {
//                     $regex: request.query.username,
//                     //case-insensitive search
//                     $options: "i"
//                 }
//             })
//             .exec(function (error, user) {

//                 //handle error and send 500 response
//                 if (error) {

//                     response.status(500).send({

//                         message: error

//                     });
//                 }

//                 //no users found
//                 if (Object.keys(user).length === 0) {

//                     return response.status(404).send({

//                         message: "No users found."

//                     });
//                 } else {

//                     response.status(200).send(user);

//                 }

//             });

//         //no username in query param
//     } else {

//         //get friends
//         Friend.find(
//                 //status 1 - accepted friend
//                 //$or - performs a logical OR operation
//                 //$in - matches any of the values specified in an array
//                 {
//                     status: 1,
//                     $or: [
//                         //query parameter passed in request
//                         {
//                             sourceUserId: {
//                                 $in: request.userId
//                             }
//                         },
//                         {
//                             targetUserId: {
//                                 $in: request.userId
//                             }
//                         }
//                     ]
//                 })
//             .exec(function (error, friendRequests) {

//                 //handle error and send 500 response
//                 if (error) {

//                     response.status(500).send({

//                         message: error

//                     });

//                     return;
//                 }

//                 var actualFriends = [];

//                 //no friends found
//                 if (Object.keys(friendRequests).length === 0) {

//                     //push current user to array - ensures current users posts are fetched
//                     actualFriends.push(request.userId);

//                     //friends found
//                 } else {

//                     //loop friends and push to array - check source and target
//                     friendRequests.forEach(function (element) {

//                         if (element.sourceUserId.toString() === request.userId) {

//                             actualFriends.push(element.targetUserId.toString());

//                         }

//                         if (element.targetUserId.toString() === request.userId) {

//                             actualFriends.push(element.sourceUserId.toString());

//                         }
//                     });

//                     //push current userid to array - ensures current users posts are fetched
//                     actualFriends.push(request.userId);

//                 }

//                 //find posts from friend array where content matches - case insensitive regex find
//                 Post.find({
//                         content: {
//                             "$regex": request.query.content,
//                             "$options": "i"
//                         }
//                     })
//                     .where('userId').in(actualFriends)
//                     //populate document references
//                     .populate('userId', 'username')
//                     .sort({
//                         createdAt: 'descending'
//                     })
//                     .exec(function (error, post) {

//                         //handle error and send 500 response
//                         if (error) {

//                             response.status(500).send({

//                                 message: error

//                             });

//                             return;
//                         }

//                         //no posts found
//                         if (Object.keys(post).length === 0) {

//                             return response.status(404).send({

//                                 message: "Posts Not found."

//                             });
//                         }

//                         response.status(200).send(post);

//                     });

//             });

//     }

// }

//administrator access - return 200 OK response
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

//moderator access - return 200 OK response
// exports.moderatorAccess = (request, response) => {

//     response.status(200).send("Moderator Content.");

// };