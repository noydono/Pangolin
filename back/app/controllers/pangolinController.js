const PangolinModel = require("../models/PangolinModel"),
  jwt = require("jsonwebtoken")


module.exports = {

  register: async (req, res) => {
    const errors = [];
    const data = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      race: req.body.race,
      food: req.body.food,
      age: req.body.age,
      famille: req.body.famille
    };

    const pangolin = await PangolinModel.findEmail(req.body.email);
    if (pangolin.hasErrors) {
      res.status(422).json({
         errors: pangolin.errors
      });
    } else {
      const pangolin = new PangolinModel(data);
      await pangolin.generateAuthToken();
      pangolin.save((err, pangolin_saved) => {
        /* istanbul ignore if */
        if (err) {
          console.log(err);
        } else {
          res.status(201).json()
        }
      });
    }

  },

  login: async (req, res) => {
    const errors = [];
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
    
    let errors = [];
    let data = {
      food: req.body.food,
      race: req.body.race,
      famille: req.body.famille,
      age: req.body.age
    }

    await PangolinModel.findByIdAndUpdate(
      req.params.id, data, {
        new: true,
        omitUndefined: true
      },
      (err, pangolin) => {
        if (err) {
          res.status(422).json({
            errors: [{
              update: "Pangolin introuvable"
            }],
          });
        } else {
          res.status(200).json({
            food: pangolin.food,
            race: pangolin.race,
            famille: pangolin.famille,
            age: pangolin.age
          });
        }
      }
    );
  },

  delete: async (req, res) => {
    await PangolinModel.findByIdAndDelete(req.params.id, {}, (err, pangolin) => {
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