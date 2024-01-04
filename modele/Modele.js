const sequelize = require('../database/database')
const { DataTypes } = require('sequelize')

const Modele = sequelize.define('Modele', {
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
    prixVoiture:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Moteur:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Consomation:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Description:{
        type:DataTypes.STRING,
        allowNull: false,
    }
},{
    freezeTableName: true
})

module.exports = Modele

Modele.belongsToMany(Options, { through: Voiture });
Profile.belongsToMany(Modele, { through: Voiture });