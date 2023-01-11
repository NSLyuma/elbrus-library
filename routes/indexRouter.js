const indexRouter = require('express').Router();

indexRouter.get('/', (req, res) => {
  res.redirect('/books');
});

module.exports = indexRouter;
