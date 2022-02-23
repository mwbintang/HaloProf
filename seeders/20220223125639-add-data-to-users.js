'use strict';
const fs = require('fs')
const bcrypt = require('bcrypt')
let data = JSON.parse(fs.readFileSync('./data/user.json','utf8'))
let newData = data.map(el=>{
  // el.createdAt = new Date()
  // el.updatedAt = new Date()
  bcrypt.hash(el.password, 10)
.then((result)=>{
  console.log(result)
  return result
})
.catch(err=>{
  console.log(err)
})
})
console.log(newData)
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
     return queryInterface.bulkInsert('Users', data, {})
  },

  down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', data, {})
  }
};
