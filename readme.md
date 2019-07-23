# Register API - Delivery APP
API to support the register for Delivery app, created using NodeJs and Sequelize ORM with Postgresql.

## Table of contents
* [Introduction](#introduction)
* [Features](#features)
* [Technologies](#technologies)
* [Setup](#setup)

## Introduction
This app is a delivery app that will allow users to buy products from restaurants and will assign a deliverer for its order. The architecture of this project is based on microservices, this registration module, allows users to register to the app and pushes its data to the database.

## Features
This API allows the caller to do:

- [x] CRUD for finalUsers
- [x] CRUD for deliverers
- [x] CRUD for suppliers
- [x] Check if user is created using its credentials
- [ ] Users can add its location

All this actions can be performed using this API, but you can only call them if you have the right permissions via the auth microservice.


## Technologies
This project is created with:

* NPM 3.5.2
* NodeJs 8.10
* Express 4.17.1
* Sequelize 5.8.10
* PostgreSQL

For more details of the packages and dependencies used in this service, please go to the 'package.json' on this repo.

## Setup
* To run this project you will need NPM to install the node dependencies and run the dev environment.
* You will need to have postgreSQL to create the databases.
* To install the dependencies you need to run 'npm install' inside the main folder.
* Create the postgreSQL database, can use the command 'createdb users'.
* run sequelize db:migrate to run migrations.
* To run the development environment in localhost just run 'npm run dev'.
* If you want to run a production environment you have to create it in the 'package.json' scripts, sepecify the variables in the .env file and change the models 'index.js'.

## API calls
If you want more information about how to call the API, this is the postman repository: https://www.getpostman.com/collections/03013e5a9d7e30e1b3a5 in the register_ms section