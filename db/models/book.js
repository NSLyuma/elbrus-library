const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate({ User }) {
      Book.Author = Book.belongsTo(User, {
        foreignKey: 'userId',
        as: 'author',
      });

      Book.Likes = Book.belongsToMany(User, {
        through: 'Likes',
        foreignKey: 'bookId',
        otherKey: 'userId',
        as: 'likedByUsers',
      });
    }
  }

  const attributes = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.TEXT,
    },
    link: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  };

  const options = {
    sequelize,
    modelName: 'Book',
  };

  Book.init(attributes, options);
  return Book;
};
