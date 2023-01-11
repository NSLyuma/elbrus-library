const booksRouter = require('express').Router();
const { User } = require('../db/models');
const { Book } = require('../db/models');
const BookList = require('../views/BookList');
const BookShow = require('../views/BookShow');
const EditBook = require('../views/EditBook');

booksRouter.get('/', async (req, res) => {
  const { userId } = req.session;
  const url = userId ? 'authorized' : '';
  let books;

  try {
    books = await Book.findAll({
      include: Book.Likes,
      order: [['id', 'ASC']],
    });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      url,
      error: 'Ошибка сервера',
    });
    return;
  }

  res.renderComponent(BookList, { books, url, userId });
});

booksRouter.post('/', async (req, res) => {
  let book;

  try {
    book = await Book.create({
      title: req.body.title.trim(),
      description: req.body.description,
      image: req.body.image,
      link: req.body.link,
      userId: req.session.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    book.save();

    res.redirect('/');
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      url: 'authorized',
      error: 'Ошибка сервера',
    });
    return;
  }
});

booksRouter.get('/:id', async (req, res) => {
  const bookId = req.params.id;
  const { userId } = req.session;
  const url = userId ? 'authorized' : '';
  let book;

  try {
    book = await Book.findOne({ where: { id: bookId }, include: Book.Likes });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      error: 'Ошибка сервера',
    });
    return;
  }

  res.renderComponent(BookShow, { book, userId, url });
});

booksRouter.put('/:id', async (req, res) => {
  const { userId } = req.session;
  let book;

  try {
    book = await Book.findOne({
      where: { id: req.params.id },
      include: Book.Likes,
    });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      url: 'authorized',
      error: 'Ошибка сервера',
    });
    return;
  }

  const { title, description, image, link } = req.body;

  book.title = title;
  book.description = description;
  book.image = image;
  book.link = link;

  book.save();

  res.renderComponent(BookShow, { book, userId });
});

booksRouter.delete('/:id', async (req, res) => {
  try {
    await Book.destroy({ where: { id: req.params.id } });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      url: 'authorized',
      error: 'Ошибка сервера',
    });
    return;
  }

  const { userId } = req.session;
  const url = userId ? 'authorized' : '';
  let books;

  try {
    books = await Book.findAll({
      include: Book.Likes,
      order: [['id', 'ASC']],
    });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      url,
      error: 'Ошибка сервера',
    });
    return;
  }

  res.renderComponent(BookList, { books, url, userId });
});

booksRouter.get('/:id/edit', async (req, res) => {
  const { userId } = req.session;
  const url = userId ? 'authorized' : '';
  let user;

  try {
    user = await User.findByPk(userId);
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      error: 'Ошибка сервера',
    });
    return;
  }

  if (!user) {
    res.status(403).renderComponent(BookList, {
      error: 'Вы не авторизованы!',
    });
    return;
  }

  let book;

  try {
    book = await Book.findByPk(req.params.id);
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      url,
      error: 'Ошибка сервера',
    });
    return;
  }

  if (userId !== book.userId) {
    res.status(403).renderComponent(BookList, {
      url,
      error: 'Вы не можете редактировать эту книгу!',
    });
    return;
  }

  res.renderComponent(EditBook, { book });
});

module.exports = booksRouter;
