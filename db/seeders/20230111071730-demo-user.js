const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const rawPassword = process.env.DEMO_PASSWORD || 'test';
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(rawPassword, saltRounds);
    } catch (error) {
      console.log(`Ошибка при создании сида demo-user: ${error.message}`);
    }

    const user = [
      {
        name: process.env.DEMO_USER || 'test',
        email: process.env.DEMO_EMAIL || 'test@test',
        password: hashedPassword,
        group: 'Совы',
        year: 2022,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Users', user);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users');
  },
};
