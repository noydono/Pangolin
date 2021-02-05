const express = require('express'),
    router = express.Router();

const pangolinController = require("./controllers/pangolinController"),
    friendController = require("./controllers/friendController")

const registerValidator = require("./middleware/registerValidator"),
    loginValidator = require("./middleware/loginValidator"),
    updateValidator = require("./middleware/updateValidator")

router.route("/register")
    .post(registerValidator, pangolinController.register);

router.route("/login")
    .post(loginValidator, pangolinController.login);

router.route("/update/:id")
    .put(updateValidator,pangolinController.update);

router.route("/delete/:id")
    .delete(pangolinController.delete);

router.route("/friend")
    .get(friendController.getAll)

router.route("/friend/:id")
    .get(friendController.getMyFriend)
    .put(friendController.deleteMyFriend)
    .post(friendController.addFriend);

module.exports = router