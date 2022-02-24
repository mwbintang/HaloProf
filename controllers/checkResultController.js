const { user } = require("pg/lib/defaults");
const {CheckResult,User,Desease,Doctor,Profile} = require("../models/index")
class checkResultController{
    static showCRForDoctor(req,res){
        const doctorId = req.params.doctorId;
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
            res.render("checkResult/indexDoctor",{checkResults,doctorId});
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
            res.render("checkResult/detail",{checkResult});
        }).catch(err => res.send(err));
    }

    static showCRForm(req,res){
        const doctorId = req.params.doctorId;
        let users;
        User.findAll({
            include:Profile
        }).then(u => {
            users = u;
            return Desease.findAll();
        }).then(deseases => {
            res.render("checkResult/createForm",{ users, deseases, doctorId})
        }).catch(err => res.send(err));
    }

    static createCR(req,res){
        const doctorId = req.params.doctorId;
        const { userId, deseaseId, medicine, description } = req.body;
        CheckResult.create({doctorId, userId, deseaseId, medicine, description})
            .then(()=>{
                res.redirect(`/doctor/${doctorId}/checkResult`)
            }).catch(err => res.send(err));
    }
}

module.exports = checkResultController;