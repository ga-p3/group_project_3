const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const NoteModel = require('./note');
const FolderModel = require('./folder');
const UserFolderModel = require('./user_folder');
const bcrypt = require('bcrypt');

const db = new Sequelize((process.env.REACT_APP_HEROKU_DB || 'https://notes-app-p3.herokuapp.com/'),{
    database: 'notes_db',
    dialect: 'postgres',
    define: {
        underscored: true,
        returning:true
    }
});

const User = UserModel(db, Sequelize);
const Note = NoteModel(db, Sequelize);
const Folder = FolderModel(db, Sequelize);
const UserFolder = UserFolderModel(db, Sequelize);

User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(
        user.password,
        Number(process.env.SALT_ROUNDS)
    )
    user.password = hashedPassword
  })
  

// phil added user.hasmany(note) for test
User.hasMany(Folder)
// User.hasMany(Note)
Folder.hasMany(Note)
Folder.belongsTo(User)
Note.belongsTo(Folder)
Note.belongsTo(User)

module.exports = {
    db,
    User,
    Note,
    Folder,
    UserFolder
}