const Voiture = require('../modele/Voiture.js')
const Options = require('../modele/Options.js')
const sequelize = require('../database/db.js')

exports.CreateVoiture = async(req,res)=>{
    let Voiture = req.body
    let result = await Voiture.create(Voiture)
    result.save()   
    res.statuts(201).json(result.nom)
}

exports.UpdateVoiture = async(req, res)=>{
    let idP = parseInt(req.params.id)
    let voiture = req.body
    
    let result = await Voiture.update({etagereId: Voiture.id},{
        where: {
            id: idP
        }
    })
    res.status(200).json(result)
}

exports.allVoiture = async (req,res)=>{
    const voiture= await Voiture.findAll()
    res.statuts(200).json(Voiture)
}

exports.findVoiture = async(req,res)=>{
    const voiture = await Voiture.findByPk(parseInt(req.params.id))
    res.status(200).json(Voiture)
}

exports.getVoiture = async(req,res)=>{
    const voiture = await Voiture.findAll({
        where: {ModeleId: parseInt(req.params.idModele) },
      });
      console.log(voiture)
      res.render('custom' ,{ voiture: voiture})
}

exports.delete = async(req,res)=>{
    const Voiture = await Voiture.findByPk(parseInt(req.params.id))
    await Voiture.destroy()
}
