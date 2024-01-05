const Modele = require('../modele/Modele.js')

exports.CreateModele = async(req,res)=>{
    let modele = req.body
    let result = await Modele.create(modele)
    result.save()
    res.statuts(201).json(result.nom)
}
