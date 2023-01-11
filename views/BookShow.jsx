const React = require('react');
const Footer = require('./Footer');
const Header = require('./Header');
const Layout = require('./Layout');

module.exports = function BookShow({ book, userId, url }) {
  return (
    <Layout>
      <Header url={url} userId={userId} />

      <img width="200px" src={book.image} alt="cover" />
      <p>{book.title}</p>
      <a href={book.link} target="_blank">
        {book.link}
      </a>
      <p>{book.description}</p>

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
          <a href={`/users/${userId}/books/${book.id}`}>Like</a>
          <p>
            Likes:
            <span>{book.likedByUsers.length || 0}</span>
          </p>
        </div>
      )}

      <Footer />
    </Layout>
  );
};
