'use strict';
const fs = require('fs')
const bcrypt = require('bcrypt')
let data = JSON.parse(fs.readFileSync('./data/user.json', 'utf8'));
// >>>>>>> f98b75e186c0a9227d4ce90664fbd1aaa398faa9

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
		data.forEach(el => {
			el.createdAt = new Date()
			el.updatedAt = new Date()
			el.password = bcrypt.hashSync(el.password, 10)
			console.log(el.password);
		})
		return queryInterface.bulkInsert('Users', data, {})
	},

	down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		return queryInterface.bulkDelete('Users', data, {})
	}
};
