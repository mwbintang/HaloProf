class Controller{
    static home(req, res){
        res.render('home',{
            error:req.query.error? req.query.error : null,
            user:req.session.user ? req.session.user : null
        })
    }

    static isUserAlreadyLogin(req, res, next){
        if (!req.session.user) res.redirect("/?error=anda+belum+login");
        else next()
    }

    static isUserADoctor(req, res, next){
        if (req.session.user.role !== 'doctor') res.redirect("/?error=anda+bukan+dokter");
        else next()
    }
    
}

module.exports = Controller