# user-login-rest-api-nodejs
## About:
This configuration is a backend RESTful API boilerplate with the following pieces:

 - Docker as the container service to isolate the environment.
 - Node.js (Node 14) as the run-time environment to run TypeScript.
 - Express.js as the server framework / controller layer
 - MongoDB as the database layer
 - Mongoose as the "ODM" / model layer

## How to run this application
You will need to first download and install Docker Desktop.
* Navigate the the root folder under the command line.
* Run docker-compose up to start 2 containers:
  - the MongoDB database container
  - the Node.js app container

### Application by default provide the below user:
**username/pwd: user/pwd**

The api can be accessed by rest api ***Post http://localhost:8000/api/login*** with json body
```
{
  "username": "user",
  "pwd": "pwd"
}
```
A JWT token will be returned if username and password are correct.

A user has a maximum of 3 attempts within 5 minutes, otherwise, the user will be locked.

## How to Run Tests
Tests are run outside of the Docker container. Integration tests use an in-memory version of MongoDB and unit tests use the jest framework. You should be able to run `npm install` followed by `npm run test-c` to run everything (assuming you have Node 14 installed on your machine).

## Advantages of this application
* The application authentication follows the design pattern of Spring Security, which is highly readable and maintainable.
* The application can be easily switched from username password login to other login methods like 'email password login' by only rewriting UserDetailsService
* The application can be extended to support multiple login methods, such as both username password and email password login methods, by only rewriting UserDetailsService
* The application can be extended to check more than if a user is locked, such as also to check if a user is expired, by only adding more information in userDetails and adding more checks in the preAuthenticationChecks method in AuthenticationProvider, and different failed responses can be processed centrally in unsuccessfulAuthentication method in auth controller