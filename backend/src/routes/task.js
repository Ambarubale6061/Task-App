// Author: Ambar Ubale
// Generated/Edited to look like Ambar Ubale's project

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Task = require('../models/Task');

// Create
router.post('/', protect, async (req,res)=>{
  const {title,description} = req.body;
  if(!title) return res.status(400).json({message:'Title required'});
  const task = await Task.create({user:req.user._id, title, description});
  res.status(201).json(task);
});

// Read list (with simple search & filter)
router.get('/', protect, async (req,res)=>{
  const q = req.query.q || '';
  const filter = {user:req.user._id};
  if(q) filter.title = {$regex: q, $options:'i'};
  const tasks = await Task.find(filter).sort({createdAt:-1});
  res.json(tasks);
});

// Read one
router.get('/:id', protect, async (req,res)=>{
  const task = await Task.findOne({_id:req.params.id, user:req.user._id});
  if(!task) return res.status(404).json({message:'Not found'});
  res.json(task);
});

// Update
router.put('/:id', protect, async (req,res)=>{
  const task = await Task.findOne({_id:req.params.id, user:req.user._id});
  if(!task) return res.status(404).json({message:'Not found'});
  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  if(typeof req.body.completed === 'boolean') task.completed = req.body.completed;
  await task.save();
  res.json(task);
});

// Delete
router.delete('/:id', protect, async (req,res)=>{
  const task = await Task.findOneAndDelete({_id:req.params.id, user:req.user._id});
  if(!task) return res.status(404).json({message:'Not found'});
  res.json({message:'Deleted'});
});

module.exports = router;
