const {checkResult, Desease_Symptomp, Desease, Doctor, Profile, Symptomp, User} = require('../models')

class Controller{
    // static home(req, res){
    //     res.redirect('/login')
    // }
    static penyakit(req, res){
        Desease.findAll({include:{model:Desease_Symptomp, include:Symptomp}})
            .then(result=>{
                console.log(result[0].Desease_Symptomps[0].Symptomp)
                res.render('penyakit', {result})
            })
            .catch(err=>{
                res.send(err)
            })
    }
}

module.exports = Controller;