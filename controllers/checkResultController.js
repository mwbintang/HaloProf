const { CheckResult, User, Desease, Doctor, Profile } = require("../models/index")
class CheckResultController {
    static showCRForDoctor(req, res) {
        let checkResults;
        const doctorId = req.params.doctorId;
        const where = req.query.doctorId ? { doctorId: req.query.doctorId } : null;
        CheckResult.findAll(
            {
                include: [{
                    model: User,
                    as: "Patient",
                    include: Profile
                }, {
                    model: Desease
                }, {
                    model: User,
                    as: "Doctor",
                    include: Profile
                }],
                where
            }
        ).then(cr => {
            checkResults = cr;
            return User.findAll({
                include: Profile,
                where: {
                    role: "doctor"
                }
            });
        }).then(doctors => {
            res.render("checkResult/indexDoctor", {
                checkResults,
                doctorId,
                doctors
            });
        }).catch(err => res.send(err));
    }

    static showCRDetail(req, res) {
        const id = req.params.checkResultId;
        CheckResult.findByPk(id, {
            include: [{
                model: User,
                as: "Patient",
                include: Profile
            }, {
                model: Desease
            }, {
                model: User,
                as: "Doctor",
                include: Profile
            }]
        }).then(checkResult => {
            res.render("checkResult/detail", { checkResult });
        }).catch(err => res.send(err));
    }

    static showCRForm(req, res) {
        const doctorId = req.params.doctorId;
        let patients;
        User.findAll({
            include: Profile,
            where: {
                role: "patient"
            }
        }).then(u => {
            patients = u;
            return Desease.findAll();
        }).then(deseases => {
            res.render("checkResult/createForm", { 
                patients, 
                deseases, 
                doctorId,
                errors : req.query.errors ? req.query.errors.split(";") : null
             })
        }).catch(err => console.log(err));
    }

    static createCR(req, res) {
        const doctorId = req.params.doctorId;
        const { patientId, deseaseId, medicine, description } = req.body;
        CheckResult.create({ doctorId, patientId, deseaseId, medicine, description })
            .then(() => {
                res.redirect(`/doctor/${doctorId}/checkResult`)
            }).catch(err => {
                if(err.name === "SequelizeValidationError"){
                    res.redirect(`/doctor/${doctorId}/checkResult/add?errors=${err.errors.map(e => e.message).join(";")}`)
                }
                else{
                    res.send(err)
                }
            });
    }

    static deleteCR(req, res) {
        const doctorId = req.params.doctorId;
        const id = req.params.checkResultId;
        CheckResult.destroy({
            where: {
                id: id
            }
        })
            .then(() => {
                res.redirect(`/doctor/${doctorId}/checkResult`)
            }).catch(err => res.send(err));
    }

    static showCREditForm(req, res) {
        const { doctorId, checkResultId } = req.params;
        let checkResult,patients;
        CheckResult.findByPk(checkResultId, {
            include: [{
                model: User,
                as: "Patient",
                include: Profile
            }, {
                model: Desease
            }, {
                model: User,
                as: "Doctor",
                include: Profile
            }]
        }).then(cr => {
            checkResult = cr;
            return User.findAll({
                include: Profile,
                where: {
                    role: "patient"
                }
            })
        }).then(u => {
            patients = u;
            return Desease.findAll();
        }).then(deseases => {
            res.render("checkResult/editForm", { 
                patients, 
                deseases, 
                doctorId,
                checkResult,
                errors : req.query.errors ? req.query.errors.split(";") : null
             })
        }).catch(err => console.log(err));
    }

    static updateCR(req, res) {
        const { doctorId, checkResultId } = req.params;
        const { patientId, deseaseId, medicine, description } = req.body;
        CheckResult.update({ patientId, deseaseId, medicine, description },{
            where:{
                id:checkResultId
            }
        }).then(()=>{
            res.redirect(`/doctor/${doctorId}/checkResult`)
        }).catch(err => {
            if(err.name === "SequelizeValidationError"){
                res.redirect(`/doctor/${doctorId}/checkResult/edit/${checkResultId}?errors=${err.errors.map(e => e.message).join(";")}`)
            }
            else{
                res.send(err)
            }
        });
    }


}

module.exports = CheckResultController;