const {checkResult, Desease, Profile, Symptom, User} = require('../models')

class deseaseController{
    static deseaseList(req, res){
        // console.log('test')
        Desease.findAll({include:Symptom})
            .then(result=>{
                // console.log(result)
                res.render('deseaseList', {result})
            })
            .catch(err=>{
                res.send(err)
            })
    }
}

module.exports = deseaseController;