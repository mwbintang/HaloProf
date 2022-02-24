const {CheckResult,User,Desease,Doctor,Profile} = require("../models/index")

class UserController{
    static showUserProfile(req,res){
        const id = req.params.userId;
        User.findOne({
            include:[{
                model:CheckResult,
                as: 'userRecord',
                include:[{
                    model:Desease
                },{
                    model:User,
                    as:"Doctor",
                    include:Profile
                }],
            },
            {
                model:Profile
            }],
            where:{
                id:id
            }
        }).then(patient => {
            res.render("user/profile",{patient,user:req.session.user ? req.session.user : null})
        }).catch(err => console.log(err));
    }
}

module.exports = UserController;