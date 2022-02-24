'use strict';
const fs = require("fs");
let checkResults = JSON.parse(fs.readFileSync("./data/checkResults.json"));
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
		checkResults.forEach(pr => {
			pr.createdAt = new Date();
			pr.updatedAt = new Date();
		});
		return queryInterface.bulkInsert("CheckResults", checkResults, {});
	},

	down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		 return queryInterface.bulkDelete("CheckResults", null, {});
	}
};
