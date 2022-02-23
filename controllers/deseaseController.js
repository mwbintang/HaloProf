const {checkResult, Desease_Symptomp, Desease, Doctor, Profile, Symptomp, User} = require('../models')

class deseaseController{
    static deseaseList(req, res){
        // console.log('test')
        Desease.findAll({include:{all: true, nested: true }})
            .then(result=>{
                // console.log(result[1].Symptomps)
                res.render('deseaseList', {result})
            })
            .catch(err=>{
                res.send(err)
            })
    }
}

module.exports = deseaseController;