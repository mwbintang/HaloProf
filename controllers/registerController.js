const {User, Profile} = require('../models')
const bcrypt = require('bcrypt')

class registerController{
    static registerAdd(req, res){
        res.render('register')
    }
    static registerPost(req, res){
        const {firstName, lastName, age, gender} = req.body
        const { password, username, email} = req.body
        // console.log(req.body)
        let result
            bcrypt.hash(password, 10)
                .then((data)=>{
                    result = data
                    return Profile.create({
                        firstName,
                        lastName,
                        age,
                        gender
                        })
                    })
                .then((data)=>{
                    console.log(data)
                    return User.create({
                        username,
                        email,
                        password: result,
                        profileId:data.id
                    })
                })
                .then(()=>{
                    res.redirect('/')
                })
                .catch(err=>{
                    res.send(err)
                })
    }
}

module.exports = registerController;