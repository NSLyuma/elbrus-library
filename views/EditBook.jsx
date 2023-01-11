const React = require('react');
const Footer = require('./Footer');
const Header = require('./Header');
const Layout = require('./Layout');

module.exports = function EditBook({ book }) {
  return (
    <Layout>
      <Header url="authorized" />
      <h3>Редактирование книги</h3>
      <form className="js-edit" action={`/books/${book.id}`}>
        <input
          name="title"
          type="text"
          placeholder="Название"
          value={book.title}
        />

        <textarea
          name="description"
          placeholder="Описание"
          value={book.description}
        />

        <input
          name="image"
          type="text"
          placeholder="Ссылка на обложку"
          value={book.image}
        />

        <input
          name="link"
          type="text"
          placeholder="Ссылка на книгу"
          value={book.link}
        />

        <button type="submit">Сохранить</button>
        <a href="/books">Отмена</a>
      </form>
      <Footer />
    </Layout>
  );
};
