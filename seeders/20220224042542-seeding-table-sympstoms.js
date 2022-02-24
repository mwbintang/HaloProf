'use strict';
const fs = require("fs");
let symptoms = JSON.parse(fs.readFileSync("./data/symptoms.json"));
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
		symptoms.forEach(sy => {
			sy.createdAt = new Date();
			sy.updatedAt = new Date();
		 });
		return queryInterface.bulkInsert("Symptoms", symptoms,{});
	},

	down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		 return queryInterface.bulkDelete("Symptoms", null,{});
	}
};
