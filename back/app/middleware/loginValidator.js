"use strict";

module.exports = (req, res, next) => {
  let hasErrors = false;
  let errors = [];
  emailValidator(req.body.email)
  passwordValidator(req.body.password)

  if (hasErrors === true) {

    res.status(422).json({
      errors: errors,
    });
  } else {

    next()
  }

 

  function emailValidator(email) {
    const patternEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || patternEmail.test(email) === false) {
      errors.push({
        email: "Email non recevable ou non valid"
      });
      hasErrors = true;
    }
  };

  function passwordValidator(password) {
    const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (
      !password ||
      patternPassword.test(password) === false
    ) {
      errors.push({
        password: "Password non recevable ou non valid"
      });
      hasErrors = true;
    }
  };

};