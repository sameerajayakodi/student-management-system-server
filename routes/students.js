const express = require('express');
const Student = require('../models/Student')
const router = express.Router();


//Create(
router.post('/',async(req,res)=>{
   const student =  new Student(req.body);
   await student.save();
   res.send('Student added')
});


//Read All

router.get('/',async(req,res)=>{
    const students = await Student.find();
    res.json(students);
})

//Update

router.put('/:id',async(req,res)=>{
await Student.findByIdAndUpdate(req.params.id,req.body);
res.send('Student Updated');
});

// DELETE a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.send('Student Deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting student');
  }
});

module.exports = router;
