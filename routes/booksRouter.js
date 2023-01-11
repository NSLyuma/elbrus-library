const booksRouter = require('express').Router();
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { User } = require('../db/models');
const { Book } = require('../db/models');
const { Comment } = require('../db/models');
const BookList = require('../views/BookList');
const BookShow = require('../views/BookShow');
const CommentList = require('../views/CommentList');
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
    book = await Book.findOne({
      where: { id: bookId },
      include: [Book.Likes, Book.Comments],
    });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookList, {
      error: 'Ошибка сервера',
    });
    return;
  }

  let comments;

  try {
    comments = await Comment.findAll({
      where: { bookId },
      include: Comment.Author,
    });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookShow, { url, error: 'Ошибка сервера' });
    return;
  }

  res.renderComponent(BookShow, { book, userId, url, comments });
});

booksRouter.post('/:id', async (req, res) => {
  const bookId = req.params.id;
  const { userId } = req.session;
  const url = userId ? 'authorized' : '';
  const commentText = req.body.comment;

  let comment;

  try {
    comment = await Comment.create({
      userId,
      bookId,
      text: commentText,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    comment.save();
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookShow, { url, error: 'Ошибка сервера' });
    return;
  }

  let comments;

  try {
    comments = await Comment.findAll({
      where: { bookId },
      include: Comment.Author,
      order: [['id', 'ASC']],
    });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(BookShow, { url, error: 'Ошибка сервера' });
    return;
  }

  // так и не поняла, как устанавливать doctype: false
  const list = React.createElement(CommentList, { comments });
  const html = ReactDOMServer.renderToStaticMarkup(list);
  res.send(html);
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
      url: 'authorized',
      error: 'Ошибка сервера',
    });
    return;
  }

  if (userId !== book.userId) {
    res.status(403).renderComponent(BookList, {
      url,
      error: 'Вы не можете удалить эту книгу!',
    });
    return;
  }

  book.destroy();

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

booksRouter.get('/:id/download', (req, res) => {
  res.send(req.files);
});

module.exports = booksRouter;
