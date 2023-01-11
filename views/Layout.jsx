const React = require('react');

module.exports = function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Библиотека Эльбрус</title>
        <script defer src="/js/client.js" />
      </head>
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};
