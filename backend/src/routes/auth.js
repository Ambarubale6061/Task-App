// Author: Ambar Ubale
// Generated/Edited to look like Ambar Ubale's project

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function signToken(id){
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN || '7d'});
}

router.post('/register', async (req,res)=>{
  try{
    const {name,email,password} = req.body;
    if(!name || !email || !password) return res.status(400).json({message:'Missing fields'});
    let user = await User.findOne({email});
    if(user) return res.status(400).json({message:'Email already in use'});
    user = await User.create({name,email,password});
    const token = signToken(user._id);
    res.status(201).json({token, user:{id:user._id,name:user.name,email:user.email,role:user.role}});
  }catch(err){
    console.error(err);
    res.status(500).json({message:'Server error'});
  }
});

router.post('/login', async (req,res)=>{
  try{
    const {email,password} = req.body;
    if(!email || !password) return res.status(400).json({message:'Missing fields'});
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:'Invalid credentials'});
    const isMatch = await user.matchPassword(password);
    if(!isMatch) return res.status(400).json({message:'Invalid credentials'});
    const token = signToken(user._id);
    res.json({token, user:{id:user._id,name:user.name,email:user.email,role:user.role}});
  }catch(err){
    console.error(err);
    res.status(500).json({message:'Server error'});
  }
});

module.exports = router;
