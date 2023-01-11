const React = require('react');
const CommentItem = require('./CommentItem');
const Footer = require('./Footer');
const Header = require('./Header');
const Layout = require('./Layout');
const NewComment = require('./NewComment');

module.exports = function BookShow({ book, userId, url, error }) {
  return (
    <Layout>
      <Header url={url} userId={userId} />

      {error && (
        <div>
          <h3>Ошибка</h3>
          <p>{error}</p>
        </div>
      )}

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
          <div>
            <h4>
              Комментарии
              <span> {book.commentedByUsers.length || 0}</span>
            </h4>
            <ul>
              <CommentItem comment={book.commentedByUsers} />
            </ul>
            <NewComment id={book.id} />
          </div>
        </div>
      )}

      <Footer />
    </Layout>
  );
};
