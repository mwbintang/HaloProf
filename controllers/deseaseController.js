const {Desease, Symptom} = require('../models')
const statusDisease = require('../helper')

class deseaseController{
    static deseaseList(req, res){
        Desease.findAll({include:Symptom})
            .then(result=>{
                res.render('deseaseList', {result})
            })
            .catch(err=>{
                res.send(err)
            })
    }
    static deseaseListById(req, res){
        const {id} = req.params
        Desease.findByPk(id, {include: Symptom})
            .then(result=>{
                res.render('desaseListById', {result, statusDisease})
            })
            .catch(err=>{
                res.send(err)
            })
    }
}

module.exports = deseaseController;