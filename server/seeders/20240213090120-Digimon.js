'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataDigimon = require(`../data/Digimon.json`).map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
     })
     await queryInterface.bulkInsert("Digimons", dataDigimon)
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete("Digimons")
  }
};