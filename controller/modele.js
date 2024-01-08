const Modele = require('../modele/Modele.js')

exports.CreateModele = async(req,res)=>{
    let modele = req.body
    let result = await Modele.create(modele)
    result.save()
    res.statuts(201).json(result.nom)
}

exports.UpdateModel = async(req, res)=>{
    let idP = parseInt(req.params.id)
    let modele = req.body
    
    let result = await Modele.update({etagereId: modele.id},{
        where: {
            id: idP
        }
    })
    res.status(200).json(result)
}

exports.allModele = async (req,res)=>{
    const modele= await Modele.findAll()
    console.log(modele)
    res.render('index' ,{ modeles:modele})
}

exports.findModele = async(req,res)=>{
    const modele = await Modele.findByPk(parseInt(req.params.id))
    res.status(200).json(modele)
}

exports.delete = async(req,res)=>{
    const modele = await Modele.findByPk(parseInt(req.params.id))
    await modele.destroy()
}