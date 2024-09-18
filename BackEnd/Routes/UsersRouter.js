const {ensureAuth,isAdmin}= require("../Middlewares/AuthToken");
const UserModels = require("../Models/user");

const router = require("express").Router();

const getAllUsers =async (req,res)=>{
    try {
      const users = await UserModels.find({},{password:0});
    //   console.log(users);
      
      if(!users|| users.length === 0){
        return res.status(404).json({message:"No user found"})
      }
      return res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  }
  

router.get('/data',ensureAuth,isAdmin,getAllUsers)

module.exports = router;
