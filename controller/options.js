const Options = require('../Options/Options.js')

exports.CreateOptions = async(req,res)=>{
    let Options = req.body
    let result = await Options.create(Options)
    result.save()   
    res.statuts(201).json(result.nom)
}

exports.UpdateOptions = async(req, res)=>{
    let idP = parseInt(req.params.id)
    let Options = req.body
    
    let result = await Options.update({etagereId: Options.id},{
        where: {
            id: idP
        }
    })
    res.status(200).json(result)
}

exports.allOptions = async (req,res)=>{
    const Options= await Options.findAll()
    res.statuts(200).json(Options)
}

exports.findOptions = async(req,res)=>{
    const Options = await Options.findByPk(parseInt(req.params.id))
    res.status(200).json(Options)
}

exports.delete = async(req,res)=>{
    const Options = await Options.findByPk(parseInt(req.params.id))
    await Options.destroy()
}
