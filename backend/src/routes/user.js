const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

router.get('/me', protect, async (req,res)=>{
  res.json(req.user);
});

router.put('/me', protect, async (req,res)=>{
  const user = await User.findById(req.user._id);
  if(!user) return res.status(404).json({message:'User not found'});
  user.name = req.body.name || user.name;
  if(req.body.password) user.password = req.body.password;
  await user.save();
  res.json({id:user._id,name:user.name,email:user.email});
});

module.exports = router;
