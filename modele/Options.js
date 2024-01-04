const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Options = sequelize.define('Options', {
    // une colonne:
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom:{
        type: DataTypes.STRING,
        allowNull: false
    },
    prixOption:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
},{
    freezeTableName: true
})

module.exports = Options