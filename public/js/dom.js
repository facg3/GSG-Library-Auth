const button = document.getElementById('create');
const allBook = document.getElementById('allBook');
const addBook = document.getElementById('addBook');
const add = document.getElementById('add');
const table = document.getElementById('table');
const edit = document.getElementById('edit');

addBook.addEventListener('click', () => {
  add.style.display = 'block';
  table.style.display = 'none';
  edit.style.display = 'none';
});
button.addEventListener('click', () => {
  const title = document.getElementById('Btitle').value;
  const author = document.getElementById('Bauthor').value;
  const edition = document.getElementById('Bedition').value;
  const publisher = document.getElementById('Bpublisher').value;
  const obj = {
    title,
    author,
    edition,
    publisher,
  };
  fetchPost('POST', '/insertData', (err, res) => {
    if (err) {} else {
      alert(' Book added ^.^ ');
      document.getElementById('Btitle').value = '';
      document.getElementById('Bauthor').value = '';
      document.getElementById('Bedition').value = '';
      document.getElementById('Bpublisher').value = '';
    }
  }, JSON.stringify(obj));
});

allBook.addEventListener('click', () => {
  add.style.display = 'none';
  table.style.display = 'none';
  fetchPost('GET', '/viewData', (err, res) => {
    if (err) {} else {
      const data = JSON.parse(res);
      data.forEach((item) => {
        functionAdd(item);
      });
    }
  });
  table.style.display = 'block';
});

function functionDelete(id, tr) {
  const confirmToDelete = confirm('Confirm To Delete Book! ;( ');
  if (confirmToDelete === true) {
    fetchPost('POST', '/deleteData', (err, res) => {
      if (err) {} else {
        tr.remove();
      }
    }, JSON.stringify(id));
  } else {
  }
}

function functionEdit(item, ptitle, pauthor, pedition, ppublisher) {
  const spanTitle = document.createElement('p');
  spanTitle.innerHTML = 'Edit Title';
  const inputTitle = document.createElement('INPUT');
  inputTitle.setAttribute('type', 'text');
  inputTitle.setAttribute('value', item.title);
  const spanAuthor = document.createElement('p');
  spanAuthor.innerHTML = 'Edit Author';
  const inputAuthor = document.createElement('INPUT');
  inputAuthor.setAttribute('type', 'text');
  inputAuthor.setAttribute('value', item.author);
  const spanEdtioin = document.createElement('p');
  spanEdtioin.innerHTML = 'Edit Edtion';
  const inputEdtion = document.createElement('INPUT');
  inputEdtion.setAttribute('type', 'text');
  inputEdtion.setAttribute('value', item.edition);
  const spanPublisher = document.createElement('p');
  spanPublisher.innerHTML = 'Edit Publisher';
  const inputPublisher = document.createElement('INPUT');
  inputPublisher.setAttribute('type', 'text');
  inputPublisher.setAttribute('value', item.publisher);
  const editBook = document.createElement('button');
  editBook.innerHTML = 'EDIT';
  edit.appendChild(spanTitle);
  edit.appendChild(inputTitle);
  edit.appendChild(spanAuthor);
  edit.appendChild(inputAuthor);
  edit.appendChild(spanEdtioin);
  edit.appendChild(inputEdtion);
  edit.appendChild(spanPublisher);
  edit.appendChild(inputPublisher);
  edit.appendChild(editBook);

  editBook.addEventListener('click', (event) => {
    const newData = {
      title: inputTitle.value,
      author: inputAuthor.value,
      edtion: inputEdtion.value,
      publisher: inputPublisher.value,
      id: item.id,
    };
    const convertData = JSON.stringify(newData);
    fetchPost('POST', '/editData', (err, res) => {
      if (err) {} else {
        ptitle.innerHTML = inputTitle.value;
        pauthor.innerHTML = inputAuthor.value;
        pedition.innerHTML = inputEdtion.value;
        ppublisher.innerHTML = inputPublisher.value;
        edit.style.display = 'none';
      }
    }, convertData);
    event.preventDefault();
  });
}

function functionAdd(item) {
  const tr = document.createElement('tr');
  const ptitle = document.createElement('td');
  ptitle.innerHTML = item.title;
  const pauthor = document.createElement('td');
  pauthor.innerHTML = item.author;
  const pedition = document.createElement('td');
  pedition.innerHTML = item.edition;
  const ppublisher = document.createElement('td');
  ppublisher.innerHTML = item.publisher;
  const deleteBook = document.createElement('button');
  deleteBook.innerHTML = 'DELETE';
  const editBook = document.createElement('button');
  editBook.innerHTML = 'EDIT';
  const option = document.createElement('td');

  tr.appendChild(ptitle);
  tr.appendChild(pauthor);
  tr.appendChild(pedition);
  tr.appendChild(ppublisher);
  option.appendChild(deleteBook);
  option.appendChild(editBook);
  tr.appendChild(option);
  table.appendChild(tr);
  deleteBook.addEventListener('click', (event) => {
    functionDelete(item.id, tr);
    event.preventDefault();
  });
  editBook.addEventListener('click', () => {
    functionEdit(item, ptitle, pauthor, pedition, ppublisher);
  });
}
