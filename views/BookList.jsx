const React = require('react');
const BookItem = require('./BookItem');
const Footer = require('./Footer');
const Header = require('./Header');
const Layout = require('./Layout');

module.exports = function BookList({ books, url, userId, error }) {
  return (
    <Layout>
      <Header url={url} userId={userId} />

      <div>
        {error && (
          <div>
            <h3>Ошибка</h3>
            <p>{error}</p>
          </div>
        )}

        <ul>
          {books &&
            books.map((book) => (
              <BookItem key={book.id} book={book} userId={userId} />
            ))}
        </ul>
      </div>

      <Footer />
    </Layout>
  );
};
