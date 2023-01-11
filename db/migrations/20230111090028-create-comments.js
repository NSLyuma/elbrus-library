/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      bookId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      text: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    };
    await queryInterface.createTable('Comments', attributes);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Comments');
  },
};
