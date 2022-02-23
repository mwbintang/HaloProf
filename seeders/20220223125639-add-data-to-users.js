'use strict';
const fs = require('fs')
const bcrypt = require('bcrypt')
// console.log(newData)
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
   let data = JSON.parse(fs.readFileSync('./data/user.json','utf8'))
   // let newData = []
   let newData = data.map(el=>{
     // console.log(el)
     // el.createdAt = new Date()
     // el.updatedAt = new Date()
     bcrypt.hash(el.password, 10)
   .then((result)=>{
     // console.log(result)
   
     return ({username:el.username, email:el.email, password: result, profileId:el.profileId, createdAt:new Date(), updatedAt:new Date()})
   })
   .then()
   .catch(err=>{
     console.log(err)
   })
   })
     return queryInterface.bulkInsert('Users', newData, {})
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
