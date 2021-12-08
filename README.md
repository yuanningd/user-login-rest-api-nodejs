# user-login-rest-api-nodejs
## Tech Stack:
* TypeScript
* ExpressJs
* JWT
* Docker
* Docker compose
* Mongodb
* Joi
* jest


## How to run this application
* Navigate the the root folder under the command line.
* Run docker-compose up, then application and mongodb are both up and running.

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

## Advantages of this application
* The application authentication follows the design pattern of Spring Security, which is highly readable and maintainable.
* The application can be easily switched from username password login to other login methods like 'email password login' by only rewriting UserDetailsService
* The application can be extended to support multiple login methods, such as both username password and email password login methods, by only rewriting UserDetailsService
* The application can be extended to check more than if a user is locked, such as also to check if a user is expired, by only adding more information in userDetails and adding more checks in the preAuthenticationChecks method in AuthenticationProvider, and different failed responses can be processed centrally in unsuccessfulAuthentication method in auth controller