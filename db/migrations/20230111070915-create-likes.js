/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const attributes = {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
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
    await queryInterface.createTable('Likes', attributes);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Likes');
  },
};
