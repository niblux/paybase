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
- Use the mongo shell to upload the provided json files using the following command :
 The files required are _speakers.json and _talks.json

`mongoimport --db paybase --collection conference --file /Users/Nabsy/Downloads/_talks.json --jsonArray`

A script using nodemon has been created simply run `npm start` to start project

You will be presented with a login page, you will need to register to login.

Click the registration link and provide and email address , username and password.

After registering you will redirected back to the login page.

Login and you will be to view the talks and speakers and RSVP to talks by double clicking the RSVP of the chosen talk.

```
until finished
```

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Authors

* **Nabil Elidrissi** - *Initial work* - (https://github.com/niblux)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

