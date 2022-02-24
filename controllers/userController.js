const {CheckResult,User,Desease,Doctor,Profile} = require("../models/index")

class UserController{
    static showUserProfile(req,res){
        const id = req.params.userId;
        User.findByPk(id, {
            include:[{
                model:CheckResult,
                include:[{
                    model:Desease
                },{
                    model:Doctor
                }],
            },{
                model:Profile
            }]
        }).then(user => {
            res.render("user/profile",{user})
        })
    }
}

module.exports = UserController;