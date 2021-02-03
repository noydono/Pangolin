const express = require('express'),
    router = express.Router();

const pangolinController = require("./controllers/pangolinController"),
    friendController = require("./controllers/friendController")

const Validator = require("./middleware/pangolinAuthValidator"),
    loginValidator = require("./middleware/pangolinLoginValidator")
updateValidator = require("./middleware/pangolinUpdateValidator")


router.route("/register")
    .post(Validator, pangolinController.register);

router.route("/login")
    .post(loginValidator, pangolinController.login);

router.route("/update/:id")
    .put(updateValidator,pangolinController.update);

router.route("/delete/:id")
    .delete(pangolinController.delete);

router.route("/friend")
    .get(friendController.getAll);

router.route("/friend/:id")
    .get(friendController.getFriend)
    .put(friendController.deleteFriend)
    .post(friendController.addFriend);





module.exports = router