# Paybase Technical Test

Imaginery backend api for conference talks.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

You will need to install Node JS and the npm package manager.

### Installing

A step by step series of examples that tell you how to get a development env running

What things you need to install the software and how to install them
- Clone the project and run `npm install` to install necessary packages. 
- Download and install MongoDB and setup a local database. 

- Create a database : you will be asked to provide a "database name" and a "collection name"

- Name the database "paybase" and the collection "conference"

- You will need to create three collections to setup the database for the api requests named :
	
* attendees
* speakers
* talks

Once you have the above collections follow the instructions below to uplaod the required dummy data.

- Use the mongo shell to upload the provided json files using the following command :
 The files required are _speakers.json and _talks.json

`mongoimport --db paybase --collection conference --file /Users/Nabsy/Downloads/_talks.json --jsonArray`

A script using nodemon has been created simply run `npm start` to start project

You will be presented with a login page, you will need to register to login.

Click the registration link and provide and email address , username and password.

After registering you will redirected back to the login page, you will be asked to enter the "email" and "password" your created when registering.

Once you have Logged in you will be to view the talks and speakers and RSVP to talks by double clicking the RSVP of the chosen talk.


## Authors

* **Nabil Elidrissi** - *Initial work* - (https://github.com/niblux)


