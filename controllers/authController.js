const { User, Profile } = require('../models')
const bcrypt = require('bcrypt')
const nodemailer = require("nodemailer");


let memory = {};
let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "testinghaloprof@gmail.com",
		pass: "b123b123",
	},
});

class AuthController {
	static registerAdd(req, res) {
		const {error} = req.query
		if(req.session.user){
			if(req.session.user.role === "doctor"){
                res.redirect(`/doctor/${req.session.user.id}/checkResult`)
            }else{
                res.redirect(`/user/${req.session.user.id}`)
            }
		}else{
			res.render('auth/register', {error, user:req.session.user ? req.session.user : null})
		}
	}
	static registerPost(req, res) {
		// console.log(req.body)
		const { firstName, lastName, age, gender } = req.body
		const { password, username, email } = req.body
		if(!password || !username || !email){
			User.create({password, username, email})
				.then()
				.catch(err => {
					if(err.name === "SequelizeValidationError"){
						let error = err.errors.map(el => el.message)
						res.redirect(`/register?error=${error}`)
					}else{
						res.send(err)
					}
				})
		}else{
			memory.UserId = 1;
		memory.email = email + ''
		let result
		bcrypt.hash(password, 10)
		.then((data) => {
			result = data
			return Profile.create({
				firstName,
				lastName,
				age,
				gender
			})
		})
			.then((data) => {
				console.log(data)
				return User.create({
					username,
					email,
					password: result,
					profileId: data.id
				})
			})
			.then(() => {
				let mailOptions = {
					from: "mwbintang@yahoo.com",
					to: memory.email,
					subject: "Halo Prof Register",
					text: `Telah Registrasi di Halo Prof dengan nama user ${username}`,
				};

				transporter.sendMail(mailOptions, (err, info) => {
					if (err) {
						console.log(err);
					} else {
						console.log("Email Sent:" + info.response);
					}
				});
				//   res.render("appointment", { data });
				res.redirect('/')
			})
			.catch(err => {
				if(err.name === "SequelizeValidationError"){
					let error = err.errors.map(el => el.message)
                    res.redirect(`/register?error=${error}`)
				}else{
					res.send(err)
				}
			})
		}
	}

	static showFormlogin(req, res) {
		if(req.session.user){
			if(req.session.user.role === "doctor"){
                res.redirect(`/doctor/${req.session.user.id}/checkResult`)
            }else{
                res.redirect(`/user/${req.session.user.id}`)
            }
		}else{
			res.render("auth/login",{
				error:req.query.error? req.query.error : null,
				user:req.session.user ? req.session.user : null
			})
		}
	}

	static login(req, res) {
		let { username, password } = req.body;
		let user;
		User.findOne({
			where: {
				username: username
			}
		}).then(u => {
			if (!u) {
				res.redirect("/login?error=Username/Password+is+incorrect")
			} else {
				user = u;
				return bcrypt.compare(password, user.password);
			}
		}).then(result => {
			console.log(result);
			if(result === true){
				req.session.user = user;
				if(user.role === "doctor"){
					res.redirect(`/doctor/${user.id}/checkResult`)
				}else{
					res.redirect(`/user/${user.id}`)
				}
			}else{
				res.redirect("/login?error=Username/Password+is+incorrect")
			}
		}).catch(err => console.log(err))
	}

	static logout(req, res) {
		req.session.destroy();
    	res.redirect('/');
	}
}

module.exports = AuthController;