const logout = document.querySelector('.js-logout');

if (logout) {
  logout.addEventListener('click', async (event) => {
    event.preventDefault();

    const url = logout.href;

    await fetch(url, { method: 'DELETE' });

    window.location.assign('/');
  });
}

const editForm = document.querySelector('.js-edit');

if (editForm) {
  editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const url = editForm.action;

    const title = event.target.title.value;
    const description = event.target.description.value;
    const image = event.target.image.value;
    const link = event.target.link.value;

    const data = JSON.stringify({
      title,
      description,
      image,
      link,
    });

    await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    });

    window.location.assign(url);
  });
}

const deleteBtn = document.querySelector('.js-delete-book');

if (deleteBtn) {
  deleteBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    const book = event.target.closest('.js-book');
    const url = deleteBtn.href;

    await fetch(url, { method: 'DELETE' });

    if (book) {
      book.remove();
    }

    window.location.assign('/');
  });
}
