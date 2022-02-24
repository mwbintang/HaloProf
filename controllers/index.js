class Controller{
    static home(req, res){
        if(req.session.user){
            if(req.session.user.role === "doctor"){
                res.redirect(`/doctor/${req.session.user.id}/checkResult`)
            }else{
                res.redirect(`/user/${req.session.user.id}`)
            }
        }else{
            res.render('home',{
                error:req.query.error? req.query.error : null,
                user: null
            })
        }
    }

    static isUserAlreadyLogin(req, res, next){
        if (!req.session.user) res.redirect("/?error=anda+belum+login");
        else next()
    }

    static isUserADoctor(req, res, next){
        if (req.session.user.role !== 'doctor') res.redirect("/?error=anda+bukan+dokter");
        else next()
    }

    static redirectIfFalse(req,res){
        
    }
    
}

module.exports = Controller