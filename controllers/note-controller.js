// Create the connection to database

import mysql from "mysql2/promise";

async function getDBConnection() {
  return await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "notes-app",
    port: 8889,
  });
}

export class NoteController {
  async listAll(req, res) {
    console.log("NoteController should list them all");
    try {
      const dbConnection = await getDBConnection();
      const [results, fields] = await dbConnection.query(
        "SELECT * FROM `note`"
      );
      res.send(results);
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }

  async create(req, res) {
    try {
      const dbConnection = await getDBConnection();
      const newNote = req.body;
      console.log("noteController create with text ");
      const [results, fields] = await dbConnection.query(
        "INSERT INTO note (text, category, date) VALUE (?, ?, ?)",
        [[newNote.text], [newNote.category], Date.Now]
      );
      res.json({ message: "note added to db" });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }

  async updateNote(req, res) {
    try {
        const dbConnection = await this.getDBConnection();
        const noteId = req.params.id;
        const updatedNoteData = req.body;

        // Vérifier si la note existe
        const [existingNote] = await dbConnection.query('SELECT * FROM note WHERE id = ?', [noteId]);
        if (!existingNote.length) {
            return res.status(404).json({ error: 'Note not found' });
        }

        // Mettre à jour la note dans la base de données
        await dbConnection.query('UPDATE note SET ? WHERE id = ?', [updatedNoteData, noteId]);

        res.json({ message: 'Note updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

  async destroy(req, res) {
    try {
      const dbConnection = await getDBConnection();
      const [results, fields] = await dbConnection.query(
        "DELETE FROM note WHERE id = ?",
        [req.params.id]
      );
      res.json({ message: "note deleted", results: results });
    } catch (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    }
  }
}

// console.log('noteController create with text : ', newNote.text);
// const [results, fields] = await dbConnection.query('INSERT INTO notes (text) VALUE (?)', [newNote.text]);
