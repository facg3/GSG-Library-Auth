var button = document.getElementById('create');
var allBook = document.getElementById('allBook');
var addBook = document.getElementById('addBook');
var add = document.getElementById('add');
var table = document.getElementById('table');
var edit = document.getElementById('edit');

addBook.addEventListener('click', () => {
  add.style.display = 'block';
  table.style.display = 'none';
  edit.style.display = 'none';

});
button.addEventListener('click', () => {
  var title = document.getElementById('Btitle').value;
  var author = document.getElementById('Bauthor').value;
  var edition = document.getElementById('Bedition').value;
  var publisher = document.getElementById('Bpublisher').value;
  var obj = {
    title: title,
    author: author,
    edition: edition,
    publisher: publisher
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
      var data = JSON.parse(res);
      data.forEach((item) => {
        functionAdd(item);
      });
    }
  });
  table.style.display = 'block';
});

function functionDelete(id, tr) {
  var confirmToDelete = confirm("Confirm To Delete Book! ;( ");
  if(confirmToDelete === true){
    fetchPost('POST', '/deleteData', (err, res) => {
      if (err) {} else {
        tr.remove();
      }
    }, JSON.stringify(id));
  }
  else {
  }
}

function functionEdit(item, ptitle, pauthor, pedition, ppublisher) {

  var spanTitle = document.createElement("p");
  spanTitle.innerHTML = "Edit Title";
  var inputTitle = document.createElement("INPUT");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("value", item.title);
  var spanAuthor = document.createElement("p");
  spanAuthor.innerHTML = "Edit Author";
  var inputAuthor = document.createElement("INPUT");
  inputAuthor.setAttribute("type", "text");
  inputAuthor.setAttribute("value", item.author);
  var spanEdtioin = document.createElement("p");
  spanEdtioin.innerHTML = "Edit Edtion";
  var inputEdtion = document.createElement("INPUT");
  inputEdtion.setAttribute("type", "text");
  inputEdtion.setAttribute("value", item.edition);
  var spanPublisher = document.createElement("p");
  spanPublisher.innerHTML = "Edit Publisher";
  var inputPublisher = document.createElement("INPUT");
  inputPublisher.setAttribute("type", "text");
  inputPublisher.setAttribute("value", item.publisher);
  var editBook = document.createElement('button');
  editBook.innerHTML = "EDIT";
  edit.appendChild(spanTitle);
  edit.appendChild(inputTitle);
  edit.appendChild(spanAuthor);
  edit.appendChild(inputAuthor);
  edit.appendChild(spanEdtioin);
  edit.appendChild(inputEdtion);
  edit.appendChild(spanPublisher);
  edit.appendChild(inputPublisher);
  edit.appendChild(editBook);

  editBook.addEventListener("click", function(event) {
    var newData = {
      title: inputTitle.value,
      author: inputAuthor.value,
      edtion: inputEdtion.value,
      publisher: inputPublisher.value,
      id: item.id
    }
    var convertData = JSON.stringify(newData)
    fetchPost('POST', '/editData', (err, res) => {
      if (err) {} else {
        ptitle.innerHTML = inputTitle.value;
        pauthor.innerHTML = inputAuthor.value;
        pedition.innerHTML = inputEdtion.value;
        ppublisher.innerHTML = inputPublisher.value
        edit.style.display = 'none';
      }
    }, convertData);
    event.preventDefault();
  });
}

function functionAdd(item) {
  var tr = document.createElement('tr');
  var ptitle = document.createElement('td');
  ptitle.innerHTML = item.title;
  var pauthor = document.createElement('td');
  pauthor.innerHTML = item.author;
  var pedition = document.createElement('td');
  pedition.innerHTML = item.edition;
  var ppublisher = document.createElement('td');
  ppublisher.innerHTML = item.publisher;
  var deleteBook = document.createElement('button');
  deleteBook.innerHTML = "DELETE";
  var editBook = document.createElement('button');
  editBook.innerHTML = "EDIT";
  var option = document.createElement('td');

  tr.appendChild(ptitle);
  tr.appendChild(pauthor);
  tr.appendChild(pedition);
  tr.appendChild(ppublisher);
  option.appendChild(deleteBook);
  option.appendChild(editBook);
  tr.appendChild(option);
  table.appendChild(tr);
  deleteBook.addEventListener("click", function(event) {
    functionDelete(item.id, tr);
    event.preventDefault();
  });
  editBook.addEventListener("click", function(event) {
    functionEdit(item, ptitle, pauthor, pedition, ppublisher);
    event.preventDefault();
  });
}
