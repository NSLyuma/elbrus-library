const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Book, Comment }) {
      User.Books = User.hasMany(Book, {
        foreignKey: 'userId',
        as: 'books',
      });

      User.Likes = User.belongsToMany(Book, {
        through: 'Likes',
        foreignKey: 'userId',
        otherKey: 'bookId',
        as: 'likedBooks',
      });

      User.Comments = User.hasMany(Comment, {
        foreignKey: 'userId',
        as: 'comments',
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
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    email: {
      unique: true,
      allowNull: false,
      type: DataTypes.TEXT,
    },
    password: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    group: {
      type: DataTypes.TEXT,
    },
    year: {
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
    modelName: 'User',
    tableName: 'Users',
  };

  User.init(attributes, options);
  return User;
};
