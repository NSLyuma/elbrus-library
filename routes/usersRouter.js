const usersRouter = require('express').Router();
const { User } = require('../db/models');
const { Book } = require('../db/models');
const BookList = require('../views/BookList');

usersRouter.delete('/:id', async (req, res) => {
  req.session.destroy();
  res.clearCookie('user_sid');

  let books;

  try {
    books = await Book.findAll();
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      error: 'Ошибка сервера',
    });
    return;
  }

  res.renderComponent(BookList, { books });
});

usersRouter.get('/:id/books', async (req, res) => {
  let books;
  const { userId } = req.session;
  const url = userId ? 'authorized' : '';

  try {
    books = await Book.findAll({ where: { userId }, include: Book.Likes });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      error: 'Ошибка сервера',
    });
    return;
  }
  res.renderComponent(BookList, { books, url, userId });
});

usersRouter.get('/:id/books/:bookId', async (req, res) => {
  const { userId } = req.session;
  const { bookId } = req.params;
  const url = userId ? 'authorized' : '';

  let user;

  try {
    user = await User.findOne({ where: { id: userId }, include: User.Likes });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      url,
      error: 'Ошибка сервера',
    });
    return;
  }

  let book;

  try {
    book = await Book.findOne({ where: { id: bookId }, include: Book.Likes });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      url,
      error: 'Ошибка сервера',
    });
    return;
  }

  let userLikedBook = false;

  user.likedBooks.forEach((item) => {
    if (item.dataValues.id === book.dataValues.id) {
      userLikedBook = true;
    }
    return userLikedBook;
  });

  if (userLikedBook) {
    user.removeLikedBook(book);
    user.save();
  } else {
    user.addLikedBook(book);
    user.save();
  }

  res.redirect('/books');
});

module.exports = usersRouter;
