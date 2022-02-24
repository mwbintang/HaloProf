'use strict';
const fs = require("fs");
let deseases = JSON.parse(fs.readFileSync("./data/deseases.json"));
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
		deseases.forEach(ds => {
			ds.createdAt = new Date();
			ds.updatedAt = new Date();
		});
		return queryInterface.bulkInsert("Deseases", deseases, {});
	},

	down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		 return queryInterface.bulkDelete("Deseases", null, {});
	}
};
