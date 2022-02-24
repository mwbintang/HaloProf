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
		res.render('auth/register')
	}
	static registerPost(req, res) {
		const { firstName, lastName, age, gender } = req.body
		const { password, username, email } = req.body
		console.log(email)
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
				res.send(err)
			})
	}

	static showFormlogin(req, res) {
		console.log(req.query);
		res.render("auth/login")
	}

	static login(req, res) {
		let { username, password } = req.body;
		let user;
		User.findOne({
			where: {
				email: username
			}
		}).then(u => {
			if (!u) {
				res.redirect("/login?error=Username/Password+is+incorrect")
			} else {
				user = u;
<<<<<<< HEAD
				console.log(password)
				console.log(u.password)
				return bcrypt.compare(password, u.password);
=======
				return bcrypt.compare(password, user.password);
>>>>>>> a81e1b68a9bed1f766382a240581e7f51cf06bcd
			}
		}).then(result => {
			if(result === true){
				req.session.user = user;
			}else{
				res.redirect("/login?error=Username/Password+is+incorrect")
			}
		}).catch(err => console.log(err))
	}

	static logout(req, res) {
		console.log(req.session);
		req.session.destroy(function (err) {
			if(err) return res.send(err)
			res.redirect("/")
		})
	}
}

module.exports = AuthController;