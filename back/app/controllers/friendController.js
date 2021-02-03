const PangolinModel = require("../models/PangolinModel")

module.exports = {

  getAll: (req,res) =>{
    PangolinModel.find({},["_id","username","food","race","famille"],(err, pangolin)=>{
      res.status(200).json(pangolin)
    })
  },

  getFriend: async (req,res)=>{

   await PangolinModel
    .findByIdAndUpdate(req.params.id)
    .populate({
      path: 'Friend',
    })
    .exec((err,friends)=>{
      if(err){
        res.status(422).json({
          errors : [{
            getFriend:"l'une ou les deux id ne sont pas correct"
          }]
        })
      }else{
        res.status(200).json(friends)
      }
      
    })
  },

  addFriend: async (req, res) => {
    PangolinModel.findByIdAndUpdate(req.params.id, {
      $push: {
        friends: {
          _id:req.body._id,
          username:req.body.username
        }
      }
    }, {
      new: true,
    }, (err, pangolin) => {
      if(err){
        res.status(422).json({
          errors : [{
            addFriend:"l'une ou les deux id ne sont pas correct"
          }]
        })
      }else{
        res.status(200).json()
      }
    })
  },

  deleteFriend:async(req,res) =>{
  await PangolinModel.findByIdAndUpdate(req.params.id, {
      $pull: {
        friends: {
          _id:req.body._id,
          username:req.body.username
        }
      }
    }, {
      new: true,
    }, (err, pangolin) => {
      if(err){
        res.status(422).json({
          errors : [{
            removeFriend:"l'une ou les deux id ne sont pas correct"
          }]
        })
      }else{
        res.status(200).json(pangolin)
      }
    })
  }

};