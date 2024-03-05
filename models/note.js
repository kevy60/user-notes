const Sequelize = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user');

const Note = sequelize.define('Note', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    tableName: 'notes'
});

Note.belongsTo(User, { foreignKey: 'userId' });

module.exports = Note;
