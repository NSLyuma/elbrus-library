const indexRouter = require('express').Router();
const { User } = require('../db/models');
const BookList = require('../views/BookList');
const NewBook = require('../views/NewBook');

indexRouter.get('/', (req, res) => {
  res.redirect('/books');
});

indexRouter.get('/new', async (req, res) => {
  const { userId } = req.session;
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

  res.renderComponent(NewBook);
});

module.exports = indexRouter;
