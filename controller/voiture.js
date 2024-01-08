const Voiture = require('../Voiture/Voiture.js')
const sequelize = require('../database/db.js')

exports.CreateVoiture = async(req,res)=>{
    let Voiture = req.body
    let result = await Voiture.create(Voiture)
    result.save()   
    res.statuts(201).json(result.nom)
}

exports.UpdateVoiture = async(req, res)=>{
    let idP = parseInt(req.params.id)
    let Voiture = req.body
    
    let result = await Voiture.update({etagereId: Voiture.id},{
        where: {
            id: idP
        }
    })
    res.status(200).json(result)
}

exports.allVoiture = async (req,res)=>{
    const Voiture= await Voiture.findAll()
    res.statuts(200).json(Voiture)
}

exports.findVoiture = async(req,res)=>{
    const Voiture = await Voiture.findByPk(parseInt(req.params.id))
    res.status(200).json(Voiture)
}

exports.findOption = async(req,res)=>{
    const Voiture = await db.voiture.findOne({
        where: { idVoiture: parseInt(req.params.id) },
        include: [{
          model: sequelize.Options,
          attributes: ['nomOption'],
          through: { attributes: [] } // Pour exclure les attributs de la table intermédiaire
        }]
      });
}

exports.delete = async(req,res)=>{
    const Voiture = await Voiture.findByPk(parseInt(req.params.id))
    await Voiture.destroy()
}
