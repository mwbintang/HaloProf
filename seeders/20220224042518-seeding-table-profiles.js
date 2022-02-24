'use strict';
const fs = require("fs");
let profiles = JSON.parse(fs.readFileSync("./data/profile.json"));
module.exports = {
  up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   profiles.forEach(pr => {
      pr.createdAt = new Date();
      pr.updatedAt = new Date();
   });
   return queryInterface.bulkInsert("Profiles", profiles,{});
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
	 return queryInterface.bulkDelete("Profiles", null, {});
  }
};
