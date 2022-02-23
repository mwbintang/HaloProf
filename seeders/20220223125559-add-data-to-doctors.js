'use strict';
const fs = require('fs')
const bcrypt = require('bcrypt')
let data = JSON.parse(fs.readFileSync('./data/docter.json','utf8'))
data.forEach(el=>{
  el.createdAt = new Date()
  el.updatedAt = new Date()
  bcrypt.hash(el.password, 10)
  .then((result)=>{
   //  console.log(result)
    el.password = result
  })
  .catch(err=>{
    console.log(err)
  })
})
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
   return queryInterface.bulkInsert('Doctors', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
   return queryInterface.bulkDelete('Doctors', null, {})
  }  
};
