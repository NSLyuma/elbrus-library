const React = require('react');

module.exports = function Menu({ userId }) {
  return (
    <nav>
      <ul>
        <li>
          <a href="/books/new">Добавить книгу</a>
        </li>
        <li>
          <a href={`/users/${userId}/books`}>Мои книги</a>
        </li>
        <li>
          <a className="js-logout" href={`/users/${userId}`}>
            Выход
          </a>
        </li>
      </ul>
    </nav>
  );
};
