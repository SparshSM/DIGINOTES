const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Route 1: fetch all notes by GET
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
  try {
    const notes = await Note.find({user: req.user.id});
    res.json(notes)
} catch (error) {
    console.error(error.message);
    res.status(500).send("server error occured");
}
})
//Route 2: add notes by post
router.post('/addnotes', fetchuser,[
    body('title','Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters.').isLength({ min: 5 }),
],async (req,res)=>{
    try {
    const{title,description,tag} = req.body;
    const errors = validationResult(req);
    //if errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
        title,description,tag,user:req.user.id
    })
    const savenote= await note.save()
    res.json(savenote)
} catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
}
})
//Route 3: update notes 
router.put('/updatenote/:id',fetchuser,async (req,res)=>{
    const{title,description,tag} = req.body;
    //create a newnote object
    try {
    const newNote ={};
    if(title){newNote.title =title };
    if(description){newNote.description = description};
    if(tag){newNote.tag =tag };

    // find note to be updated and update

    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
    res.json({note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("server error occured");
}
  })
  //Route 4: delete notes 
router.delete('/deletenote/:id',fetchuser,async (req,res)=>{

    // find note to be deleted and delete
try {
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    //allow only if user owns the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note has been deleted", note: note});
} catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
}
  })
module.exports = router