const React = require('react');
const Footer = require('./Footer');
const Header = require('./Header');
const Layout = require('./Layout');

module.exports = function NewBook() {
  return (
    <Layout>
      <Header url="authorized" />
      <h3>Добавление новой книги</h3>
      <form action="/books" method="POST">
        <input name="title" type="text" placeholder="Название" />

        <textarea name="description" placeholder="Описание" />

        <input name="image" type="text" placeholder="Ссылка на обложку" />

        <input name="link" type="text" placeholder="Ссылка на книгу" />

        <button type="submit">Добавить</button>
      </form>
      <Footer />
    </Layout>
  );
};
