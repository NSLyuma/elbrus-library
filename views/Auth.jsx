const React = require('react');
const Footer = require('./Footer');
const Header = require('./Header');
const Layout = require('./Layout');

module.exports = function Auth({ url, error }) {
  const btnText = url === 'login' ? 'Войти' : 'Зарегистрироваться';

  const years = [];
  for (let i = 2018; i <= 2077; i += 1) {
    years.push(i);
  }

  return (
    <Layout>
      <Header url={url} />

      <div>
        {error && (
          <div>
            <h3>Ошибка</h3>
            <p>{error}</p>
          </div>
        )}

        <form action={`/auth/${url}`} method="POST">
          {url === 'register' && (
            <input name="name" type="text" placeholder="Введите логин" />
          )}

          <input name="email" type="text" placeholder="Введите email" />

          <input name="password" type="password" placeholder="Введите пароль" />

          {url === 'register' && (
            <select name="group">
              <option value={null}>Группа</option>
              <option value="Орлы">Орлы</option>
              <option value="Совы">Совы</option>
              <option value="Пчёлы">Пчёлы</option>
              <option value="Медведи">Медведи</option>
              <option value="Еноты">Еноты</option>
              <option value="Лисы">Лисы</option>
              <option value="Волки">Волки</option>
              <option value="Бобры">Бобры</option>
              <option value="Ежи">Ежи</option>
            </select>
          )}

          {url === 'register' && (
            <select name="year">
              <option value={0}>Год обучения</option>
              {years.map((year) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          )}

          <button type="submit">{btnText}</button>
        </form>
      </div>

      <Footer />
    </Layout>
  );
};
