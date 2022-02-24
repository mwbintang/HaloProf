class Controller{
    static home(req, res){
        res.render('home')
    }

    static isUserAlreadyLogin(req, res, next){
        if (!req.session.userRole) res.redirect("/?error=anda+belum+login");
        else next()
    }

    static isUserADoctor(req, res, next){
        if (req.session.userRole !== 'doctor') res.redirect("/?error=anda+bukan+dokter");
        else next()
    }
    
}

module.exports = Controller