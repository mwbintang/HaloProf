const {checkResult, desease_symptomp, Desease, Doctor, Profile, Symptomp, User} = require('../models')

class Controller{
    // static home(req, res){
    //     res.redirect('/login')
    // }
    static penyakit(req, res){
        Desease.findAll({include:{model:desease_symptomp, include:Desease}})
            .then(result=>{
                res.send(result)
            })
            .catch(err=>{
                res.send(err)
            })
    }
}

module.exports = Controller;