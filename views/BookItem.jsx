const React = require('react');

module.exports = function BookItem({ book, userId }) {
  return (
    <li className="js-book">
      <img width="100px" src={book.image} alt="cover" />
      <a href={`/books/${book.id}`}>{book.title}</a>
      <a href={book.link} target="_blank">
        {book.link}
      </a>

      {userId === book.userId && (
        <div>
          <a href={`/books/${book.id}/edit`}>Редактировать</a>
          <a className="js-delete-book" href={`/books/${book.id}`}>
            Удалить
          </a>
        </div>
      )}

      {userId && (
        <div>
          <a className="js-like" href={`/users/${userId}/books/${book.id}`}>
            Like
          </a>
          <p>
            Likes:
            <span>{book.likedByUsers.length || 0}</span>
          </p>
        </div>
      )}

      <a href={`/books/${book.id}/download`}>Скачать книгу</a>
    </li>
  );
};
