const sequelize = require('../database/db')
const { DataTypes } = require('sequelize')
const Options = require('./Options')
const Modele = require('./Modele')

const Voiture = sequelize.define('Voiture', {
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

Modele.belongsToMany(Options, { through: Voiture });
Options.belongsToMany(Modele, { through: Voiture });

module.exports = Voiture