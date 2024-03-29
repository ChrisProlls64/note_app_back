import mysql from 'mysql2/promise';
import { NoteController } from '../controllers/note-controller.js';

import { Router } from 'express';
var router = Router();

const noteController = new NoteController()

/* GET notes listing. */
router.get('/', function(req, res) {
    noteController.listAll(req, res);
    // res.send('respond from notes router');
});

/* Create a new note */
router.post('/', function(req, res) {
    noteController.create(req, res);
    
});


/* Delete a note */
router.delete('/:id', function(req, res) {
    console.log('access to delete action with id: ', req.params.id );
    noteController.destroy(req, res);
});

/* Update a note */
router.put('/:id', function(req, res) {
    console.log('access to updated action with id: ', req.params.id );
    noteController.updateNote;
});



export default router;
