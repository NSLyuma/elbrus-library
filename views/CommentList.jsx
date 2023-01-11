const React = require('react');
const CommentItem = require('./CommentItem');

module.exports = function CommentsList({ comments }) {
  return (
    <ul>
      {comments && comments.map((comment) => <CommentItem comment={comment} />)}
    </ul>
  );
};
