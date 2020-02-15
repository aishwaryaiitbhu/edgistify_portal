# Edgistify Industry Portal
Industry portal for employees built with the MERN stack.

## App features
#### 1. Users can register with their email id and create their own profile
#### 2. They can publish a post, any registered user can look at all of the posts in order and delete his or her own post.


## To run the application locally follow these steps
### Install dependencies for server
npm install

### Install dependencies for client
npm run client-install

### Run the client & server with concurrently
npm run dev

### Run the Express server only
npm run server

### Run the React client only
npm run client


You will need to create a keys_dev.js in the server config folder with

module.exports = {
  mongoURI: 'mongo_db_access_string',
  secretOrKey: 'custom_secret_key'
};
 
### Server runs on http://localhost:5000 and client on http://localhost:3000

### AUTHOR
Aishwarya Sharma

