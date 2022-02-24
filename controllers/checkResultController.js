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
                    as: "Patient",
                    include: Profile
                },{
                    model:Desease
                },{
                    model:User,
                    as: "Doctor",
                    include: Profile
                }],
                where
            }
        ).then(cr => {
            checkResults = cr;
            return User.findAll({
                include:Profile,
                where:{
                    role:"doctor"
                }
            });
        }).then(doctors=>{
            res.render("checkResult/indexDoctor",{
                checkResults,
                doctorId,
                doctors
            });
        }).catch(err => res.send(err));
    }

    static showCRDetail(req,res){
        const id = req.params.id;
        CheckResult.findByPk(id,{
            include:[{
                model:User,
                as: "Patient",
                include: Profile
            },{
                model:Desease
            },{
                model:User,
                as: "Doctor",
                include: Profile
            }]
        }).then(checkResult => {
            res.render("checkResult/detail",{checkResult});
        }).catch(err => res.send(err));
    }

    static showCRForm(req,res){
        const doctorId = req.params.doctorId;
        let patients;
        User.findAll({
            include:Profile,
            where:{
                role:"patient"
            }
        }).then(u => {
            patients = u;
            return Desease.findAll();
        }).then(deseases => {
            res.render("checkResult/createForm",{ patients, deseases, doctorId})
        }).catch(err => console.log(err));
    }

    static createCR(req,res){
        const doctorId = req.params.doctorId;
        const { patientId, deseaseId, medicine, description } = req.body;
        CheckResult.create({doctorId, patientId, deseaseId, medicine, description})
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