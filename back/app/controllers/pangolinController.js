const PangolinModel = require("../models/PangolinModel"),
    jwt = require("jsonwebtoken"),
    errors = [];

module.exports = {

    register: async (req, res) => {

        const data = req.body;
        const pangolinEmail = await PangolinModel.findEmail(req.body.email);

        if (pangolinEmail.hasErrors === true) {

            res.status(422).json({
                errors: pangolin.errors
            });

        } else {

            let pangolin = new PangolinModel(data);
            pangolin.save((err, pangolin_saved) => {
                /* istanbul ignore if */
                if (err) {
                    console.log(err);
                } else {
                    res.status(201).json({
                        _id: pangolin_saved._id,
                        username: pangolin_saved.username
                    })
                }
            });
            await pangolin.generateAuthToken();
        }

    },

    login: async (req, res) => {

        const pangolin = await PangolinModel.findByCredentials(req.body.email, req.body.password);
        if (pangolin.hasErrors) {
            res.status(422).json({
                errors: pangolin.errors,
            });
        } else {
            const token = await pangolin.generateAuthToken();
            res.status(200).json({
                pangolin: {
                    _id: pangolin._id,
                    username: pangolin.username,
                    email: pangolin.email,
                    created_at: pangolin.created_at,
                    race: pangolin.race,
                    food: pangolin.food,
                    age: pangolin.age,
                    famille: pangolin.famille,
                },
                token,
            });
        }
        
    },

    update: async (req, res) => {

        let data = req.body

        await PangolinModel.findByIdAndUpdate(
            req.params.id, data, {
                new: true,
                omitUndefined: true,
                select:  [
                    "_id",
                    "isValide",
                    "username",
                    "food",
                    "race",
                    "famille"
                ],
            },
            (err, pangolin) => {
                if (err) {
                    res.status(422).json({
                        errors: [{
                            update: "Pangolin introuvable"
                        }],
                    });
                } else {
                    res.status(200).json(pangolin);
                }
            }
        );

    },

    delete: async (req, res) => {

        await PangolinModel.findByIdAndDelete(req.params.id, 
            [
                "_id",
                "isValide",
                "username",
            ],
            (err, pangolin) => {
            if (err) {
                res.status(422).json({
                    errors: [{
                        delete: "Pangolin introuvable"
                    }],
                });
            } else {
                res.status(200).json(pangolin)
            }
        })

    }

};