const button = document.getElementById('create');
const allBook = document.getElementById('allBook');
const addBook = document.getElementById('addBook');
const add = document.getElementById('add');
const table = document.getElementById('table');
const edit = document.getElementById('edit');
const logout = document.getElementById('logout')
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
logout.addEventListener('click', (e) => {
  e.preventDefault();
  fetchPost('GET', '/logout', (err, res) => {
    if (err) {
      console.log(err);
    } else if (res === '/') window.location.pathname = '/login';
  });
});
allBook.addEventListener('click', () => {
  add.style.display = 'none';
  // table.style.display = 'none';
  fetchPost('GET', '/viewData', (err, res) => {
    if (err) {} else {
      const data = JSON.parse(res);
      table.textContent = '';
      const tr = document.createElement('tr');
      table.appendChild(tr);
      const th1 = document.createElement('th');
      th1.textContent = 'Title';
      table.appendChild(th1);
      const th2 = document.createElement('th');
      th2.textContent = 'Author';
      table.appendChild(th2);
      const th3 = document.createElement('th');
      th3.textContent = 'Edition';
      table.appendChild(th3);
      const th4 = document.createElement('th');
      th4.textContent = 'Publisher';
      table.appendChild(th4);
      const th5 = document.createElement('th');
      th5.textContent = 'Option';
      table.appendChild(th5);

      data.forEach((item) => {
        functionAdd(item);
      });
    }
  });
  table.style.display = 'block';
});

function functionAdd(item) {
  const tr = document.createElement('tr');
  const ptitle = document.createElement('td');
  ptitle.textContent = item.title;
  const pauthor = document.createElement('td');
  pauthor.textContent = item.author;
  const pedition = document.createElement('td');
  pedition.textContent = item.edition;
  const ppublisher = document.createElement('td');
  ppublisher.textContent = item.publisher;
  const deleteBook = document.createElement('button');
  deleteBook.textContent = 'DELETE';
  const editBook = document.createElement('button');
  editBook.textContent = 'EDIT';
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
  });
  editBook.addEventListener('click', (event) => {
    edit.textContent = '';
    edit.style.display = 'block';
    functionEdit(item, ptitle, pauthor, pedition, ppublisher);
  });
}
function functionDelete(id, tr) {
  const confirmToDelete = confirm('Confirm To Delete Book! ;( ');

  if (confirmToDelete === true) {
    fetchPost('POST', '/deleteData', (err, res) => {
      if (err) {} else {
        tr.remove();
      }
    }, JSON.stringify(id));
  } else {}
}

function functionEdit(item, ptitle, pauthor, pedition, ppublisher) {
  console.log('insrghjkl');
  const spanTitle = document.createElement('p');
  spanTitle.textContent = 'Edit Title';
  const inputTitle = document.createElement('INPUT');
  inputTitle.setAttribute('type', 'text');
  inputTitle.setAttribute('value', item.title);
  const spanAuthor = document.createElement('p');
  spanAuthor.textContent = 'Edit Author';
  const inputAuthor = document.createElement('INPUT');
  inputAuthor.setAttribute('type', 'text');
  inputAuthor.setAttribute('value', item.author);
  const spanEdtioin = document.createElement('p');
  spanEdtioin.textContent = 'Edit Edtion';
  const inputEdtion = document.createElement('INPUT');
  inputEdtion.setAttribute('type', 'text');
  inputEdtion.setAttribute('value', item.edition);
  const spanPublisher = document.createElement('p');
  spanPublisher.textContent = 'Edit Publisher';
  const inputPublisher = document.createElement('INPUT');
  inputPublisher.setAttribute('type', 'text');
  inputPublisher.setAttribute('value', item.publisher);
  const editBook = document.createElement('button');
  editBook.textContent = 'EDIT';

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
        ptitle.textContent = inputTitle.value;
        pauthor.textContent = inputAuthor.value;
        pedition.textContent = inputEdtion.value;
        ppublisher.textContent = inputPublisher.value;
        edit.style.display = 'none';
      }
    }, convertData);
  });
}
