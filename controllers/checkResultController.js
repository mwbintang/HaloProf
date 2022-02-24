const { CheckResult, User, Desease, Doctor, Profile } = require("../models/index")
const nodemailer = require("nodemailer");

let memory = {};
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testinghaloprof@gmail.com",
    pass: "b123b123",
  },
});

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
                doctors,
                user:req.session.user ? req.session.user : null
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
            res.render("checkResult/detail", { checkResult,user:req.session.user ? req.session.user : null });
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
                errors : req.query.errors ? req.query.errors.split(";") : null,
                user:req.session.user ? req.session.user : null
             })
        }).catch(err => console.log(err));
    }

    static createCR(req, res) {
        const doctorId = req.params.doctorId;
        const { patientId, deseaseId, medicine, description } = req.body;
        // console.log(patientId)
        CheckResult.create({ doctorId, patientId, deseaseId, medicine, description })
            .then(() => {
                return User.findByPk(patientId)
            .then((data)=>{
                memory.UserId = 1;
                memory.email = data.email + ''
                // console.log(data)
                let mailOptions = {
                    from: "testinghaloprof@gmail.com",
                    to: memory.email,
                    subject: "Halo Prof Register",
                    text: `Terima kasih telah menggunakan jasa Halo Prof, obat yang harus anda konsumsi ${medicine}`,
                  };
          
                  transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("Email Sent:" + info.response);
                    }
                  });
                res.redirect(`/doctor/${doctorId}/checkResult`)
            })
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
                errors : req.query.errors ? req.query.errors.split(";") : null,
                user:req.session.user ? req.session.user : null
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