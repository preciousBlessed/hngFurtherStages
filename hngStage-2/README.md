# My CRUD API HNG-Internship Version

## Content

- Introduction
- UML Documentation
- Request/Response Formats
- Setup Instructions
- Sample API Usage
- Major Packages
- Contributors

## Introduction

This is a simple CRUD API implementation with nodejs and express. It is intended to serve as the second stage task for the HNG X internship program. This is basically a REST API capable of CRUD operations on a "person" resource, interfacing with the MongoDB (whether local or on MongoBD Atlas). This API can dynamically handle parameters, such as adding or retrieving a person by name. The development is accompanied with a simple UML diagram to represent your system's design and database structure.

## Request and Response Formats

Requests are made to the `/` route of the base url which is be `hostname:port/api`.
`GET` request for 1 user is made to `/api/user_id`.
`GET` request for all users is made to `/api`.
A user can also be gotten by passing in user `fullName` to the `req.body` object.
`POST` request for creating user is made to the `/api` endpoint.
`PUT` or `PATCH` request for Updating user is made to `/api/user_id`.
`DELETE` request for removal of a user is made to `/api/user_id`

Responses are all sent in `JSON` format for each request. 

## Setup Instructions
To begin to test this application, first clone the directory where the `server.js` file resides.
```
git clone url
```
After cloning the directory, install the dependencies on your local system using the command:
```
npm install
```
The package dependencies and dev dependencies will now be installed in your local environment. Run the command to start the application:
```
npm run dev
```
The application starts running and listening on the port defined in `process.env.PORT`. A message will be printed on the console to show that your app is running and has connected to the database.

## Sample API Usage 
Once the application is running, you can perform CRUD operations with `Postman` or `RestClient` in `VisualStudio Code`. The User Schema has the following details
```
{
"fullName" : { type: String, required: true},
"country": { type: String, required: true},
"email" : { type: String, required: true, lowercase: true},
"age" : { type: Number, required: true}
}
```
### Create A User
With the app running, open `Postman` and create a `POST` request to `localhost:port/api`. Set the request body to `JSON` and create a user as follows:
```
{
"fullName" : "Mark Essien",
"country" : "AnyCountry",
"email" : "chooseAnyEmail@host.domain",
"age" : 33
}
```
Send the request and if the user is successful created, you will get a response showing the status and user created.
You can create as many users as you wish!

### Read A User
There are two ways we can read a user in this API. Firstly, by sending a `GET` request to `localhost:port/api/user_id`. 
On `Postman`, send a request to `localhost:port/api/_id_of_mark_essien` and you will successfully fetch the details of User `Mark Essien`.

The Second way is to send a `GET` request to `localhost:port/api` without specifying any `user_id` but in the request body, you can specify:
```
{
"fullName" : "Mark Essien"
}
```
This will query the database for the details of the user with this name.

### Update A User
Here you need to send either a `PUT` or `PATCH` request to the endpoint `localhost:port/api/user_id` with the desired details you need to change specified in the request body for instance for `Mark Essien` let's change his country to Cote de Voir and age to 39. Let's use `RestClient` which is still similar to `Postman`. 
```
PATCH http:localhost:4001/api/1226883929201bdc77 HTTP/1.1
Content-Type : application/json

{
"country" : "Cote de Voir",
"age" : 39
}
```
`Mark Essien's` details will be updated  and you will get a response `JSON` object.

### Delete A User
Here, you send a `DELETE` request to `localhost:port/api/user_id` to delete a user.

## Major Packages
- `dotenv`
- `express`
- `nodemon`
- `body-parser`
- `mongoose`

## Contributors
@ Precious Chukwuezi, 2023

