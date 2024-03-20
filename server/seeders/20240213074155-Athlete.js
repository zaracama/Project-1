'use strict';
const {encodePassword} = require(`../helpers/bcryptjs`)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataAthlete = require(`../data/Athletes.json`).map(el => {
      el.password = encodePassword(el)
      el.createdAt = el.updatedAt = new Date()
      return el
     })
     await queryInterface.bulkInsert("Athletes", dataAthlete)
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete("Athletes")
    }
};
