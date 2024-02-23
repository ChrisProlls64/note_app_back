// Create the connection to database

import mysql from 'mysql2/promise';

export class NoteController {
    async listAll(req, res) {
        console.log('NoteController should list them all');
        const dbConnection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'notes-app',
            port: 8889,
          });
        console.log('connection db réussie');  
        // res.send('Connexion ok');
        
        // try {
        //     const [results, fields] = await dbConnection.query(
        //       'SELECT * FROM `note`'
        //     );
          
        //     console.log(results); // results contains rows returned by server
        //     console.log(fields); // fields contains extra meta data about results, if available
        //   } catch (err) {
        //     console.log(err);
        //   }
          
          // Using placeholders
          try {
            const [results,fields] = await dbConnection.query(
              'SELECT * FROM `note`'
            );
          
            // console.log(results);
            res.send(results);
          } catch (err) {
            console.log(err);
          }
        }
        
        async create(req, res) {
          const dbConnection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'notes-app',
            port: 8889,
          });
          
          const newNote = req.body;
          console.log('noteController create with text ');
          const [results, fields] = await dbConnection.query('INSERT INTO note (text) VALUE (?)', [newNote.text]);

          // res.send(`ok the note has been added, you sent this data : ${req.body.text}`);
          res.json({message: "note added to db"});
        }

        async destroy(req,res) {
          const dbConnection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'notes-app',
            port: 8889,
          });

          const [results, fields] = await dbConnection.query('DELETE FROM note WHERE id = ?', [req.params.id]);
          res.json({message : "note deleted", results: results});

        }
}
// console.log('noteController create with text : ', newNote.text);
// const [results, fields] = await dbConnection.query('INSERT INTO notes (text) VALUE (?)', [newNote.text]);


