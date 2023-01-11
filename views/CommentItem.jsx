const React = require('react');

module.exports = function CommentItem({ comment }) {
  return (
    <li className="js-comment">
      <p>Пользователь: {comment.author.name}</p>
      <p>Комментарий: {comment.text}</p>
    </li>
  );
};
