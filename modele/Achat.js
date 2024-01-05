const sequelize = require('../database/db')
const { DataTypes } = require('sequelize')

const Achat = sequelize.define('Achat', {
    // une colonne:
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    dateAchat:{
        type: DataTypes.DATE,
        allowNull: false
    },
    prix:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
},{
    freezeTableName: true
})
module.exports = Achat
