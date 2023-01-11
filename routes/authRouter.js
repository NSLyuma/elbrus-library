const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const Auth = require('../views/Auth');
const { User } = require('../db/models');

authRouter.get('/login', (req, res) => {
  res.renderComponent(Auth, { url: 'login' });
});

authRouter.post('/login', async (req, res) => {
  const url = 'login';

  const isEmail = Boolean(req.body.email.trim());
  const isPassword = Boolean(req.body.password);

  if (!isEmail || !isPassword) {
    res
      .status(403)
      .renderComponent(Auth, { url, error: 'Введите email и пароль!' });
    return;
  }

  let user;

  try {
    user = await User.findOne({ where: { email: req.body.email } });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(Auth, {
      url,
      error: 'Ошибка сервера',
    });
    return;
  }

  if (!user) {
    res.status(403).renderComponent(Auth, {
      url,
      error: 'Неверный email или пароль!',
    });
    return;
  }

  const rawPassword = req.body.password;
  const hashedPassword = user.password;
  let isSame;

  try {
    isSame = await bcrypt.compare(rawPassword, hashedPassword);
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(Auth, {
      url,
      error: 'Ошибка сервера',
    });
    return;
  }

  if (!isSame) {
    res.status(403).renderComponent(Auth, {
      url,
      error: 'Неверный email или пароль!',
    });
    return;
  }

  req.session.userId = user.id;

  res.redirect('/books');
});

authRouter.get('/register', (req, res) => {
  res.renderComponent(Auth, { url: 'register' });
});

authRouter.post('/register', async (req, res) => {
  const url = 'register';

  if (req.body.name.trim().length < 3) {
    res.status(403).renderComponent(Auth, {
      url,
      error: 'Логин должен содержать минимум 3 символа!',
    });
    return;
  }

  if (!req.body.email.includes('@')) {
    res.status(403).renderComponent(Auth, {
      url,
      error: 'Email должен содержать символ @!',
    });
    return;
  }

  const rawPassword = req.body.password.trim();

  if (rawPassword.length < 4) {
    res.status(403).renderComponent(Auth, {
      url,
      error: 'Пароль должен содержать минимум 4 символа без пробелов!',
    });
    return;
  }

  let isEmailRepeat;

  try {
    isEmailRepeat = await User.findOne({ where: { email: req.body.email } });
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(Auth, {
      url,
      error: 'Ошибка сервера',
    });
    return;
  }

  if (isEmailRepeat) {
    res.status(403).renderComponent(Auth, {
      url,
      error: 'Пользователь с такой почтой уже существует!',
    });
    return;
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(
      rawPassword,
      Number(process.env.SALT_ROUNDS) || 11,
    );
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(Auth, {
      url,
      error: 'Ошибка сервера',
    });
    return;
  }

  const userGroup = req.body.group === 'Группа' ? null : req.body.group;
  const userYear = req.body.year === 'Год обучения' ? null : req.body.year;

  try {
    const user = await User.create({
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      password: hashedPassword,
      group: userGroup,
      year: Number(userYear),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    user.save();

    req.session.userId = user.id;

    res.redirect('/books');
  } catch (error) {
    console.log(`Ошибка сервера: ${error.message}`);
    res.status(500).renderComponent(Auth, {
      url,
      error: `Не удалось зарегистрироваться! ${error.message}`,
    });
  }
});

module.exports = authRouter;
