const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan')
const passport = require('passport');
const path = require('path');

require('dotenv').config();

const authRouter = require('./router/authRouter');
const appRouter = require('./router/appRouter');
const { authorized } = require('./auth/auth');

const app = express();

// configure middleware
app.use(logger('dev'));
app.use(cors());

// import models
const { User, Note, Folder } = require('./models');

const PORT = process.env.PORT || 4567;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// app.use(errorHandler)

app.use('/auth', authRouter);
app.use('/app', authorized, appRouter);
app.use(passport.initialize());

//-- WORKS
app.get('/', async (req, res) => {
  try {
    res.send('Project 3!');
  }
  catch (err) {
    throw err
  }
});


// get all folders-- WORKS
app.get('/user/:user_id', async (req, res) => {
  // console.log('poo ', req)
  // console.log(res.headers,'something----------------')
  try {
    const id = req.params.user_id;
    // const findUser = await Folder.findAll({ where: { userId: id } });
    const findUser = await User.findAll(
      {
        where: {
          id: id
        },
        include: [
          {
            model: Folder,
            include: [
              {
                model: Note
              }
            ]
          }
        ]
      })
    res.send(findUser)
  } catch (error) {
    throw error
  }
});





app.get('/user/:user_id/notes', async (req, res) => {
  try {
    const id = req.params.user_id;
    // const findUser = await Folder.findAll({ where: { userId: id } });
    const findNotes = await Note.findAll(
      {
        where: {
          userId: id
        }
      })
    res.send(findNotes)
  } catch (error) {
    throw error
  }
});

app.post('/folders', async (req, res) => {
  try {
    const newFolder = await Folder.create(req.body)
    res.send(newFolder)
  } catch (error) {
    console.log('ERROR MAKING FOLDERS')
    throw error
  }
})

// gets all notes from a specific folder-- WORKS
app.get('/user/:user_id/folders/:folder_id', async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await User.findByPk(req.params.user_id);
    const folder = await Folder.findByPk(req.params.folder_id);
    if (user) {
      if (folder.dataValues.userId == userId) {
        const notes = await Note.findAll({
          where: {
            folderId: req.params.folder_id
          }
        });
        res.send(notes)
      }
      else {
        res.status(400).json({
          message: "folder not found"
        });
      }
    }
    else {
      res.status(400).json({
        message: "user not found"
      });
    }
  }
  catch (error) {
    throw error
  }
});

// creates one folder -- works andre did it
app.post('/user/:user_id/folders', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);
    if (user) {
      const newFolder = await Folder.create(req.body);
      // console.log(newFolder, user)
      await newFolder.setUser(user);
      res.send(newFolder);
    }
    else {
      res.status(400).json({
        message: "user not found"
      });
    }
  } catch (error) {
    throw error
  }
});

// creates one note -- works
// app.post('/user/:user_id/folders/:folder_id/notes', async (req, res) => {
//   try {
//     const userId = req.params.user_id;
//     const user = await User.findByPk(req.params.user_id);
//     const folder = await Folder.findByPk(req.params.folder_id);
//     if (user) {
//       if (folder.dataValues.userId == userId) {
//         const newNote = await Note.create(req.body);
//         await newNote.setFolder(folder);
//         await newNote.setUser(user);
//         res.send(newNote);
//       }
//       else {
//         res.status(400).json({
//           message: "folder not found"
//         });
//       }
//     }
//     else {
//       res.status(400).json({
//         message: "user not found"
//       });
//     }
//   } catch (error) {
//     throw error
//   }
// });



app.post('/user/:user_id/folders/:folder_id/notes', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.user_id);
    const folder = await Folder.findByPk(req.params.folder_id);
    const newNote = await Note.create(req.body);
    await newNote.setFolder(folder);
    await newNote.setUser(user);
    res.send(newNote)
  } catch (error) {
    throw error
  }
});


// create new note REED room -- SCRAPPED NO TIME
// app.post('/user/:id/notes', async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     if (user) {
//       const newNote = await Note.create(req.body);
//       // console.log(newFolder, user)
//       await newNote.setUser(user);
//       res.send(newNote);
//     }
//     else {
//       res.status(400).json({
//         message: "user not found"
//       });
//     }
//   } catch (error) {
//     throw error
//   }
// });




// get user note -- works
app.get('/user/:user_id/folders/:folder_id/notes/:note_id', async (req, res) => {
  try {
    const userId = req.params.user_id;
    const folderId = req.params.folder_id;
    const noteId = req.params.note_id;

    const user = await User.findByPk(userId);
    const folder = await Folder.findByPk(folderId);
    const note = await Note.findByPk(noteId);

    if (user) {
      if (folder) {
        if (note) {
          if (userId == folder.dataValues.userId && userId == note.dataValues.userId) {
            res.send(note);
          }
        }
        else {
          res.status(400).json({
            message: "note not found"
          });
        }

      }
      else {
        res.status(400).json({
          message: "folder not found"
        });
      }
    }
    else {
      res.status(400).json({
        message: "user not found"
      });
    }
  }
  catch (error) {
    throw error
  }
});



// edit folder=
app.put('/folders/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Folder.update(
      { title: req.body.title },
      { where: { id: id } }
    );
    res.send('updated')
  } catch (error) {
    throw error
  }
});





// update note?
app.put('/notes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Note.update(
      { content: req.body.content },
      { where: { id: id } }
    );
    res.send('updated')
  } catch (error) {
    throw error
  }
});


// edit note -- works
app.put('/user/:user_id/folders/:folder_id/notes/:note_id', async (req, res) => {
  try {
    const userId = req.params.user_id;
    const folderId = req.params.folder_id;
    const noteId = req.params.note_id;

    const user = await User.findByPk(userId);
    const folder = await Folder.findByPk(folderId);
    const note = await Note.findByPk(noteId);

    if (user) {
      if (folder) {
        if (note) {
          if (userId == folder.dataValues.userId && userId == note.dataValues.userId) {
            // console.log('old note', note.dataValues);
            await Note.update(
              {
                title: req.body.title,
                content: req.body.content
              },
              {
                where: { id: noteId }
              }
            )
            res.json({ message: `Note with id${noteId} was updated` });
            const newNote = await Note.findByPk(noteId);
            // console.log('new note', newNote.dataValues);
          }
        }
      }
    }

  } catch (error) {
    throw error
  }
});

// delete note-- works
// app.delete('/user/:user_id/folders/:folder_id/notes/:note_id', async (req, res) => {

//   try {
//     const userId = req.params.user_id;
//     const folderId = req.params.folder_id;
//     const noteId = req.params.note_id;

//     const user = await User.findByPk(userId);
//     const folder = await Folder.findByPk(folderId);
//     const note = await Note.findByPk(noteId);

//     if (user) {
//       if (folder) {
//         if (note) {
//           if (userId == folder.dataValues.userId && userId == note.dataValues.userId) {
//             await Note.destroy({
//               where: { id: noteId }
//             });
//             res.json(`Note with id of ${noteId} has been deleted`);
//           }
//         }
//       }
//     }
//   } catch (error) {
//     throw error
//   }
// });

app.delete('/notes/:note_id', async (req, res) => {
  try {
    const noteId = req.params.note_id;
    await Note.destroy({ where: { id: noteId } });
    res.send('Note Deleted')
  } catch (error) {
    console.error('delete note SJS', error)
  }
});

// delete folder-- works
app.delete('/folders/:folder_id', async (req, res) => {
  try {
    const folderId = req.params.folder_id;
    console.log('this is folder id', folderId)
    // const user = await Folder.findByPk(userId);
    await Folder.destroy({ where: { id: folderId } });
    res.send('Folder deleted')


    // if (user) {
    //   if (folder) {
    //     if (userId == folder.dataValues.userId) {
    //       // console.log(folder.dataValues);
    //       await Folder.destroy({
    //         where: { id: folderId }
    //       });
    //       res.json(`Folder with id of ${folderId} has been deleted`);
    //     }
    //   }
    // }
    // else {
    //   res.status(400).json({
    //     message: "folder was not deleted"
    //   });
    // }
  } catch (error) {
    console.log('this error came about from deleting folders');
    throw error
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message
  })
})

app.listen(PORT, () => console.log(`Up and running on Port ${PORT}`));