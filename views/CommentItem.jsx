const React = require('react');

module.exports = function BookItem({ comment }) {
  return <li>{comment.text}</li>;
};
