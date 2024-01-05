const Modele = require('../modele/Modele')
const Options = require('../modele/Options')
const User = require('../modele/User')
const Voiture = require('../modele/Voiture')

const sequelize = require('../database/db')

exports.createAllTable = async(req, res)=>{
    await sequelize.sync({alter: true})
    res.status(200).json('toutes les tables sont créer')
}
