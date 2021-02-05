const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    morgan = require('morgan'),
    ROUTER = require("./app/router.js"),
    cors = require("cors"),
    corsOption = {
        origin: "http://localhost:4200"
    }

    /* istanbul ignore next */
if (process.env.NODE_ENV === 'production') {

    const dotenv = require("dotenv").config({
        path: '.env'
    })

} else if (process.env.NODE_ENV === 'developpement') {

    const dotenv = require("dotenv").config({
        path: '.env.dev'
    })
    app.use(morgan('tiny'))

} else if (process.env.NODE_ENV === 'test') {

    const dotenv = require("dotenv").config({
        path: '.env.test'
    })
}

mongoose.connect(
    process.env.MONGOURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => {
        /* istanbul ignore if */
        // j'ignore le if car je ne sais pas comment je peut ecrire un test pour générer une erreur
        if (err) {
            console.log("****** problèmes de connexion à la base de données ******");
        } else {
            console.log("****** connecté à la basse de donées ******");
        }
    }
);



app.use(cors(corsOption))
app.use(methodOverride('X-HTTP-Method-Override'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use("/api", ROUTER);


app.listen(process.env.PORT, (err) => {
    /* istanbul ignore if */
    if (err) {
        console.log(err);
    } else {
        console.log("NODE_ENV = "+ process.env.NODE_ENV);
        console.log("api tourne sur le port : " + process.env.PORT );
    }
})
module.exports = app;