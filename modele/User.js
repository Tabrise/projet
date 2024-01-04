const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const User = sequelize.define('User', {
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
    prenom:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mdp:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
    },
    isComptable:{
        type:DataTypes.BOOLEAN,
    }
},{
    freezeTableName: true
})

module.exports = User