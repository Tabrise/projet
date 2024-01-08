const Achat = require('../modele/Achat.js')
const sequelize = require('../database/db.js')

exports.CreateAchat = async(req,res)=>{
    let achat = req.body
    let result = await Achat.create(achat)
    result.save()   
    res.statuts(201).json(result.nom)
}

exports.UpdateAchat = async(req, res)=>{
    let idP = parseInt(req.params.id)
    let achat = req.body
    
    let result = await Achat.update({etagereId: achat.id},{
        where: {
            id: idP
        }
    })
    res.status(200).json(result)
}

exports.allAchat = async (req,res)=>{
    const achat= await Achat.findAll()
    console.log(achat)
    const mois = await Achat.findAll({
        attributes: [
            [sequelize.fn('MONTH', sequelize.col('dateAchat')), 'Mois'],
            [sequelize.fn('YEAR', sequelize.col('dateAchat')), 'Annee'],
            [sequelize.fn('SUM', sequelize.col('prix')), 'SommeTotalAchat']
          ],
          group: [sequelize.fn('YEAR', sequelize.col('dateAchat')), sequelize.fn('MONTH', sequelize.col('dateAchat'))],
    })
    console.log(mois)

    res.render('admin', {achats:achat , mois:mois}) 
}

exports.findAchat = async(req,res)=>{
    const achat = await Achat.finAchatyPk(parseInt(req.params.id))
    res.status(200).json(achat)
}

exports.delete = async(req,res)=>{
    const achat = await Achat.finAchatyPk(parseInt(req.params.id))
    await achat.destroy()
    res.status(200).json(achat)
}

exports.totalMensuel = async(req,res)=>{
    
    res.status(200).json(achat)
}

