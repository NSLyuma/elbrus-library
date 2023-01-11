const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Book }) {
      Comment.Book = Comment.belongsTo(Book, {
        foreignKey: 'bookId',
        as: 'commented',
      });

      Comment.Author = Comment.belongsTo(User, {
        foreignKey: 'userId',
        as: 'author',
      });
    }
  }

  const attributes = {
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    bookId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    text: {
      allowNull: false,
      type: DataTypes.TEXT,
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
    modelName: 'Comment',
    tableName: 'Comments',
  };

  Comment.init(attributes, options);
  return Comment;
};
