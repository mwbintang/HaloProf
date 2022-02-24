const {CheckResult,User,Desease,Doctor,Profile} = require("../models/index")
class checkResultController{
    static showCRForDoctor(req,res){
        let checkResults;
        const doctorId = req.params.doctorId;
        const where = req.query.doctorId ? { doctorId: req.query.doctorId } : null;
        CheckResult.findAll(
            {
                include:[{
                    model:User,
                    include: Profile
                },{
                    model:Desease
                },{
                    model:Doctor
                }],
                where
            }
        ).then(cr => {
            checkResults = cr;
            return Doctor.findAll();
        }).then(doctors=>{
            res.render("checkResult/indexDoctor",{
                checkResults,
                doctorId,
                doctors
            });
        }).catch(err => res.send(err));
    }

    static showCRDetail(req,res){
        const id = req.params.checkResultId;
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

    static deleteCR(req,res){
        const doctorId = req.params.doctorId;
        const id = req.params.id;
        CheckResult.destroy({
            where: {
                id: id
              }
        })
        .then(()=>{
            res.redirect(`/doctor/${doctorId}/checkResult`)
        }).catch(err => res.send(err));
    }

}

module.exports = checkResultController;