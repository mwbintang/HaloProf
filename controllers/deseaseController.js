const {Desease, Symptom} = require('../models')
const statusDisease = require('../helper')
const {Op} = require('sequelize')

class DeseaseController{
    static deseaseList(req, res){
        // console.log(req.query)
        const {search} = req.query
        let obj = {include:Symptom}
        if(search){
            obj = {include:Symptom, where:{name:{[Op.iLike]: `%${search}%`}}}
        }

        Desease.findAll(obj)
            .then(result=>{
                res.render('deseaseList', {result, user:req.session.user ? req.session.user : null})
            })
            .catch(err=>{
                res.send(err)
            })
    }
    static deseaseListById(req, res){
        const {id} = req.params
        Desease.findByPk(id, {include: Symptom})
            .then(result=>{
                res.render('desaseListById', {result, statusDisease, user:req.session.user ? req.session.user : null})
            })
            .catch(err=>{
                res.send(err)
            })
    }
}

module.exports = DeseaseController;