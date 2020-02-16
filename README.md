# Sales Nav RESTful API
> ### Node (Express) app providing an API to generate Opportunities given a list of sales reps and companies. The API matches companies and sales reps with the aim of reducing distance between each company and sales rep.

# Getting started
## To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- `npm start` to start the local server

## To run the tests
````
npm run tests
````

# Code Overview
## Dependencies
- [express](https://www.npmjs.com/package/express) - The server for handling and routing HTTP requests
- [morgan](https://github.com/expressjs/morgan) - For logging to the console
- [http-errors](https://www.npmjs.com/package/http-errors) - To generate simple http error pages

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server. It also requires the routes we'll be using in the application.
- `data/` - This folder contains test data for our unit tests.
- `routes/` - This folder contains the route definitions for our API.
- `helpers/` - This folder contains the core functionality of the end points

# REST API
The REST API to Sales Nav is described below

## Get Opportunities
### Request
````
GET /opportunities/
````
````
curl -i -H 'Accept: application/json' http://localhost:3000/opportunities/
````

### Response
````
HTTP/1.1 200 OK
Date: Sun, 16 Feb 2020 12:36:30 GMT
Status: 200 OK
Connection: close
Content-Type: application/json
Content-Length: 2

Body:
[
  {
    "representative": {
      "name": "Rep 6",
      "email": "rep6@salesforce.com",
      "phone": "00000006",
      "location": "43.489317, -116.403672",
      "distance": 21.75
    },
    "company": {
      "name": "ALBERTSONS COS.",
      "address": "250 PARKCENTER BOULEVARD",
      "contact": {
        "name": "Daniel Jayne",
        "email": "JayneADaniel@jourrapide.com",
        "phone": "(07) 4961 5112"
      }
    }
  }
]
````