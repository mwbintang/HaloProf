'use strict';
const fs = require("fs");
const bcrypt = require("bcrypt")
let users = JSON.parse(fs.readFileSync("./data/user.json"));
module.exports = {
	up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		*/
		users.forEach(u => {
			u.createdAt = new Date();
			u.updatedAt = new Date();
			const salt = bcrypt.genSaltSync(10);
			u.password = bcrypt.hashSync('password', salt);
			console.log(u.password);
		});
		return queryInterface.bulkInsert("Users", users, {});
	},

	down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete("Users", null, {});
	}
};
