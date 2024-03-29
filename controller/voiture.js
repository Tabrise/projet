const Voiture = require('../Voiture/Voiture.js')

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

exports.delete = async(req,res)=>{
    const Voiture = await Voiture.findByPk(parseInt(req.params.id))
    await Voiture.destroy()
}
