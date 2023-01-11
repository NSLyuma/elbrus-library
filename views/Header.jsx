const React = require('react');
const Menu = require('./Menu');

module.exports = function Header({ url, userId }) {
  let headerRight;

  switch (url) {
    case 'login':
      headerRight = (
        <a className="header_link" href="/auth/register">
          Регистрация
        </a>
      );
      break;
    case 'register':
      headerRight = (
        <a className="header_link" href="/auth/login">
          Вход
        </a>
      );
      break;
    case 'authorized':
      headerRight = <Menu userId={userId} />;
      break;
    default:
      headerRight = (
        <div>
          <a href="/auth/login">Вход</a>
          <p> | </p>
          <a href="/auth/register">Регистрация</a>
        </div>
      );
      break;
  }

  return (
    <header>
      <a href="/books">LOGO</a>
      {headerRight}
    </header>
  );
};
