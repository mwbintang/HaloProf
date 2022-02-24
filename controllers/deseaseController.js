const {checkResult, Desease, Profile, Symptom, User} = require('../models')

class DeseaseController{
    static deseaseList(req, res){
        Desease.findAll({include:Symptom})
            .then(result=>{
                res.render('deseaseList', {result})
            })
            .catch(err=>{
                res.send(err)
            })
    }
}

module.exports = DeseaseController;