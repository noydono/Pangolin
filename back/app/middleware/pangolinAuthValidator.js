"use strict";

module.exports = (req, res, next) => {
    let hasErrors = false;
    let errors = [];
    pseudoValidator(req.body.username)
    emailValidator(req.body.email)

    if (req.body.isActive === true) {

        passwordValidator(req.body.password)
        ageValidator(req.body.age)
        raceValidator(req.body.race)
        foodValidator(req.body.food)
        familleValidator(req.body.famille)

    }

    if (hasErrors === true) {
        res.status(422).json({
            errors: errors,
        });
    } else {
        next()
    }

    function pseudoValidator(username) {
        const patternPseudo = /^([a-zA-Z0-9-_]{2,36})$/;
        if (!username) {
            errors.push({
                username: "Le pseudo et requis"
            });
            hasErrors = true;
        } else if (patternPseudo.test(username) === false) {
            errors.push({
                username: "Pseudo non valide"
            });
            hasErrors = true;
        }
    };

    function emailValidator(email) {
        const patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!email) {
            errors.push({
                email: "L'email et requis"
            });
            hasErrors = true;
        } else if (patternEmail.test(email) === false) {
            errors.push({
                email: "Email non valide"
            });
            hasErrors = true;
        }
    };

    function passwordValidator(password) {
        const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (!password) {
            errors.push({
                password: "Le password et requis"
            });
            hasErrors = true;
        } else if (
            patternPassword.test(password) === false
        ) {
            errors.push({
                password: "Password non valide"
            });
            hasErrors = true;
        }
    };

    function ageValidator(age) {
        const patternAge = /^[0-9]+$/;
        if (!age) {
            errors.push({
                age: "L'age et requis"
            });
            hasErrors = true;
        } else if (patternAge.test(age) === false) {
            errors.push({
                age: "Age non valide"
            });
            hasErrors = true;
        }
    };

    function raceValidator(race) {
        const patternRace = /^([a-zA-Z0-9-_]{3,36})$/;
        if (!race) {
            errors.push({
                race: "L'espèce et requis"
            });
            hasErrors = true;
        } else if (!race || patternRace.test(race) === false) {
            errors.push({
                race: "Espece non valide"
            });
            hasErrors = true;
        }
    };

    function foodValidator(food) {
        const patternFood = /^([a-zA-Z0-9-_]{4,36})$/;
        if (!food) {
            errors.push({
                food: "La nourriture et requis"
            });
            hasErrors = true;
        } else if (patternFood.test(food) === false) {
            errors.push({
                food: "Nourriture non valide"
            });
            hasErrors = true;
        }
    };

    function familleValidator(famille) {
        const patternFamille = /^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
        if (!famille) {
            errors.push({
                famille: "La famille et requis"
            });
            hasErrors = true;
        } else if (patternFamille.test(famille) === false) {
            errors.push({
                famille: "Famille non valide"
            });
            hasErrors = true;
        }

    };




};