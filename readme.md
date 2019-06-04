# Project Title

Event Driven Serverless REST-API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

For production, you will need to add your AWS credentials and remove the serverless offline plugin from serverless.yml file then deploy.

This project has two main parts:
*   Event source
*   REST API
which communicate through an event gateway.

### Prerequisites

* [NodeJs](https://nodejs.org/en/download/)
* [Serverless Event Gateway](https://github.com/serverless/event-gateway)
* Java Runtime Environment ([JRE](https://www.java.com/download/)) version 6.x or newer


### Installing

Install the npm dependencies by running the command below, in both of the folders (event-source & locations-api)

```
npm install
```
I uploaded my own enviroment variables file (with fake data) to enable you test the application smoothly ... Please don't do what I did, in a work environment

Run this command below in the locations-api folder to start the DynamoDB locally

```
sh start-dynamodb.sh
```
Once done, Set up & Run a local version of the event gateway by following the instructions [HERE](https://github.com/serverless/event-gateway#running-the-event-gateway)

Go to event-source folder and run the commands below individually:
- The first command will create an event type and register a function on the event gateway
- The second command will start serverless offline

```
npm run event
npm run start
```

Go to locations-api folder and run the commands below individually:
- The first command will register a function and subscribe it to an event on the event gateway
- The second command will create the DynamoDB table and populate it with some dummy data
- The third command will start serverless offline

```
npm run event
npm run seed
npm run start
```

Now, you are GOOD TO GO !

You can test with the following endpoints in [Postman](https://www.getpostman.com/downloads/) or any API tester of your choice
```
POST localhost:3001/upload

GET localhost:3000/locations

GET localhost:3000/locations/{location_name}

```

## Roadmap
* Create a container version of the project to reduce the installation process hurdle

## Author

* **Dominic Idagu** - [didagu](https://github.com/didagu)

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
