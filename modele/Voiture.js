const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Option = sequelize.define('Option', {
    // une colonne:
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    nom:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    prix:{
        type:DataTypes.FLOAT,
        allowNull:false,
    }
},{
    freezeTableName: true
})

module.exports = Voiture