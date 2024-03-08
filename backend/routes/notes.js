const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Raute1 get all the notes using:get "/api/auth/getuser". no loging required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }

})

// Raute2 get all the notes using:get "/api/auth/getuser". no loging required
router.post('/addnote', fetchuser, [
    body('title').isLength({ min: 3 }),

    body('description').isLength({ min: 6 }),

], async (req, res) => {
    try {


        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})
router.put ('/updatenote/:id',fetchuser, async (req, res)=>{
    const{title,description,tag}=req.body;
    const newNote={};
    if (title){newNote.title=title};
    if (description){newNote.description=description};
    if (tag){newNote.tag=tag};

    let note = await Note.findById(req.params.id);
    if(!note){res.status(404).send("not found")}
    if(note.user.toString()!==req.user.id)
    {
        return res.status(401).send("not allow");
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
    res.json({note});
})
module.exports = router