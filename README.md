# Edgistify Industry Portal
Industry portal for employees


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
  mongoURI: 'YOUR_OWN_MONGO_URI',
  secretOrKey: 'YOUR_OWN_SECRET'
};
 
### Server runs on http://localhost:5000 and client on http://localhost:3000

### AUTHOR
Aishwarya Sharma

