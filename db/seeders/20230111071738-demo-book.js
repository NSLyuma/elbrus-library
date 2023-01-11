/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const book = [
      {
        title: 'Book title',
        description: 'Book description',
        image: 'https://picsum.photos/200',
        link: 'Book link',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Books', book);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Books');
  },
};
