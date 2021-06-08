# Digital Commerce Platform Back End API (digital-commerce-platform-backend)

Handles API requests from the Digital Commerce Platform Front End 

### **Dependencies:**
+ nodejs
+ mongodb
+ bcryptjs
+ body-parser
+ cors
+ express
+ jsonwebtoken
+ mongoose
+ multer
+ react-router-bootstrap
+ uuid

### **Configuration and Setup:**
### Local
+ Install Node
+ Create a MongoDB database using Mongo Atlas (https://www.mongodb.com/cloud/atlas). Alternatively, use non cloud hosted MongoDB database
+ Open **config/database.config.js** and update the mongoAtlasUri connection
+ Open a powershell window within the root directory
+ Run the following command: **npm start**

### Hosted (Heroku)
+ Create Heroku dyno using the Node buildpack
+ Create a MongoDB database using Mongo Atlas (https://www.mongodb.com/cloud/atlas). Alternatively, use non cloud hosted MongoDB database
+ Open **config/database.config.js** and update the mongoAtlasUri connection
+ Connect to GitHub repository, and enable automated deployments
+ Build the dyno, which will run the **npm start** command