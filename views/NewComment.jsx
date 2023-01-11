const React = require('react');

module.exports = function NewComment({ id }) {
  return (
    <div>
      <h3>Оставьте свой комментарий</h3>
      <form className="js-new-comment" action={`/books/${id}`} method="POST">
        <textarea name="comment" placeholder="Пишите здесь" />
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};
