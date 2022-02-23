const { user } = require("pg/lib/defaults");
const {CheckResult,User,Desease,Doctor,Profile} = require("../models/index")
class checkResultController{
    static showCRForDoctor(req,res){
        CheckResult.findAll(
            {
                include:[{
                    model:User,
                    include: Profile
                },{
                    model:Desease
                },{
                    model:Doctor
                }]
            }
        ).then(checkResults => {
            res.render("checkResult/indexDoctor",checkResults);
        }).catch(err => res.send(err));
    }

    static showCRDetailForDoctor(req,res){
        const id = req.params.id;
        CheckResult.findByPk(id,{
            include:[{
                model:User,
                include: Profile
            },{
                model:Desease
            },{
                model:Doctor
            }]
        }).then(checkResult => {
            res.render("detail",checkResult);
        }).catch(err => res.send(err));
    }

    static showCRForm(req,res){
        let users;
        User.findAll({
            include:Profile
        }).then(u => {
            users = u;
            return Desease.findAll();
        }).then(deseases => {
            res.render("checkResult/createForm",{ users, deseases})
        }).catch(err => res.send(err));
    }

    static createCR(req,res){

    }
}

module.exports = checkResultController;